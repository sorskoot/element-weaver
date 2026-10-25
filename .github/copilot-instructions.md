# Repository-Wide Coding Rules

These rules apply to every agent and task in this repository. They take precedence over conflicting style guidance in custom agents, skills, and reference documents, including the official Wonderland Engine coding guidelines.

- Use a formatting width of 120 columns, matching [the Prettier configuration](../.prettierrc.json). Do not impose a 92-column limit.
- Use lowerCamelCase for private members and backing fields without an underscore (`_`) prefix.
- Always declare explicit `public`, `protected`, or `private` access modifiers on TypeScript class members, including constructors, methods, accessors, and static members. Do not rely on implicit public visibility.
- Apply these rules to new or modified code without unrelated reformatting or renaming of existing code.

Follow [the Wonderland Engine project instructions](./instructions/wl.instructions.md) for the remaining project conventions.
