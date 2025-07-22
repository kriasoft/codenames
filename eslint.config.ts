/* SPDX-FileCopyrightText: 2025-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import js from "@eslint/js";
import ts from "typescript-eslint";

export default ts.config(js.configs.recommended, ...ts.configs.recommended, {
  ignores: ["dist"],
});
