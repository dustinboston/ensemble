# Ensemble: Novel Synthesis of Eich, McCarthy, Berners-Lee, Lie, etc

![A line drawing of a jazz ensemble](./var/images/ensemble_indexed.gif)

Ensemble is a _web_ programming language that combines JavaScript, HTML, and CSS in a Lisp-like language with HTML-style syntax using angle brackets. The language supports both angle bracket syntax (preferred) and traditional parentheses for developers familiar with Lisp.

## Language Features

- **HTML-style syntax**: Uses angle brackets `<>` as the primary syntax (though parentheses are also supported)
- **Functional programming**: Based on Lisp principles with immutable data structures
- **Web-focused**: Built-in support for HTML, CSS, and JavaScript interop
- **Tail call optimization**: Supports recursive functions without stack overflow
- **Macro system**: Powerful macro capabilities with quasiquote/unquote
- **Error handling**: Try/catch exception handling
- **Rich data types**: Lists, vectors, maps, atoms, keywords, and more

## Syntax Examples

### Basic Fibonacci Function (Angle Bracket Syntax)

```ensemble
<var binet
  <function <n>
    <const [
        sqrt5 <Math.sqrt 5>,
        phi   <divide <add 1 sqrt5> 2>,
        psi   <divide <subtract 1 sqrt5> 2>
      ]
      <Math.round
        <divide
          <subtract
            <power phi n>
            <power psi n>
          >
          sqrt5
        >
      >
    >
  >
>

<console.log <binet 7>>
```

### Alternative Lisp-style Syntax (Also Supported)

```ensemble
(var binet
  (function (n)
    (const [
        sqrt5 (Math.sqrt 5),
        phi   (divide (add 1 sqrt5) 2),
        psi   (divide (subtract 1 sqrt5) 2)
      ]
      (Math.round
        (divide
          (subtract
            (power phi n)
            (power psi n)
          )
          sqrt5
        )
      )
    )
  )
)

(console.log (binet 7))
```

## Core Language Reference

### Variable Declaration

- `<var name value>` - Define a global variable
- `<const [bindings] body>` - Local bindings (immutable)

### Functions

- `<function [params] body>` - Define anonymous function
- `<fn* [params] body>` - Alternative function syntax

### Control Flow

- `<if condition then else>` - Conditional expression
- `<do expr1 expr2 ...>` - Sequential evaluation
- `<cond test1 result1 test2 result2 ...>` - Multi-way conditional

### Data Structures

- Lists: `<list 1 2 3>` or `(1 2 3)`
- Vectors: `[1 2 3]`
- Maps: `{"key" value, :keyword value}`
- Keywords: `:keyword` or `keyword:`

### Arithmetic (Explicit Function Names)

- `<add a b>` - Addition
- `<subtract a b>` - Subtraction
- `<multiply a b>` - Multiplication
- `<divide a b>` - Division
- `<eq a b>` - Equality comparison
- `<lt a b>`, `<gt a b>`, `<lte a b>`, `<gte a b>` - Comparisons

### Quoting and Macros

- `<quote expr>` - Prevent evaluation
- `<quasiquote expr>` - Template with selective evaluation
- `<unquote expr>` - Evaluate within quasiquote
- `<splice-unquote expr>` - Splice list into quasiquote
- `<defmacro! name params body>` - Define macro

### Error Handling

- `<try expr <catch var handler>>` - Exception handling
- `<throw value>` - Throw exception

### File I/O

- `<slurp "filename">` - Read file contents
- `<spit "filename" content>` - Write to file
- `<load-file "filename">` - Load and evaluate file

### Collection Operations

- `<first coll>`, `<rest coll>`, `<nth coll index>`
- `<count coll>`, `<empty? coll>`
- `<map func coll>`, `<filter func coll>`
- `<cons item coll>`, `<concat coll1 coll2>`

### Map Operations

- `<hash-map key1 val1 key2 val2>` - Create map
- `<assoc map key val>` - Add/update key
- `<dissoc map key>` - Remove key
- `<get map key>`, `<contains? map key>`
- `<keys map>`, `<vals map>`

## Comments

Ensemble supports both Lisp-style and C-style comments:

```ensemble
;; Lisp-style comment
// C-style comment (preferred)
```

## Usage

### Interactive REPL

```bash
./bin/ensemble
```

### Run a File

```bash
./bin/ensemble path/to/file.ensemble
```

### Example Session

```ensemble
user> <var greeting "Hello, World!">
"Hello, World!"
user> <console.log greeting>
Hello, World!
nil
user> <var square <function <x> <multiply x x>>>
#<function>
user> <square 5>
25
```

## Development

### Directory Structure

```text
root
├── bin
├── src
│   ├── ensemble
│   │   ├── build
│   │   └── tests
│   ├── examples
│   └── extension
├── var
│   ├── data
│   ├── generated
│   └── reference
└── Makefile
```

### Prerequisites

You'll need NodeJS, QuickJS, and Make.

#### Install NodeJS

1. [Download and Install NodeJS][NodeJS].
2. Run `npm install -g typescript esbuild` from your terminal of choice.
3. Follow the QuickJS installation instructions below.

#### Install or Update QuickJS

1. Download [the latest QuickJS binary][QuickJS] for your system.
2. Gently place it into the top level bin folder and name it qjs.

### Building Ensemble

The following commands will build the Ensemble interpreter as a standalone
JavaScript file (using ESBuild and QuickJS).

```bash
make
```

### Running Unit and Integration Tests

To start the unit and integration tests, run the test script from the root of
the project.

```bash
make test-unit-fun
```

**Note About Parallel Testing** It is not possible to run the tests in parallel
at the moment because when this code was ported from Deno to QuickJS there were
tests with steps. These tests were not modified during conversion and remain
order-dependent.

#### Test Coverage

The test suite includes comprehensive coverage of:

- **Core functions**: Arithmetic, comparison, type checking
- **Data structures**: Lists, vectors, maps, atoms
- **Control flow**: Conditionals, loops, function calls
- **Macros**: Quasiquote, unquote, splice-unquote, custom macros
- **Error handling**: Try/catch, throw, error propagation
- **File I/O**: Reading, writing, loading files
- **Tail call optimization**: Recursive function performance
- **JavaScript interop**: Array operations, DOM manipulation

### Running End-to-End Tests

1. [Download and Install Python][Python]
2. Run the following from the root of the project.

```bash
make test-e2e
```

## Implementation Details

### Architecture

- **Runtime**: Built on QuickJS for fast JavaScript execution
- **Parser**: Custom reader that supports both angle brackets and parentheses
- **Evaluator**: Tree-walking interpreter with tail call optimization
- **Environment**: Lexical scoping with closure support
- **Error System**: Structured error handling with source location tracking

### Key Design Decisions

- **No Reader Macros**: Uses explicit forms like `(quote x)` instead of `'x`
- **Descriptive Function Names**: `add`, `multiply` instead of `+`, `*`
- **Immutable Data**: All data structures are immutable by default
- **Web Integration**: Built-in HTML/CSS generation and DOM manipulation

### Performance Features

- **Tail Call Optimization**: Recursive functions don't cause stack overflow
- **Lazy Evaluation**: Some operations are evaluated lazily for performance
- **Efficient Data Structures**: Optimized implementations of core types

## Standards

- [TypeScript Do's and Don'ts: Don't use `any`][TypeScript]
- [Making TypeScript Truly "Strongly Typed"][Zemskov]
- [The power of 10: rules for developing safety-critical code][Holzman]
- [JPL Institutional Coding Standard for the C Programming Language][JPL]

## Credits

- This project is based on [Make-a-Lisp (MAL)][Martin]
- With data from the [MDN content repository][MDN]
- And learnings from [Crafting Interpreters][Nystrom]

## License

See [LICENSE](LICENSE)

[Holzman]: https://ieeexplore.ieee.org/document/1642624
[JPL]: https://web.archive.org/web/20111015064908/http://lars-lab.jpl.nasa.gov/JPL_Coding_Standard_C.pdf
[Martin]: https://github.com/kanaka/mal
[MDN]: https://github.com/mdn/content/tree/main/files/jsondata
[NodeJS]: https://nodejs.org/en
[Nystrom]: https://craftinginterpreters.com/
[Python]: https://www.python.org/
[QuickJS]: https://github.com/quickjs-ng/quickjs/releases
[TypeScript]: https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#any
[Zemskov]: https://betterprogramming.pub/making-typescript-truly-strongly-typed-c3a8947434a2
