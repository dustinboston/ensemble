# Ensemble

> ENSEMBLE: Novel Synthesis of Eich, McCarthy, Berners-Lee, Lie, etc.

## About

ENSEMBLE is _homoiconic_, which means that code and its underlying data structure are the same. As a result, we can run the code without parsing it first; instead, we skip directly to interpreting the code. This characteristic is particularly advantageous for an _embedded domain-specific language (DSL)_.

A DSL is a small language that focuses on a specific problem domain. ENSEMBLE is designed for modern web development, unifying the development experience across HTML, CSS, and JavaScript.

DSLs often utilize the syntax of the language they are implemented in. These types of DSLs are commonly referred to as "embedded," "internal," or "fluent." ENSEMBLE is a JavaScript-based Lisp-style embedded DSL. An interesting benefit of homoiconic code is that its output can also serve as runnable code.

## Syntax

ENSEMBLE JavaScript:

```js
[$.global, s("fib"), [$.function, [s("n")], [
    $.if, [$.lessThanOrEqual, s("n"), 1],
        [s("n")],
        [$.add,
            [s("fib"), [$.subtract, s("n"), 1]],
            [s("fib"), [$.subtract, s("n"), 2]]]]]],
```

Regular JavaScript:

```js
function fib(n) {
    if (n <= 1) {
        return n;
    } else {
        return (fib(n - 1)) + (fib( n - 2));
    }
}
```

