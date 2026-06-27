# design_skill

`design_skill` is a CLI tool that provides a structured shared vocabulary and automated guardrails to elevate UI/UX quality, preventing AI coding agents from producing generic, predictable designs.

## Installation

You can run `design_skill` locally or install it globally.

To link the package locally:
```bash
npm link
```

## Usage

### 1. Initialize Context
Before running any design commands, you must initialize the context. This sets up the foundational templates (`PRODUCT.md`, `DESIGN.md`, and `.design_skill/skill.md`).

```bash
design_skill init
```

### 2. Available Commands
Once initialized, you can run various commands to iterate on the design.

```bash
design_skill [command]
```

To see all available commands:
```bash
design_skill --help
```
