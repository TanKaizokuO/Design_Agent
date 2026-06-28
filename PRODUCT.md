# RENKIN

## Overview
**Vision/Goal:** `RENKIN` is a CLI tool designed to assist in generating, iterating, and polishing premium web frontends by codifying design principles and product context into structured markdown files.

**Current Status:** Active Development / MVP

## Tech Stack
**Language/Runtime:** Node.js (ES Modules)

**Frameworks/Libraries:** Vanilla Node.js standard libraries (`fs`, `path`, `readline`, `process`).

**Key Dependencies:** Relies heavily on the local filesystem to read/write context files (`PRODUCT.md`, `DESIGN.md`, `.renkin/skill.md`). Also depends on `axe-core` for accessibility audits.

## Directory Structure
```
.
├── bin/
│   └── cli.js            # CLI entry point and command router
├── src/
│   ├── audit/            # Technical audit modules (a11y, responsive, performance)
│   ├── audit.js          # Logic for frontend quality and accessibility audits
│   ├── commands.js       # Command definitions and help table generation
│   ├── engine/           # Core processing engine components (rules, runner)
│   ├── extension/        # Extension/plugin-related logic (dom-rules, content-core)
│   ├── extraction.js     # Logic for extracting UI tokens and components
│   ├── init.js           # Interactive project initialization logic
│   └── iteration.js      # Handlers for design mutation commands (shape, bolder, etc.)
├── templates/
│   └── skill.md          # Template file copied during initialization
├── fixture/              # Test fixtures
├── specs/                # Test specifications
└── package.json          # Project metadata and configuration
```

## Core Logic & Data Flow
1. **Command Routing:** User input via the `RENKIN` CLI command is intercepted by `bin/cli.js`. The entry point parses arguments, validates them against the supported command list in `src/commands.js`, and routes execution to the respective module in `src/`.
2. **Context Initialization & Validation:** The `init` command uses Node's `readline` to prompt the user interactively, generating `PRODUCT.md` and `DESIGN.md` in the user's working directory. For all subsequent commands, `cli.js` intercepts the execution to ensure these context files exist and contain the `renkin_initialized: true` flag. 
3. **Atomic File Operations:** When generating or modifying core context files (like during `init`), the application writes to temporary files (e.g., `PRODUCT.tmp`) and uses atomic renames to prevent partial or corrupted state.

## Environment & Setup
- **Prerequisites:** Node.js environment supporting ES Modules (v14+ recommended).
- **Setup:** The CLI tool can be installed globally using `npm install -g .` or linked via `npm link` in the project root.
- **Initialization:** Before using advanced commands in any target directory, developers must run `RENKIN init` to establish the foundational design context.

## Development Conventions
- **Module System:** Strict use of ES Modules (`"type": "module"` in `package.json`).
- **State Management:** Application state and contextual memory are stateless in-memory, persistently backed by localized Markdown files in the user's working directory rather than a traditional database.
- **Separation of Concerns:** Routing and argument validation strictly live in the `bin/` layer, while business logic and filesystem operations are encapsulated in `src/`.

## Known Issues / Debt
- **Initialization Typo:** There is a known typo (`renkintialized: true`) in `bin/cli.js` and `PRODUCT.md` initialization that currently needs to be fixed to `renkin_initialized: true`.
- **Regex-based Parsing:** The CSS/HTML analysis for extraction in `rules.js` and `extraction.js` uses regex, which is prone to false positives compared to proper AST parsing.
- **Redundant Code:** `detector.mjs` may be redundant and superseded by `rules.js`, pending cleanup.
