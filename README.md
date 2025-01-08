# Ensemble

> ENSEMBLE: Novel Synthesis of Eich, McCarthy, Berners-Lee, Lie, etc.

ENSEMBLE is a _web_ programming language that combines JavaScript, HTML, and CSS with a Lisp-like syntax.

## Syntax

```clojure
(var fibonacci (function (n)
  (if (<= n 1) n 
    (+ (fibonacci (- n 1)) 
       (fibonacci (- n 2))))));
```

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
