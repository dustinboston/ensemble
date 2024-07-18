# Ensemble

> ENSEMBLE: Novel Synthesis of Eich, McCarthy, Berners-Lee, Lie, etc.

ENSEMBLE is a _web_ programming language. It combines JavaScript, HTML, and CSS with a Lisp-like syntax that should be familiar to modern web developers.

## Syntax

ENSEMBLE:

```js
[global fib [function [n] 
    [if [<= n 1] n
        [+ [fib [- n 1]] [fib [- n 2]]]]]]
```

ENSEMBLE JavaScript DSL:

```js
import {$, dsl} from 'ensemble';
const fib = Symbol("fib"), n = Symbol("fib"); // Or use Symbol.for inline

dsl([$.global, fib, [$.function, [n],
    [$.if, [$.lte, n, 1], [n],
        [$.add, [fib, [$.sub, n, 1]], [fib, [$.sub, n, 2]]]]]]);
```

Regular JavaScript:

```js
function fib(n) {
    if (n <= 1) return n;
    return (fib(n - 1)) + (fib( n - 2));
}
```

