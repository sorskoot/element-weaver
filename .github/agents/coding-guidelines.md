# Wonderfully-Consistent

Wonderfully Consistent - Coding Style Guide for Wonderland Engine

## Introduction

Introducing "Wonderfully Consistent", an industry standard for a uniform coding style brought to you by Wonderland and the Wonderland community. We have crafted an open-source document, complete with rules and guidelines to make onboarding smoother and code cleaner across any project. Our "Project Style Standard" resonates with the [Unreal Engine UE5 style guide](https://github.com/Allar/ue5-style-guide/) but it is defined by us, for our community. We aim to create an unshakeable structure spanning folder structures, coding styles, file naming conventions and default development tools including auto-formatting and CI setup protocols. Our objective is to eliminate productivity barriers like the infamous "Tabs or Spaces" debate. This way, we prevent individualistic style inventions that complicate project transitions and collaboration leading to messy outputs. Embrace 'Wonderfully Consistent' today for a more efficient and unified coding experience.

## Table of Contents (Subject to change)

- [0. Terminology](#0)
- [1. Project Style](#1)
    - [1.1 Folder Structure](#1.1)
        - [1.1.1 Defining Hierarchy and Organization](#1.1.1)
        - [1.1.2 Best Practices for File Organization and Management](#1.1.2)
    - [1.2 File Naming Style](#1.2)
        - [1.2.1 Consistent Naming Conventions](#1.2.1)
        - [1.2.2 Rules on Case Usage (camelCase, snake_case, etc.)](#1.2.2)
        - [1.2.3 Use of Special Characters](#1.2.3)
    - [1.3 Multiple Scenes](#1.3)
- [2. Coding Style](#2)
    - [2.1 General Rules and Guidelines](#2.1)
    - [2.2 TypeScript](#2.2)
        - [2.2.1 Effective Use of TypeScript Features](#2.2.1)
        - [2.2.2 Specific Coding Style for TypeScript](#2.2.2)
    - [2.3 Code Formatting](#2.3)
        - [2.3.1 General Coding](#2.3.1)
        - [2.3.2 Indentation Rules (Tabs or Spaces)](#2.3.2)
        - [2.3.3 Bracing Styles](#2.3.3)
    - [2.4 Documentation](#2.4)
        - [2.4.1 Use TSDoc](#2.4.1)
        - [2.4.2 Concise and Precise](#2.4.2)
        - [2.4.3 @param and @returns](#2.4.3)
        - [2.4.4 Avoid @type](#2.4.4)
        - [2.4.5 Use @example Sparingly](#2.4.5)
        - [2.4.6 @internal and @deprecated](#2.4.6)
        - [2.4.7 Avoid @private](#2.4.7)
        - [2.4.8 @hidden and @ignore](#2.4.8)
        - [2.4.9 Use @override](#2.4.9)
- [3. Default Developer Tooling](#3)
    - [3.1 Git](#3.1)
    - [3.2 Prettier](#3.2)
    - [3.3 ESLint](#3.3)

---

<a name="0"></a>

## 0 Terminology

| term       | description                                                                                                                                              |
| :--------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project    | The WLP file containing references to all 3D objects, scripts, materials etc.                                                                            |
| Component  | In Wonderland Engine, a "Component" is similar to a "MonoBehaviour" in Unity. It's a base class for all components that can be attached to game objects. |
| Properties | Properties in Wonderland Engine are public attributes that can be configured via the Wonderland Editor.                                                  |
| TypeName   | A unique identifier for a component class in Wonderland Engine. It's used to register, add, and retrieve components of a given type.                     |
| Engine     | A unique identifier for a component class in Wonderland Engine. It's used to register, add, and retrieve components of a given type.                     |
| Object     | In Wonderland Engine, "object" refers to the game object that a component is attached to                                                                 |

<a name="1"></a>

## 1 Project Style

<a name="1.1"></a>

### 1.1 Folder Structure

<a name="1.1.1"></a>

#### 1.1.1 Defining Hierarchy and Organization

- Organize your Wonderland Engine scenes by using named empty objects as "folders" to keep everything structured and easily accessible.

- Position maintenance objects and organizational empty objects at the origin (0, 0, 0) to avoid confusion between local and world space, simplifying your code and preventing potential issues.

<a name="1.1.2"></a>

#### 1.1.2 Best Practices for File Organization and Management

Below is a common folder structure.

```
- Root
  | - models
      | - textures
  | - js
      | - components
      | - classes
      | - utils
      | index.js
  | - shaders
  | - static
  | index.html
  | package.json
  | .gitignore
```

- Add .gitignore with [this](https://wonderlandengine.com/editor/source-control/#gitignore)

- No Empty Folders
    Remove any empty folders to keep the content browser clean and organized.

<a name="1.2"></a>

### 1.2 File Naming Style

These are the adapted naming conventions for organizing folders within the Wonderland Engine content structure:

<a name="1.2.1"></a>

#### 1.2.1 Consistent Naming Conventions

Never Use Spaces

Spaces can interfere with various tools and processes. Your project folder should also avoid spaces and be located in a path like `D:\Project` rather than `C:\Users\My Name\My Documents\WonderlandEngineProjects`.

<a name="1.2.2"></a>

#### 1.2.2 Rules on Case Usage (camelCase, snake_case, etc.)

PascalCase means initiating folder names with an uppercase letter and then capitalizing the first letter of each subsequent word, with no spaces in between. For example: `DesertEagle`, `RocketPistol`, and `ASeriesOfWords`.

<a name="1.2.3"></a>

#### 1.2.3 Use of Special Characters

**Avoid Unicode Characters And Special Symbols**:

Folder names should not contain Unicode characters or symbols. If a game character is named 'Noël', the corresponding folder should be named `Noel` to prevent issues with tools that do not support Unicode. Similarly, avoid characters outside of `a-z`, `A-Z`, and `0-9`, such as `@`, `-`, `_`, `,`, `*`, and `#` to prevent problems with cross-platform compatibility, source control, and other tools.

<a name="1.3"></a>

### 1.3 Multiple Scenes

When projects get larger you want to split them into multiple Wonderland projects.

- By default, scripts are added and moved to the index.js file automatically. To make sure all scripts are loaded you need to remove the `wle:auto-imports:start`, `wle:auto-imports:end`, `wle:auto-register:start` and `wle:auto-register:end` comments. This does mean you need to start managing adding and registering scripts manually, but prevents them from being removed when a certain project does not need a script.
- There will be two .bin files per project. These are loaded when switching scenes. It's advised to use a service worker to precache these, by using the `<link rel="preload" href="{url}" as "fetch"/>` or by using a component that adds this to the DOM when needed. As an alternative, you can also download the .bin files with a fetch in JavaScript and open the scenes from an array.
- Use a CICD pipeline to build all the projects on the server in reversed order. This way you always know all projects are still built and that the project that is needed first is configured in the index.js file.

<a name="2"></a>

## 2 Coding Style

<a name="2.2"></a>

### 2.2 TypeScript

TypeScript, a superset of JavaScript, is a highly versatile language that incorporates all features of JavaScript while providing several additional ones such as static typing, interfaces, and generics. These elements are particularly beneficial for developing complex software systems using object-oriented programming (OOP).

TypeScript supports both object-oriented and functional programming paradigms. However, it outshines JavaScript when working with OOP because TypeScript uses classes and objects which are cornerstone concepts of OOP. This ensures data and behavior can be structured more coherently and logically.

An essential feature to note is that TypeScript is a compiled language. This means it has to be transformed into JavaScript before execution in the browser or server. While this might seem like an extra step compared to JavaScript’s interpreted nature, this compile-time check allows early detection of potential errors making the development process more efficient.

By default, Wonderland Editor uses ESBuild for bundling JavaScript files. ESBuild isn’t limited to just JavaScript; it has excellent support for TypeScript as well. It compiles TypeScript by stripping out type annotations and transpiling certain features into JavaScript, ensuring seamless integration of TypeScript files with the rest of your project.

One area where TypeScript significantly improves over JavaScript is the enhanced developer experience it provides owing to its type system and type definitions. Robust tooling options such as auto-complete, code refactoring and error checking lead to improved productivity and code quality.

In conclusion, both TypeScript and JavaScript can support multiple programming styles based on your preferences or project requirements if you're aiming for robustness in the structure provided by OOP principles and want improved tooling support for better development efficiency. Prefer TypeScript in your applications.

<a name="2.2.1"></a>

#### 2.2.1 Effective Use of TypeScript Features

-

<a name="2.2.2"></a>

#### 2.2.2 Specific Coding Style for TypeScript

- Everything that starts with a `private` keyword is written with an `_`. This makes sure JavaScript developers see that a method or property (or anything else) is private, even though JavaScript doesn't have a private keyword.

<a name="2.2.3"></a>

#### 2.2.3 Encapsulation in Classes

In object-oriented programming, it is a good practice to make class members as private as possible. This concept is known as encapsulation. Encapsulation is one of the four fundamental principles in OOP and it means "to hide the internal details or mechanisms of a system".

Here's why this principle is important:

It increases maintainability and decreases complexity by hiding internal data from outside interference or misuse.
It allows the programmer to change the internals without affecting any code that uses the class.
It promotes modularity and reusability.
However, there will be instances where you need to expose some of your class members but these should be well thought out and must adhere to your overall software architecture's needs and design.

When needed, use appropriate methods (getters/setters) or properties to provide access or modify private variables, rather than directly making those variables public or protected. Remember, the more you can limit the exposure of your objects' internals, the more flexible and maintainable your code will be.

But don't forget that while encapsulation is an important principle in OOP design, it may not always be applicable depending on certain use cases or design constraints of specific projects. Always consider practicality along with theory when designing systems!

<a name="2.3"></a>

### 2.3 Code formatting

#### 2.3.1 General

- use `getComponents(MeshComponent)` over `getComponents('mesh')`;

coding guidelines for TypeScript:

- Use LowerCamelCase for variable, function, and property names: TypeScript is case-sensitive. By convention, use lowerCamelCase for variables, functions, and properties.

- private variables, functions etc start with an `_`. This is because the private keyword does not exist in JavaScript. The `_` naming convention is common in JavaScript to indicate variables etc are private.

Example:

```typescript
let myVariable: number;
function myFunction() {}
class MyClass {
    private _myProperty: string;
}
```

- Use UpperCamelCase (PascalCase) for class names: The first letter of the identifier and the first letter of each subsequent concatenated word are capitalized.
  Example:

```typescript
class MyAwesomeClass {}
```

- The only exception to the casing specified above is when you are using a backing field. In this case, keep the name the same as the property, but start this with an `_`.

Example:

```typescript
private _someProperty: false;

get someProperty(): boolean{
	return this._someProperty;
}
```

- Avoid logic in getters and setters, except for a null/undefined check, or triggering an onChange type event. Always prefer methods when logic is needed. This way other developers know there won't be any side effects.

- Use const to declare constants: The "const" keyword indicates that a variable's value will not be changed after it's defined. Always prefer `const` over `let`.

- Always use a Type Annotation: Specifying the type can help catch bugs earlier in your development process and enables better tooling. When defining variables, no need to be explicit with types when types can be read from the same line.

Example:

```typescript
let age: number;
let minAge = 18;
```

- Avoid using `any` Type: Using any type may lead to runtime problems as it doesn't enforce any type-checking

- Use Template strings instead of concatenation

- Always specify access modifier for methods and properties

- Try to avoid using void return types

- Don't export mutable bindings: This goes in line with the idea that functions should not change state without making it clear in their input/output.

- Keep lines short (80-100 characters) for readability. We use 92 characters to be specific.

- Add a space before opening brace { in blocks or control structures

- Always use triple equals === instead of double equals ==. This ensures that you're checking both value equality AND type equality.

### Components

- Always Add and Remove event handlers. Overload the `onActivate` and `onDeactivate` methods from `Component` to make sure everything stays set up correctly.

- Do not use methods with an event handler, but user Arrow functions assigned to a property.
  Example:

```typescript
onActivate(){
  this.engine.onXRSessionStart.add(this.onSessionStart);
}

onDeactiveate(){
  this.engine.onXRSessionRemove.add(this.onSessionStart);
}

private onSessionStart = (session: XRSession) => {
  // session start implementation
}
```

- In Start you validate if a property on the component has been set. If not throw an error here. Make sure to include the name of the component in the error and give it a description.

In this example, there's a check if the `handL` object has been set. It contains the name of the component and a description of what was expected.

```typescript
if (!this.handL) {
    throw new Error('flashlight: Flashlight needs a reference to the left hand');
}
```

- NEVER reference to children of components by index directly. The order of children can change at any time, breaking your application. You can either use `findByName` or use a reference. Otherwise, make sure you have another way to be certain that you have the right object. For example, sorting them by name, or adding a simple index component and using that.

❌ Incorrect:

```typescript
const someChild = this.object.children[0];
```

✅ Correct:

```typescript
@property.object()
firstChild?:Object3D;
...
const someChild = this.firstChild;
```

#### 2.3.2 Indentation Rules (Tabs or Spaces)

- use 4 spaces

<a name="2.3.3"></a>

#### 2.3.3 Bracing Styles

- Never omit braces, even when it's one line.

<a name="2.4"></a>

## 2.4 Documentation

In our effort to improve clarity and effectiveness in our documentation, we recommend referring to the [Google Developer Documentation Style Guide](https://developers.google.com/style) as a benchmark for best practices in technical writing. Google's style guide is the product of its extensive experience in creating clear, concise, and user-friendly documentation. With a focus on developer-centric content, it emphasizes:

- Directness: Engaging the reader with direct language that speaks to them individually, using the second person ("you") to forge a stronger connection.

- Simplicity: Prioritizing the simplicity of language to enhance understanding, while being careful not to oversimplify complex concepts to the point of inaccuracy.

- Precision: Striving for accuracy and precision in all documentation, ensuring that developers have exact and thorough information for implementation.

- Inclusiveness: Writing in a way that is inclusive and accessible to a diverse audience, fostering an environment where all readers feel welcome and represented.

By incorporating the principles laid out in the Google Developer Documentation Style Guide, we aim to ensure our documentation remains a reliable, authoritative, and inclusive resource for all users, regardless of their background or skill level. This guide serves as a complement to our existing standards, helping us to maintain a high quality of documentation across our projects.

With these considerations in mind, let's continue to uphold our documentation standards as outlined in the sections that follow.

<a name="2.4.1"></a>

### 2.4.1 Use TSDoc

Document your public interfaces, classes, functions, and parameters with TSDoc. This helps you make your library's functionality clear to end-users without requiring them to explore the source code.

<a name="2.4.2"></a>

### 2.4.2 Concise and Precise

Keep your comments clear and brief. Aim to explain what the code accomplishes, rather than how it works – let the code itself illustrate the process.

<a name="2.4.3"></a>

### 2.4.3 Always use @param and @returns

Always describe your function parameters with `@param` and specify the return type with `@returns`. Even if you think the purpose of a parameter is obvious, clear documentation ensures that everyone understands the types involved. Don't add a dash "-" after the parameter name, syntax highlighting will highlight the separate words and it's not needed for documentation generation.

```typescript
/**
 * Adds two numbers together.
 * @param a The first number.
 * @param b The second number.
 * @returns The sum of the two numbers.
 */
function add(a: number, b: number): number {
    return a + b;
}
```

<a name="2.4.4"></a>

### 2.4.4 Avoid @type

In TypeScript projects, steer clear of the @type tag. It doesn't add value and might lead to discrepancies between the tag and the actual type declaration. Trust TypeScript's type system to convey the necessary information.

<a name="2.4.5"></a>

### 2.4.5 Use @example Sparingly

Include an example when the functionality is complex, but don't overdo it. Often, a single well-chosen example is more useful than several showing the same concept.

```typescript
/**
 * Converts an angle from degrees to radians.
 * @param degrees The angle in degrees.
 * @returns The angle in radians.
 * @example
 * // returns 0.7853981633974483 (approximation of π/4)
 * radiansFromDegrees(45);
 */
function radiansFromDegrees(degrees: number): number {
    return degrees * (Math.PI / 180);
}
```

**For Libraries:**
If the code that is being documented is in a library then it is advised to use as many examples as possible. It helps users of the library to know how to use a specific function or method and in what context.

<a name="2.4.6"></a>

### 2.4.6 Use @internal and @deprecated

Use @internal to document API parts intended only for internal use. Mark deprecated methods or properties with @deprecated and include an explanation and an alternative whenever possible.

```typescript
/**
 * @internal
 * This function is used internally to calculate the frobnication coefficient.
 */
export function _calculateFrobnication() {
    // ...
}
```

<a name="2.4.7"></a>

### 2.4.7 Avoid @private

Since TypeScript enforces privacy with the private keyword, you don't need to document private members with TSDoc. Instead, use regular comments for internal clarity, as documentation tools typically omit private members by default.

But, TypeScript has two different ways to denote private members within a class:

1. The private keyword: This is the traditional TypeScript way of indicating that a member should not be accessible from outside of the class.

```typescript
class MyClass {
    private _myPrivateProperty: string;

    private _myPrivateMethod() {
        // ...
    }
}
```

2. Private Fields (using #): This is part of the newer ECMAScript private class fields proposal, which TypeScript also supports.

```typescript
class MyClass {
    #myPrivateField: string;

    #myPrivateMethod() {
        // ...
    }
}
```

In terms of TSDoc documentation, here's how you can handle them:

- For private keywords that are not part of the public API, you generally don't need to document them with TSDoc comments unless you want to for internal purposes. If you do, you can just write a regular comment without TSDoc tags since the TypeScript compiler and most documentation tools will not include private members in the generated docs.
- For Private Fields (#) The same principle applies. You don't need to document these members for public API documentation, but you can include regular comments for internal clarity.

Documentation tools hide `private` and `protected` members by default. Use tools' configuration or command-line flags (like `--excludePrivate` in TypeDoc) to control this behavior.

<a name="2.4.8"></a>

### 2.4.8 Don't use @hidden and @ignore

TSDoc doesn't officially recognize @hidden or @ignore. Refrain from using these tags unless your documentation tool is set up to process them. Understand your tools' settings for managing the visibility of private and protected members.

<a name="2.4.9"></a>

### 2.4.9 Use @override

TSDoc automatically recognizes the @override tag. Use it to indicate that a method overrides a method in a base class.

<a name="3"></a>

## 3 Default Developer Tooling

<a name="3.1"></a>

### 3.1 Git

In Git commit messages use _imperative present tense_. This means you should write messages like giving the codebase a command what to do. Don't describe what you did, but what the commit does. Always start with a capital letter and don't end with a period.

Examples:

- Add player movement system
- Implement basic inventory UI
- Fix null reference in audio manager
- Fix incorrect texture UV mapping
- Simplify mesh generation pipeline
- Optimize chunk loading for large worlds
- Improve shader compilation time
- Update README with setup instructions
- Remove deprecated scripts
- Bump dependencies to latest versions
- Add .gitignore entries for build artifacts

<a name="3.2"></a>

### 3.2 Prettier

Use the [Prettier VSCode extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for auto-formatting your code. This ensures that your code is always formatted according to the same rules, making it easier to read and maintain.

Use the [@wonderlandengine/prettier-config](https://www.npmjs.com/package/@wonderlandengine/prettier-config) package for your Prettier configuration.

If you want to set up Prettier manually, use the following configuration:

```json
{
    "trailingComma": "es5",
    "tabWidth": 4,
    "singleQuote": true,
    "printWidth": 92,
    "quoteProps": "preserve",
    "bracketSpacing": false
}
```

It is advised to enable "Format on Save" in your editor to make sure your code is always formatted correctly. This way you don't have to worry about formatting at all and can focus on writing code.

<a name="3.3"></a>

### 3.3 ESLint

It's recommended to use ESLint for linting your TypeScript code. ESLint helps fix problems in your code to make sure the style is consistent and it helps to catch potential errors early.

To install use:
`npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint`

For config you can use the following, which extends the recommended ESLint rules and the recommended TypeScript rules with type checking.

```json
{
    "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended-type-checked"],
    "parser": "@typescript-eslint/parser",
    "plugins": ["@typescript-eslint"],
    "root": true,
    "settings": {},
    "parserOptions": {
        "project": true,
        "tsconfigRootDir": "./"
    },
    "overrides": [
        {
            "files": ["js/**/*.ts"]
        }
    ]
}
```

### 3.4 ESBuild

Wonderland Engine uses ESBuild to build projects. It is advised to use ESBuild for libraries as well to stay consistent.
