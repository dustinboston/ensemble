# Ensemble: Novel Synthesis of Eich, McCarthy, Berners-Lee, Lie, etc

Ensemble is a _web_ programming language that combines JavaScript, HTML, and CSS 
in a Lisp-like like language with HTML style syntax.

## Syntax

```ensemble
<var binet 
  <function <n> 
    <const [sqrt5 <Math.sqrt 5>,
        phi <divide <add 1 sqrt5> 2>,
        psi <divide <subtract 1 sqrt5> 2>]
      <Math.round <divide <subtract <power phi n> <power psi n>> sqrt5>>>>>

<console.log <binet 7>>
```

## Usage

```bash
./bin/ensemble
```

## Development

### Directory Structure

```
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
2. Follow the QuickJS installation instructions below.

#### Install or Update QuickJS

1. Download [the latest QuickJS binary][QuickJS] for your system.
2. Gently place it into the top level bin folder.

### Building Ensemble

The following commands will build the Ensemble interpreter as a standalone 
JavaScript file (using ESBuild and QuickJS).

```bash
make
```

### Running Unit and Integration Tests

To start the unit and integration tests, run the test script from the root of the project.

```bash
make test-unit-fun
```

**Note About Parallel Testing** 
It is not possible to run the tests in parallel at the moment because when this 
code was ported from Deno to QuickJS there were tests with steps. These tests 
were not modified during conversion and remain order-dependent.  

### Running End-to-End Tests

1. [Download and Install Python][Python] 
2. Run the following from the root of the project.

```bash
make test-e2e
```

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

[Globals]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
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
