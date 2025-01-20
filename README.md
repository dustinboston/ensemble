# Ensemble: Novel Synthesis of Eich, McCarthy, Berners-Lee, Lie, etc

Ensemble is a _web_ programming language that combines JavaScript, HTML, and CSS with a Lisp-like syntax.

## Syntax

```ensemble
(var fibonacci (function (n)
  (if (<= n 1) n 
    (+ (fibonacci (- n 1)) 
       (fibonacci (- n 2))))));
```

## Examples

```bash
./deno run -A ./src/ensemble_cli.ts ./examples/fibonacci.ensmbl
```

## Supported APIs

### JavaScript Built-ins

See [Standard built-in objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)

- Value properties
  - globalThis
- Function properties
  - isFinite()
  - isNaN()
  - parseFloat(): Returns nil if NaN.
  - parseInt(): Returns nil if NaN.
  - decodeURI()
  - decodeURIComponent()
  - encodeURI()
  - encodeURIComponent()
- Fundamental objects
  - Object
  - Function
  - Boolean
  - Symbol
- Error objects
  - Error
  - AggregateError
  - EvalError
  - RangeError
  - ReferenceError
  - SyntaxError
  - TypeError
  - URIError
- Numbers and dates
  - Number
  - BigInt
  - Math
  - Date
- Text processing
  - String
  - RegExp
- Indexed collections
  - Array
- Keyed collections
  - Map
  - Set
- Structured data
  - JSON
- Control abstraction objects
  - Promise
  - AsyncFunction
  - Iterator

### Unsupported Built-ins

- eval(): Removed as an anti-pattern.
- Infinity: Use Math.Infinity instead.
- NaN: Removed as an anti-pattern.
- undefined: Use `nil` instead.
- Typed collections
  - e.g. Uint16Array, Int32Array, etc.
  - Use an array instead.
- Memory management
  - WeakMap - Use a map.
  - WeakSet - Use a set.
  - ArrayBuffer
  - SharedArrayBuffer
  - DataView
  - Atomics
  - WeakRef
  - FinalizationRegistry
- Control abstractions
  - AsyncIterator
  - GeneratorFunction
  - AsyncGeneratorFunction
  - Generator
  - AsyncGenerator
  - Reflection
  - Reflect
  - Proxy
- Internationalization
  - Intl
  - Intl.Collator
  - Intl.DateTimeFormat
  - Intl.DisplayNames
  - Intl.DurationFormat
  - Intl.ListFormat
  - Intl.Locale
  - Intl.NumberFormat
  - Intl.PluralRules
  - Intl.RelativeTimeFormat
  - Intl.Segmenter

## Roadmap

- Internationalization
- Document Object Model (DOM)
- Fetch API

## Development

- Install [Deno](https://deno.land/)
- Clone <https://github.com/dustinboston/ensemble>
- Run `deno task repl`

## Unit and Integration Tests

Run all test suites:

```sh
deno test
```

## End-to-End Tests

```bash
pip install -r requirement.txt
python
```

## Standards

- [TypeScript Do's and Don'ts: Don't use `any`][TypeScript]
- [Making TypeScript Truly "Strongly Typed"][Zemskov]
- [The power of 10: rules for developing safety-critical code][Holzman]
- [JPL Institutional Coding Standard for the C Programming Language][JPL]

## JSON Schema

<https://www.jsongenerator.io/schema>

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
[Nystrom]: https://craftinginterpreters.com/
[TypeScript]: https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#any
[Zemskov]: https://betterprogramming.pub/making-typescript-truly-strongly-typed-c3a8947434a2
