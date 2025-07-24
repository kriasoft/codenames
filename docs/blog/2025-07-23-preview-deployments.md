# A Practical Guide to Preview Deployments for Every PR

## Introduction

Ever had that sinking feeling when you merge a pull request, only to have it blow up in production? We've all been there. You swear it worked on your machine, but the production environment has a different opinion.

That's where preview deployments come in. Think of them as a dress rehearsal for your code. For every pull request, you get a dedicated, temporary environment that's a spitting image of production. It's a safe space to test your changes, share them with your team, and catch those pesky bugs before they ever see the light of day.

In this guide, we'll walk you through how to set up preview deployments for your own projects. We'll even use our own [`codenames`](https://github.com/kriasoft/codenames) library to give our preview environments some memorable names. Because `feature-branch-123.example.com` is boring, but `london.example.com` is a bit more pragmatic (more on that later).

## Core Concepts

Let's break down what makes preview deployments tick. It's not rocket science, but getting the pieces to play nicely together does require understanding a few key concepts.

### The CI/CD Pipeline: Your Deployment Assembly Line

At the heart of preview deployments is your CI/CD pipeline. If you're using GitHub, this means GitHub Actions. Think of it as your deployment assembly line – when someone opens a pull request, the machinery kicks into gear. Your workflow file (`.github/workflows/preview.yml`) becomes the conductor, orchestrating everything from building your app to spinning up infrastructure.

Here's where speed matters. Nobody wants to wait 20 minutes for their preview URL. The trick? Pre-configured deployment slots. Instead of provisioning fresh infrastructure every time, you maintain a pool of ready-to-go environments. When PR #1234 comes in, it claims slot 3, which already has Cloudflare Workers configured, a Neon database branch ready, and cloud storage buckets pre-configured. Your deployment time drops from minutes to seconds.

### GitHub Deployments: More Than Just a Status Badge

GitHub's Deployments feature is criminally underused. It's not just about showing a fancy "deployed" badge on your PR. Deployments give you a proper audit trail – who deployed what, when, and where. They integrate beautifully with GitHub Actions, letting you track preview environments alongside your production deployments. Plus, they make cleanup a breeze when PRs get merged or closed.

### Infrastructure as Code: Terraform is Your Friend

Here's where things get interesting. You could click around in various dashboards to set up your preview infrastructure, but that's a recipe for "it worked yesterday" syndrome. Enter Infrastructure as Code, with Terraform leading the charge.

Your Terraform configs define everything – the Cloudflare Worker, the Neon database branch, the routing rules. When PR #1234 needs an environment, Terraform spins it up consistently, every single time. No more "works on my preview" surprises.

### The URL Game: Making Previews Memorable

This is where our `codenames` library shines. Instead of `pr-1234-feature-new-checkout.preview.example.com`, you get `london.example.com`. Short, memorable, and infinitely easier to share in Slack. Your product manager will thank you when they can actually remember the URL during a demo.

The beauty is in the determinism – PR #1234 always maps to "london", so your preview URLs stay consistent across deployments. It's a small touch that makes a big difference in day-to-day developer experience.

### Versioning: Keeping Track of What's What

Preview deployments need versioning too. Not just for your app code, but for the deployment configuration itself. When someone asks "which version of the API is running on the preview?", you need a good answer. Tag your deployments, use semantic versioning, and make it easy to trace from PR to deployed code to actual running environment.

With these pieces in place, preview deployments transform from a nice-to-have into an essential part of your development workflow. They're your safety net, your collaboration tool, and your "let me show you something cool" superpower all rolled into one.

## Step-by-Step Guide

Ready to roll up your sleeves? Let's build a preview deployment system that would make even the most jaded DevOps engineer crack a smile. We'll start with the foundation and work our way up to a fully automated setup.

### Step 1: Prepare Your Deployment Slot Pool

Before we dive into automation, let's talk about why pre-configured deployment slots are a game-changer. Imagine provisioning a new Cloudflare Worker, creating a database branch, and setting up storage buckets for every single PR. Your developers would age visibly while waiting for their preview URLs.

Instead, we'll create a pool of 10-20 deployment slots that sit ready and waiting. Think of them as parking spaces – when a PR rolls in, it just needs to find an empty spot.

First, let's set up our Terraform configuration for the slot pool:

```hcl
# terraform/modules/preview-slot/main.tf
variable "slot_number" {
  type = number
}

resource "cloudflare_worker_script" "preview" {
  account_id = var.cloudflare_account_id
  name       = "preview-slot-${var.slot_number}"
  content    = file("../worker-template.js")

  # Pre-configure but leave dormant until needed
  routes = []
}

resource "neon_branch" "preview" {
  project_id = var.neon_project_id
  name       = "preview-slot-${var.slot_number}"
  parent_id  = var.main_branch_id
}

resource "google_storage_bucket" "assets" {
  name     = "${var.project_name}-preview-${var.slot_number}"
  location = "US"

  lifecycle_rule {
    condition {
      age = 7  # Auto-cleanup after a week
    }
    action {
      type = "Delete"
    }
  }
}
```

Now, provision your slots (this is a one-time setup):

```bash
# terraform/environments/preview/main.tf
module "preview_slots" {
  source = "../../modules/preview-slot"
  count  = 20  # Adjust based on your PR velocity

  slot_number = count.index + 1
  # ... other variables
}
```

Run `terraform apply` and grab a coffee. When you come back, you'll have 20 deployment slots ready to rock.

### Step 2: Set Up the GitHub Actions Workflow

Here's where the magic happens. Our workflow needs to be fast, reliable, and smart enough to handle the entire PR lifecycle.

Create `.github/workflows/preview.yml`:

```yaml
name: Preview Deployment

on:
  pull_request:
    types: [opened, synchronize, reopened, closed]

jobs:
  deploy:
    if: github.event.action != 'closed'
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Generate preview name and slot
        id: preview
        run: |
          # Use codenames for memorable URLs
          npm install -g codenames
          PREVIEW_NAME=$(codenames ${{ github.event.pull_request.number }})
          echo "name=$PREVIEW_NAME" >> $GITHUB_OUTPUT

          # Deterministically map PR to slot using FNV-1a hash
          # Same PR always gets same slot (modulo number of slots)
          SLOT_NUMBER=$(( ${{ github.event.pull_request.number }} % 20 + 1 ))
          echo "slot=preview-slot-${SLOT_NUMBER}" >> $GITHUB_OUTPUT
          echo "slot_number=${SLOT_NUMBER}" >> $GITHUB_OUTPUT

      - name: Create deployment
        id: deployment
        uses: actions/github-script@v7
        with:
          script: |
            const deployment = await github.rest.repos.createDeployment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              ref: context.payload.pull_request.head.sha,
              environment: '${{ steps.preview.outputs.slot }}',
              description: `Preview for PR #${{ github.event.pull_request.number }}`,
              transient_environment: true,
              auto_merge: false,
              required_contexts: [],
              payload: {
                pr_number: '${{ github.event.pull_request.number }}',
                preview_name: '${{ steps.preview.outputs.name }}'
              }
            });
            return deployment.data.id;

      - name: Build application
        run: |
          npm ci
          npm run build

      - name: Configure slot
        run: |
          # Update Cloudflare Worker route
          curl -X PUT "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/workers/routes" \
            -H "Authorization: Bearer $CF_API_TOKEN" \
            -H "Content-Type: application/json" \
            --data '{
              "pattern": "${{ steps.preview.outputs.name }}.example.com/*",
              "script": "${{ steps.preview.outputs.slot }}"
            }'

      - name: Deploy to slot
        run: |
          # Deploy to Cloudflare Worker
          wrangler deploy --name ${{ steps.preview.outputs.slot }} \
            --var PREVIEW_NAME:${{ steps.preview.outputs.name }} \
            --var PR_NUMBER:${{ github.event.pull_request.number }}
            
          # Sync assets to GCS
          gsutil -m rsync -r ./dist gs://${{ env.PROJECT_NAME }}-${{ steps.preview.outputs.slot }}/

      - name: Update deployment status
        if: always()
        uses: actions/github-script@v7
        with:
          script: |
            await github.rest.repos.createDeploymentStatus({
              owner: context.repo.owner,
              repo: context.repo.repo,
              deployment_id: ${{ steps.deployment.outputs.result }},
              state: '${{ job.status }}',
              environment_url: 'https://${{ steps.preview.outputs.name }}.example.com',
              description: 'Preview deployment'
            });
```

The beauty here? We're not provisioning anything new – just deterministically mapping each PR to its designated slot. The `codenames` library uses FNV-1a hashing to ensure PR #1234 always gets "london" as its subdomain, while the modulo operation ensures it always maps to the same slot number. No searching for available slots, no race conditions, just pure deterministic assignment. The whole process takes under a minute.

### Step 3: Database Branch Magic with Neon

Neon databases are perfect for preview deployments because they support branching. Just like Git branches for your code, you can branch your database. Why Neon? It spins up new branches in seconds, not minutes, and you only pay for the actual storage diff.

Add this to your deployment workflow:

```yaml
- name: Reset database branch
  run: |
    # Reset the branch to match production
    curl -X POST https://console.neon.tech/api/v2/projects/$NEON_PROJECT_ID/branches/${{ steps.preview.outputs.slot }}/reset \
      -H "Authorization: Bearer $NEON_API_KEY" \
      -H "Content-Type: application/json" \
      --data '{
        "parent_branch_id": "${{ env.MAIN_BRANCH_ID }}"
      }'

- name: Run migrations
  env:
    DATABASE_URL: ${{ secrets.NEON_SLOT_URLS[steps.preview.outputs.slot] }}
  run: |
    npm run db:migrate

- name: Seed preview data
  if: github.event.pull_request.labels.*.name contains 'needs-seed-data'
  run: |
    npm run db:seed:preview
```

Pro tip: Use PR labels to control seeding. Sometimes you want production data, sometimes you want squeaky clean test data.

### Step 4: Cloudflare Hyperdrive for Speed

Database connections from edge workers can be slow. Enter Cloudflare Hyperdrive – it maintains connection pools close to your workers, dramatically reducing latency. Since we're using pre-configured slots, each slot already has its own Hyperdrive configuration pointing to its Neon branch.

In your worker code:

```javascript
export default {
  async fetch(request, env) {
    // Hyperdrive connection is pre-configured per slot
    const db = env.HYPERDRIVE.connect();

    // Your app logic here
    const result = await db.query("SELECT * FROM ...");

    return new Response(JSON.stringify(result), {
      headers: { "content-type": "application/json" },
    });
  },
};
```

### Step 5: Making URLs Memorable with Codenames

This is where we add that touch of elegance. Instead of `preview-slot-3.example.com`, your team gets `tokyo.example.com`. The `codenames` library uses the FNV-1a hash algorithm internally, ensuring PR #1234 always deterministically maps to the same memorable name.

Install it in your workflow:

```bash
npm install -g codenames
```

Then use it to generate consistent, memorable names:

```javascript
// In your GitHub Action
const codenames = require("codenames/cities-20");
const previewName = codenames(prNumber);
console.log(`PR #${prNumber} deployed to https://${previewName}.example.com`);
```

The magic lies in the determinism. FNV-1a (Fowler-Noll-Vo) is a fast, non-cryptographic hash function that distributes values evenly across the wordlist. This means:

- PR #1234 → always "london"
- PR #1235 → always "paris"
- PR #1236 → always "tokyo"

No database lookups, no state management, just pure mathematical beauty.

Configure your DNS with a wildcard record:

```text
*.example.com → your-cloudflare-worker.workers.dev
```

Now any subdomain automatically routes to your worker, which can handle the request based on the hostname.

### Step 6: Automatic Cleanup

Don't be that team with 200 zombie preview environments eating up resources. Add a cleanup job:

```yaml
cleanup:
  if: github.event.action == 'closed'
  runs-on: ubuntu-latest

  steps:
    - name: Generate preview info
      id: preview
      run: |
        # Regenerate the same deterministic values
        npm install -g codenames
        PREVIEW_NAME=$(codenames ${{ github.event.pull_request.number }})
        SLOT_NUMBER=$(( ${{ github.event.pull_request.number }} % 20 + 1 ))
        echo "name=$PREVIEW_NAME" >> $GITHUB_OUTPUT
        echo "slot=preview-slot-${SLOT_NUMBER}" >> $GITHUB_OUTPUT

    - name: Remove route
      run: |
        # Remove the Cloudflare route
        ROUTE_ID=$(curl -X GET "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/workers/routes" \
          -H "Authorization: Bearer $CF_API_TOKEN" | 
          jq -r '.result[] | select(.pattern | contains("${{ steps.preview.outputs.name }}")) | .id')
          
        curl -X DELETE "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/workers/routes/$ROUTE_ID" \
          -H "Authorization: Bearer $CF_API_TOKEN"

    - name: Clean up assets
      run: |
        # Clear the GCS bucket for this slot
        gsutil -m rm -r gs://${{ env.PROJECT_NAME }}-${{ steps.preview.outputs.slot }}/* || true
```

Since we're using deterministic slot assignment, there's no need to mark slots as available. When the next PR claims the same slot (through the modulo operation), it'll automatically reset and redeploy. Simple, elegant, and collision-free for most teams.

### Step 7: Monitoring and Debugging

Add some observability to your preview deployments:

```yaml
- name: Add preview comment
  uses: actions/github-script@v7
  with:
    script: |
      const body = `### 🚀 Preview Deployment Ready!

      **URL:** https://${{ steps.preview.outputs.name }}.example.com
      **Slot:** ${{ steps.preview.outputs.slot }}
      **Deploy Time:** ${{ steps.deploy-timer.outputs.time }}s

      <details>
      <summary>Deployment Details</summary>

      - Worker Version: ${{ github.sha }}
      - Database Branch: ${{ steps.preview.outputs.slot }}
      - Assets Bucket: gs://${{ env.PROJECT_NAME }}-${{ steps.preview.outputs.slot }}

      </details>

      To redeploy, push a new commit or re-run the workflow.`;

      github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: body
      });
```

This gives everyone visibility into what's deployed where, and helps debug issues when they inevitably crop up.

### Putting It All Together

With everything in place, here's what happens when a developer opens a PR:

1. GitHub Actions triggers the preview workflow
2. The workflow generates a memorable name using `codenames` (FNV-1a hash ensures consistency)
3. It calculates the slot number deterministically (PR number % 20)
4. The app is built and deployed to the pre-assigned Cloudflare Worker slot
5. The database branch is reset and migrations run
6. Routes are updated to point the subdomain to the correct worker
7. A comment appears on the PR with the preview URL
8. When the PR is closed, route cleanup happens automatically

From PR to preview URL in under 60 seconds. Not bad for a day's work.

The elegance of this approach? No state management, no race conditions, no searching for available slots. Just pure deterministic math. PR #1234 always gets "london" and always uses slot 14. If someone else is using slot 14? They get overwritten – but that's fine because their PR was closed anyway.

Remember, the key to fast preview deployments is preparation. Those pre-configured slots are like having a pot of water already boiling – you just need to drop in the pasta. Or in this case, your code.

## Tips and Tricks

...

## Conclusion

...
