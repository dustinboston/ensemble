# Ensemble Language Development Guide

## Language Overview

Ensemble is a web-focused functional programming language with HTML-style angle bracket syntax (`<>`) as primary, with Lisp parentheses as alternative. Built on QuickJS runtime with TypeScript implementation.

## Dev Environment Setup

- **Build**: `make` - Compiles TypeScript to standalone JS via ESBuild + QuickJS
- **REPL**: `./bin/ensemble` - Interactive development
- **Run file**: `./bin/ensemble path/to/file.ensemble`
- **Prerequisites**: NodeJS, TypeScript, ESBuild, QuickJS binary in `./bin/qjs`

## Testing Instructions

- **All tests**: `make test-unit-fun` - Runs comprehensive test suite
- **E2E tests**: `make test-e2e` - Requires Python
- **Test files**: Located in `src/ensemble/tests/` with `*_test.ts` pattern
- **Test runner**: Custom runner in `src/ensemble/tests/test_runner.ts`
- **Coverage**: Core functions, data structures, macros, TCO, error handling, file I/O, JS interop

## Language Syntax Rules

### Core Forms (CRITICAL - No symbolic operators)

- **Variables**: `<var name value>` (NOT `def!`)
- **Local bindings**: `<const [bindings] body>` (NOT `let*`)
- **Arithmetic**: `<add a b>`, `<subtract a b>`, `<multiply a b>`, `<divide a b>` (NOT `+`, `-`, `*`, `/`)
- **Equality**: `<eq a b>` (NOT `=`)
- **Comparisons**: `<lt a b>`, `<gt a b>`, `<lte a b>`, `<gte a b>`
- **Error handling**: `<try expr <catch var handler>>` (NOT `try*`/`catch*`)

### No Reader Macros (CRITICAL)

- **Quote**: `<quote expr>` (NOT `'expr`)
- **Quasiquote**: `<quasiquote expr>` (NOT `` `expr``)
- **Unquote**: `<unquote expr>` (NOT `~expr`)
- **Splice-unquote**: `<splice-unquote expr>` (NOT `~@expr`)

### Dual Syntax Support

```ensemble
// Preferred angle bracket syntax
<var factorial <function <n>
  <if <eq n 0> 1 <multiply n <factorial <subtract n 1>>>>
>>

// Alternative Lisp syntax (also valid)
(var factorial (function (n)
  (if (eq n 0) 1 (multiply n (factorial (subtract n 1))))
))
```

## Architecture Deep Dive

### Key Files

- **`src/ensemble/lib.ts`**: Main evaluator, REPL, environment initialization
- **`src/ensemble/core.ts`**: Core function implementations (arithmetic, collections, etc.)
- **`src/ensemble/types.ts`**: AST node types, type checking, equality functions
- **`src/ensemble/reader.ts`**: Parser for both angle brackets and parentheses
- **`src/ensemble/printer.ts`**: AST to string conversion
- **`src/ensemble/env.ts`**: Environment/scope management
- **`src/ensemble/io.ts`**: File I/O, REPL interface

### Data Types

- **Lists**: `ListNode` - `(1 2 3)` or `<list 1 2 3>`
- **Vectors**: `VectorNode` - `[1 2 3]`
- **Maps**: `MapNode` - `{"key" value, :keyword value}`
- **Atoms**: `AtomNode` - Mutable references
- **Keywords**: `KeywordNode` - `:keyword` or `keyword:`
- **Functions**: `FunctionNode` - With closure metadata for TCO

### Error System

- **Error format**: `<error <str "ErrorType: [line:col]" "message">>`
- **Types**: `ReferenceError`, `TypeError`, `RangeError`, `SyntaxError`
- **Structured**: Nested error nodes with location tracking

## Common Development Patterns

### Adding Core Functions

1. Implement in `src/ensemble/core.ts` with proper type checking
2. Add to `nsValues` array for environment registration
3. Use descriptive names (`add` not `+`)
4. Always validate argument counts and types

### Test Writing

- Use `runner.test()` and `runner.assert()` from test_runner
- Compare AST nodes with `types.isEqualTo()` not `===`
- Use `rep()` for evaluation, `printString()` for expected output
- Test both angle bracket and parentheses syntax when relevant

### Macro Development

- Define with `<defmacro! name params body>`
- Use explicit quoting forms in macro bodies
- Test macro expansion with `macroexpand`
- Remember macros transform AST before evaluation

## Debugging Tips

- **REPL debugging**: Use `<dump>` to inspect environment
- **Error tracing**: Errors include source location `[line:col]`
- **AST inspection**: Use `printString(ast, true)` for readable output
- **Type issues**: Check `types.ts` for proper node type functions

## Performance Considerations

- **TCO**: Recursive functions use tail call optimization
- **Immutability**: All data structures are immutable by default
- **Lazy evaluation**: Some operations defer computation
- **QuickJS**: Fast JavaScript execution with minimal overhead

## Integration Points

### JavaScript Interop

- **Arrays**: `src/ensemble/interop/js/array.ts`
- **DOM**: `src/ensemble/interop/js/dom.ts`
- **Core JS**: `src/ensemble/interop/js.ts`

### HTML/CSS Generation

- **HTML**: `src/ensemble/interop/html.ts`
- **DOM nodes**: `DomNode` type for HTML element representation

## Common Gotchas

- **Never use symbolic operators** (`+`, `-`, `*`, `/`, `=`) - always use function names
- **No reader macros** - always use explicit forms like `<quote>`
- **Variable declarations** - use `var` not `def!`, `const` not `let*`
- **Error handling** - use `try`/`catch` not `try*`/`catch*`
- **Test comparisons** - use `types.isEqualTo()` for AST node equality
- **String representation** - use `printString(node, true)` for test expectations

## Build System

- **Makefile**: Main build orchestration
- **ESBuild**: TypeScript compilation and bundling
- **QuickJS**: Runtime execution environment
- **Output**: Standalone JavaScript executable

This guide contains everything needed to develop, test, and extend the Ensemble language effectively.
