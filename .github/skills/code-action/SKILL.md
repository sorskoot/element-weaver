---
name: code-action
description: Perform an action on the code file
argument-hint: Request what refactoring actions to perform on the current file
---

# Intro

Perform a simple refactoring on the current file. You can request to rename variables, extract functions, or perform other code transformations. The extension will analyze the code and apply the requested changes.

## Refactoring Principles

### The Golden Rules

1. **Behavior is preserved** - Refactoring doesn't change what the code does, only how
2. **Small steps** - Make tiny changes, test after each
3. **One thing at a time** - Don't mix refactoring with feature changes
4. **Only change what's requested** - Don't make unrelated changes, even if you see them
5. **Check references** - Always check and updated references to files, classes, methods etc.

