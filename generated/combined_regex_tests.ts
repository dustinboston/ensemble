// deno-lint-ignore-file no-control-regex no-empty-character-class no-prototype-builtins
// cSPELL:DISABLE

import * as regExpFunctions from '@/interop/js/regexp.ts';
import * as types from '@/types.ts';
import { assert } from '@std/assert';

function createNewRegExpAtom(regExpString) {
  const re = regExpFunctions.regExpNew(types.createStringNode(regExpString));
  return re;
}

// file 15.10.2.15-6-1.js
Deno.test('RegExp: 15.10.2.15-6-1.js', () => {
  /*---
          Pattern - SyntaxError was thrown when one character in CharSet 'A'
      greater than one character in CharSet 'B' (15.10.2.15
      CharacterRange step 6)
  ---*/
  console.log('Hello');
  assert.throws(SyntaxError, function () {
    const _regExp = createNewRegExpAtom('^[z-a]$');
  });
});
// file 15.10.2.5-3-1.js
Deno.test('RegExp: 15.10.2.5-3-1.js', () => {
  /*---
    Term - SyntaxError was thrown when max is finite and less than min
    (15.10.2.5 step 3)
  ---*/

  assert.throws(SyntaxError, function () {
    const _regExp = createNewRegExpAtom('0{2,1}');
  });
});
// file 15.10.4.1-1.js
Deno.test('RegExp: 15.10.4.1-1.js', () => {
  /*---
    RegExp - no TypeError is thrown when pattern is an object and
    has a [[RegExpMatcher]] internal slot, and flags is not undefined
  ---*/

  const regObj = createNewRegExpAtom();
  const regExpObj = createNewRegExpAtom(regObj, 'g');
  assert(regExpObj.global);
});
// file 15.10.4.1-2.js
Deno.test('RegExp: 15.10.4.1-2.js', () => {
  /*---
    RegExp - the thrown error is SyntaxError instead of RegExpError
    when the characters of 'P' do not have the syntactic form Pattern
  ---*/

  assert.throws(SyntaxError, function () {
    const _regExpObj = createNewRegExpAtom('\\');
  });
});
// file 15.10.4.1-3.js
Deno.test('RegExp: 15.10.4.1-3.js', () => {
  /*---
    RegExp - the thrown error is SyntaxError instead of RegExpError
    when 'F' contains any character other than 'g', 'i', or 'm'
  ---*/

  assert.throws(SyntaxError, function () {
    const _regExpObj = createNewRegExpAtom('abc', 'a');
  });
});
// file 15.10.4.1-4.js
Deno.test('RegExp: 15.10.4.1-4.js', () => {
  /*---
description: RegExp - the SyntaxError is not thrown when flags is 'gim'
  ---*/

  const _regExpObj = createNewRegExpAtom('abc', 'gim');
});
// file call_with_non_regexp_same_constructor.js
Deno.test('RegExp: call_with_non_regexp_same_constructor.js', () => {
  /*---
description: RegExp returns its input argument if constructor is same-value
info: |
  21.2.3.1 RegExp ( pattern, flags )
  ...
  4. Else,
    a. Let newTarget be the active function object.
    b. If patternIsRegExp is true and flags is undefined, then
      i.   Let patternConstructor be Get(pattern, "constructor").
      ii.  ReturnIfAbrupt(patternConstructor).
      iii. If SameValue(newTarget, patternConstructor) is true, return pattern.
features: [Symbol.match]
  ---*/

  const obj = {
    constructor: RegExp,
  };
  obj[Symbol.match] = true;

  assert.sameValue(RegExp(obj), obj, 'RegExp returns its input argument');
});
// file call_with_regexp_match_falsy.js
Deno.test('RegExp: call_with_regexp_match_falsy.js', () => {
  /*---
    description: RegExp returns a new object if constructor is not same-value
    info: |
      21.2.3.1 RegExp ( pattern, flags )
      4. Else,
        a. Let newTarget be the active function object.
        b. If patternIsRegExp is true and flags is undefined, then
          i.   Let patternConstructor be Get(pattern, "constructor").
          ii.  ReturnIfAbrupt(patternConstructor).
          iii. If SameValue(newTarget, patternConstructor) is true, return pattern.
    features: [Symbol.match]
  ---*/

  const regExpObj = /(?:)/;
  regExpObj[Symbol.match] = false;

  assert.notSameValue(RegExp(regExpObj), regExpObj, 'RegExp returns new object');
});
// file call_with_regexp_not_same_constructor.js
Deno.test('RegExp: call_with_regexp_not_same_constructor.js', () => {
  /*---
    description: RegExp returns a new object if constructor is not same-value
    info: |
      21.2.3.1 RegExp ( pattern, flags )
      ...
      4. Else,
        a. Let newTarget be the active function object.
        b. If patternIsRegExp is true and flags is undefined, then
          i.   Let patternConstructor be Get(pattern, "constructor").
          ii.  ReturnIfAbrupt(patternConstructor).
          iii. If SameValue(newTarget, patternConstructor) is true, return pattern.
  ---*/

  const regExpObj = /(?:)/;
  regExpObj.constructor = null;

  assert.notSameValue(RegExp(regExpObj), regExpObj, 'RegExp returns new object');
});
// file character-class-escape-non-whitespace.js
Deno.test('RegExp: character-class-escape-non-whitespace.js', () => {
  

  /*---
esid: sec-characterclassescape
description: Detect non WhiteSpace using \S+
info: |
    The production CharacterClassEscape :: S evaluates by returning
    the set of all characters not included in the set returned by
    CharacterClassEscape :: s
  ---*/

  const j;
  const _i;
  const str;
  const res;

  const whitespaceChars = [
    0x0009,
    0x000A,
    0x000B,
    0x000C,
    0x000D,
    0x0020,
    0x00A0,
    0x1680,
    0x2000,
    0x2001,
    0x2002,
    0x2003,
    0x2004,
    0x2005,
    0x2006,
    0x2007,
    0x2008,
    0x2009,
    0x200A,
    0x2028,
    0x2029,
    0x202F,
    0x205F,
    0x3000,
  ];

  for (j = 0x0000; j < 0x10000; j++) {
    if (j === 0x180E) continue; // Skip 0x180E, current test in a separate file
    if (j === 0xFEFF) continue; // Ignore BOM
    str = String.fromCharCode(j);
    res = str.replace(/\S+/g, 'test262');
    if (whitespaceChars.indexOf(j) >= 0) {
      assert.sameValue(res, str, 'WhiteSpace character, charCode: ' + j);
    } else {
      assert.sameValue(res, 'test262', 'Non WhiteSpace character, charCode: ' + j);
    }
  }
});
// file character-class-escape-non-whitespace-u180e.js
Deno.test('RegExp: character-class-escape-non-whitespace-u180e.js', () => {
  

  /*---
esid: sec-characterclassescape
description: Detect non WhiteSpace using \S+
info: |
    The production CharacterClassEscape :: S evaluates by returning
    the set of all characters not included in the set returned by
    CharacterClassEscape :: s

    The Mongolian Vowel Separator (u180e) became a non whitespace character
    since Unicode 6.3.0
features: [u180e]
  ---*/

  const str = String.fromCharCode(0x180E);
  assert.sameValue(
    str.replace(/\S+/g, 'test262'),
    'test262',
    'Non WhiteSpace character: \\u180E',
  );
});
// file duplicate-flags.js
Deno.test('RegExp: duplicate-flags.js', () => {
  // Copyright 2017 the V8 project authors.  All rights reserved.

  /*---
info: |
    RegExpInitialize ( obj, pattern, flags )
      5. If F contains any code unit other than "g", "i", "m", "s", "u", or "y" or if it contains the same code unit more than once, throw a SyntaxError exception.
esid: sec-regexpinitialize
description: Check that duplicate RegExp flags are disallowed
features: [regexp-dotall, regexp-match-indices]
  ---*/

  createNewRegExpAtom('', 'mig'); // single g will not throw SyntaxError
  assert.throws(SyntaxError, () => createNewRegExpAtom('', 'migg'), 'duplicate g');

  createNewRegExpAtom('', 'i'); // single i will not throw SyntaxError
  assert.throws(SyntaxError, () => createNewRegExpAtom('', 'ii'), 'duplicate i');

  createNewRegExpAtom('', 'm'); // single m will not throw SyntaxError
  assert.throws(SyntaxError, () => createNewRegExpAtom('', 'mm'), 'duplicate m');

  createNewRegExpAtom('', 's'); // single s will not throw SyntaxError
  assert.throws(SyntaxError, () => createNewRegExpAtom('', 'ss'), 'duplicate s');

  createNewRegExpAtom('', 'u'); // single u will not throw SyntaxError
  assert.throws(SyntaxError, () => createNewRegExpAtom('', 'uu'), 'duplicate u');

  createNewRegExpAtom('', 'y'); // single y will not throw SyntaxError
  assert.throws(SyntaxError, () => createNewRegExpAtom('', 'yy'), 'duplicate y');

  createNewRegExpAtom('', 'd'); // single d will not throw SyntaxError
  assert.throws(SyntaxError, () => createNewRegExpAtom('', 'dd'), 'duplicate d');
});
// file duplicate-named-capturing-groups-syntax.js
Deno.test('RegExp: duplicate-named-capturing-groups-syntax.js', () => {
  // Copyright 2022 Igalia, S.L. All rights reserved.

  /*---
esid: sec-regexp-pattern-flags
description: Runtime parsing of syntax for duplicate named capturing groups
features: [regexp-duplicate-named-groups]
  ---*/

  assert.throws(
    SyntaxError,
    () => createNewRegExpAtom('(?<x>a)(?<x>b)'),
    'Duplicate named capturing groups in the same alternative do not parse',
  );

  const source = '(?<x>a)|(?<x>b)';
  const parsed = createNewRegExpAtom(source);
  assert.sameValue(parsed.source, source, 'Duplicate named capturing groups in separate alternatives parse correctly');
});
// file early-err-modifiers-code-point-repeat-i-1.js
Deno.test('RegExp: early-err-modifiers-code-point-repeat-i-1.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpresisonFlags : Disjunction )
    It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code points other than "i", "m", "s", or if it contains the same code point more than once.

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?ii:a)', '');
  }, 'RegExp("(?ii:a)", ""): ');
});
// file early-err-modifiers-code-point-repeat-i-2.js
Deno.test('RegExp: early-err-modifiers-code-point-repeat-i-2.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpresisonFlags : Disjunction )
    It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code points other than "i", "m", "s", or if it contains the same code point more than once.

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?imsi:a)', '');
  }, 'RegExp("(?imsi:a)", ""): ');
});
// file early-err-modifiers-other-code-point-arbitrary.js
Deno.test('RegExp: early-err-modifiers-other-code-point-arbitrary.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpresisonFlags : Disjunction )
    It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code points other than "i", "m", "s", or if it contains the same code point more than once.

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?1:a)', '');
  }, 'RegExp("(?1:a)", ""): ');
});
// file early-err-modifiers-other-code-point-combining-i.js
Deno.test('RegExp: early-err-modifiers-other-code-point-combining-i.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpresisonFlags : Disjunction )
    It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code points other than "i", "m", "s", or if it contains the same code point more than once.

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?iͥ:a)', '');
  }, 'RegExp("(?iͥ:a)", ""): ');
});
// file early-err-modifiers-other-code-point-combining-m.js
Deno.test('RegExp: early-err-modifiers-other-code-point-combining-m.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpresisonFlags : Disjunction )
    It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code points other than "i", "m", "s", or if it contains the same code point more than once.

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?mͫ:a)', '');
  }, 'RegExp("(?mͫ:a)", ""): ');
});
// file early-err-modifiers-other-code-point-combining-s.js
Deno.test('RegExp: early-err-modifiers-other-code-point-combining-s.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpresisonFlags : Disjunction )
    It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code points other than "i", "m", "s", or if it contains the same code point more than once.

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?s̀:a)', '');
  }, 'RegExp("(?s̀:a)", ""): ');
});
// file early-err-modifiers-other-code-point-d.js
Deno.test('RegExp: early-err-modifiers-other-code-point-d.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpresisonFlags : Disjunction )
    It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code points other than "i", "m", "s", or if it contains the same code point more than once.

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?d:a)', '');
  }, 'RegExp("(?d:a)", ""): ');
});
// file early-err-modifiers-other-code-point-g.js
Deno.test('RegExp: early-err-modifiers-other-code-point-g.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpresisonFlags : Disjunction )
    It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code points other than "i", "m", "s", or if it contains the same code point more than once.

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?g:a)', '');
  }, 'RegExp("(?g:a)", ""): ');
});
// file early-err-modifiers-other-code-point-non-display-1.js
Deno.test('RegExp: early-err-modifiers-other-code-point-non-display-1.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpresisonFlags : Disjunction )
    It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code points other than "i", "m", "s", or if it contains the same code point more than once.

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?s :a)', '');
  }, 'RegExp("(?s :a)", ""): ');
});
// file early-err-modifiers-other-code-point-non-display-2.js
Deno.test('RegExp: early-err-modifiers-other-code-point-non-display-2.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpresisonFlags : Disjunction )
    It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code points other than "i", "m", "s", or if it contains the same code point more than once.

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?s‎:a)', '');
  }, 'RegExp("(?s‎:a)", ""): ');
});
// file early-err-modifiers-other-code-point-non-flag.js
Deno.test('RegExp: early-err-modifiers-other-code-point-non-flag.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpresisonFlags : Disjunction )
    It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code points other than "i", "m", "s", or if it contains the same code point more than once.

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?Q:a)', '');
  }, 'RegExp("(?Q:a)", ""): ');
});
// file early-err-modifiers-other-code-point-u.js
Deno.test('RegExp: early-err-modifiers-other-code-point-u.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpresisonFlags : Disjunction )
    It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code points other than "i", "m", "s", or if it contains the same code point more than once.

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?u:a)', '');
  }, 'RegExp("(?u:a)", ""): ');
});
// file early-err-modifiers-other-code-point-uppercase-I.js
Deno.test('RegExp: early-err-modifiers-other-code-point-uppercase-I.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpresisonFlags : Disjunction )
    It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code points other than "i", "m", "s", or if it contains the same code point more than once.

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?I:a)', '');
  }, 'RegExp("(?I:a)", ""): ');
});
// file early-err-modifiers-other-code-point-y.js
Deno.test('RegExp: early-err-modifiers-other-code-point-y.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpresisonFlags : Disjunction )
    It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code points other than "i", "m", "s", or if it contains the same code point more than once.

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?y:a)', '');
  }, 'RegExp("(?y:a)", ""): ');
});
// file early-err-modifiers-other-code-point-zwj.js
Deno.test('RegExp: early-err-modifiers-other-code-point-zwj.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpresisonFlags : Disjunction )
    It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code points other than "i", "m", "s", or if it contains the same code point more than once.

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?s‍:a)', '');
  }, 'RegExp("(?s‍:a)", ""): ');
});
// file early-err-modifiers-other-code-point-zwnbsp.js
Deno.test('RegExp: early-err-modifiers-other-code-point-zwnbsp.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpresisonFlags : Disjunction )
    It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code points other than "i", "m", "s", or if it contains the same code point more than once.

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?s﻿:a)', '');
  }, 'RegExp("(?s﻿:a)", ""): ');
});
// file early-err-modifiers-other-code-point-zwnj.js
Deno.test('RegExp: early-err-modifiers-other-code-point-zwnj.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpresisonFlags : Disjunction )
    It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code points other than "i", "m", "s", or if it contains the same code point more than once.

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?s‌:a)', '');
  }, 'RegExp("(?s‌:a)", ""): ');
});
// file early-err-modifiers-should-not-case-fold-i.js
Deno.test('RegExp: early-err-modifiers-should-not-case-fold-i.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: Code points other than "i", "m", "s" should not be case folded to "i", "m", or "s" (regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpresisonFlags : Disjunction )
    It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code points other than "i", "m", "s", or if it contains the same code point more than once.

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?I:a)', 'i');
  }, 'RegExp("(?I:a)", "i"): ');
});
// file early-err-modifiers-should-not-case-fold-m.js
Deno.test('RegExp: early-err-modifiers-should-not-case-fold-m.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: Code points other than "i", "m", "s" should not be case folded to "i", "m", or "s" (regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpresisonFlags : Disjunction )
    It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code points other than "i", "m", "s", or if it contains the same code point more than once.

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?M:a)', 'i');
  }, 'RegExp("(?M:a)", "i"): ');
});
// file early-err-modifiers-should-not-case-fold-s.js
Deno.test('RegExp: early-err-modifiers-should-not-case-fold-s.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: Code points other than "i", "m", "s" should not be case folded to "i", "m", or "s" (regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpresisonFlags : Disjunction )
    It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code points other than "i", "m", "s", or if it contains the same code point more than once.

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?S:a)', 'i');
  }, 'RegExp("(?S:a)", "i"): ');
});
// file early-err-modifiers-should-not-unicode-case-fold-i.js
Deno.test('RegExp: early-err-modifiers-should-not-unicode-case-fold-i.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: Code points other than "i", "m", "s" should not be case-folded to "i", "m", or "s" (regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpresisonFlags : Disjunction )
    It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code points other than "i", "m", "s", or if it contains the same code point more than once.

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?İ:a)', 'iu');
  }, 'RegExp("(?İ:a)", "iu"): ');
});
// file early-err-modifiers-should-not-unicode-case-fold-s.js
Deno.test('RegExp: early-err-modifiers-should-not-unicode-case-fold-s.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: Code points other than "i", "m", "s" should not be case-folded to "i", "m", or "s" (regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpresisonFlags : Disjunction )
    It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code points other than "i", "m", "s", or if it contains the same code point more than once.

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?ſ:a)', 'u');
  }, 'RegExp("(?ſ:a)", "u"): ');
});
// file from-regexp-like-flag-override.js
Deno.test('RegExp: from-regexp-like-flag-override.js', () => {
  // Copyright (C) 2015 the V8 project authors. All rights reserved.

  /*---
description: Initialization from a RegExp-like object (with flag overrides)
info: |
    1. Let patternIsRegExp be IsRegExp(pattern).
    [...]
    6. Else if patternIsRegExp is true, then
       a. Let P be Get(pattern, "source").
       b. ReturnIfAbrupt(P).
       c. If flags is undefined, then
          [...]
       d. Else, let F be flags.
    [...]
    10. Return RegExpInitialize(O, P, F).
features: [Symbol, Symbol.match]
  ---*/

  const obj = {
    source: 'source text',
  };
  const result;

  Object.defineProperty(obj, 'flags', {
    get: function () {
      throw new Test262Error('The `flags` property value should not be referenced.');
    },
  });

  obj[Symbol.match] = true;
  result = createNewRegExpAtom(obj, 'g');
  assert.sameValue(
    result.source,
    'source text',
    '@@match specified as a primitive boolean',
  );
  assert.sameValue(
    result.flags,
    'g',
    '@@match specified as a primitive boolean',
  );

  obj[Symbol.match] = 'string';
  result = createNewRegExpAtom(obj, 'g');
  assert.sameValue(
    result.source,
    'source text',
    '@@match specified as a primitive string',
  );
  assert.sameValue(result.flags, 'g', '@@match specified as a primitive string');

  obj[Symbol.match] = [];
  result = createNewRegExpAtom(obj, 'g');
  assert.sameValue(
    result.source,
    'source text',
    '@@match specified as an array',
  );
  assert.sameValue(result.flags, 'g', '@@match specified as an array');

  obj[Symbol.match] = Symbol();
  result = createNewRegExpAtom(obj, 'g');
  assert.sameValue(
    result.source,
    'source text',
    '@@match specified as a Symbol',
  );
  assert.sameValue(result.flags, 'g', '@@match specified as a Symbol');

  obj[Symbol.match] = 86;
  result = createNewRegExpAtom(obj, 'g');
  assert.sameValue(
    result.source,
    'source text',
    '@@match specified as a primitive number',
  );
  assert.sameValue(result.flags, 'g', '@@match specified as a primitive number');
});
// file from-regexp-like-get-ctor-err.js
Deno.test('RegExp: from-regexp-like-get-ctor-err.js', () => {
  // Copyright (C) 2015 the V8 project authors. All rights reserved.

  /*---
    Behavior when accessing `constructor` property of RegExp-like objects
info: |
    1. Let patternIsRegExp be IsRegExp(pattern).
    [...]
    3. If NewTarget is not undefined, let newTarget be NewTarget.
    4. Else,
       a. Let newTarget be the active function object.
       b. If patternIsRegExp is true and flags is undefined, then
          i. Let patternConstructor be Get(pattern, "constructor").
          ii. ReturnIfAbrupt(patternConstructor).
          iii. If SameValue(newTarget, patternConstructor) is true, return
               pattern.
features: [Symbol, Symbol.match]
  ---*/

  const obj = Object.defineProperty({}, 'constructor', {
    get: function () {
      throw new Test262Error();
    },
  });

  obj[Symbol.match] = true;
  assert.throws(Test262Error, function () {
    RegExp(obj);
  });

  obj[Symbol.match] = 'string';
  assert.throws(Test262Error, function () {
    RegExp(obj);
  });

  obj[Symbol.match] = [];
  assert.throws(Test262Error, function () {
    RegExp(obj);
  });

  obj[Symbol.match] = Symbol();
  assert.throws(Test262Error, function () {
    RegExp(obj);
  });

  obj[Symbol.match] = 86;
  assert.throws(Test262Error, function () {
    RegExp(obj);
  });
});
// file from-regexp-like-get-flags-err.js
Deno.test('RegExp: from-regexp-like-get-flags-err.js', () => {
  // Copyright (C) 2015 the V8 project authors. All rights reserved.

  /*---
    Behavior when error thrown from `flags` property of a RegExp-like object
info: |
    1. Let patternIsRegExp be IsRegExp(pattern).
    [...]
    6. Else if patternIsRegExp is true, then
       [...]
       c. If flags is undefined, then
          i. Let F be Get(pattern, "flags").
          ii. ReturnIfAbrupt(F).
features: [Symbol, Symbol.match]
  ---*/

  const obj = {};
  Object.defineProperty(obj, 'flags', {
    get: function () {
      throw new Test262Error();
    },
  });

  obj[Symbol.match] = true;
  assert.throws(Test262Error, function () {
    createNewRegExpAtom(obj);
  });

  obj[Symbol.match] = 'string';
  assert.throws(Test262Error, function () {
    createNewRegExpAtom(obj);
  });

  obj[Symbol.match] = [];
  assert.throws(Test262Error, function () {
    createNewRegExpAtom(obj);
  });

  obj[Symbol.match] = Symbol();
  assert.throws(Test262Error, function () {
    createNewRegExpAtom(obj);
  });

  obj[Symbol.match] = 86;
  assert.throws(Test262Error, function () {
    createNewRegExpAtom(obj);
  });
});
// file from-regexp-like-get-source-err.js
Deno.test('RegExp: from-regexp-like-get-source-err.js', () => {
  // Copyright (C) 2015 the V8 project authors. All rights reserved.

  /*---
    Behavior when error thrown from `source` property of a RegExp-like object
info: |
    1. Let patternIsRegExp be IsRegExp(pattern).
    [...]
    6. Else if patternIsRegExp is true, then
       a. Let P be Get(pattern, "source").
       b. ReturnIfAbrupt(P).
features: [Symbol, Symbol.match]
  ---*/

  const obj = {};
  function CustomError() {}
  Object.defineProperty(obj, 'source', {
    get: function () {
      throw new CustomError();
    },
  });
  Object.defineProperty(obj, 'flags', {
    get: function () {
      throw new Test262Error('the `flags` property should not be referenced before `source`');
    },
  });

  obj[Symbol.match] = true;
  assert.throws(CustomError, function () {
    createNewRegExpAtom(obj);
  });

  obj[Symbol.match] = 'string';
  assert.throws(CustomError, function () {
    createNewRegExpAtom(obj);
  });

  obj[Symbol.match] = [];
  assert.throws(CustomError, function () {
    createNewRegExpAtom(obj);
  });

  obj[Symbol.match] = Symbol();
  assert.throws(CustomError, function () {
    createNewRegExpAtom(obj);
  });

  obj[Symbol.match] = 86;
  assert.throws(CustomError, function () {
    createNewRegExpAtom(obj);
  });
});
// file from-regexp-like.js
Deno.test('RegExp: from-regexp-like.js', () => {
  // Copyright (C) 2015 the V8 project authors. All rights reserved.

  /*---
description: Initialization from a RegExp-like object
info: |
    1. Let patternIsRegExp be IsRegExp(pattern).
    [...]
    6. Else if patternIsRegExp is true, then
       a. Let P be Get(pattern, "source").
       b. ReturnIfAbrupt(P).
       c. If flags is undefined, then
          i. Let F be Get(pattern, "flags").
          ii. ReturnIfAbrupt(F).
       d. Else, let F be flags.
    [...]
    10. Return RegExpInitialize(O, P, F).
features: [Symbol, Symbol.match]
  ---*/

  const obj = {
    source: 'source text',
    flags: 'i',
  };
  const result;

  obj[Symbol.match] = true;
  result = createNewRegExpAtom(obj);
  assert.sameValue(Object.getPrototypeOf(result), RegExp.prototype);
  assert.sameValue(result.source, 'source text');
  assert.sameValue(result.flags, 'i');

  obj[Symbol.match] = 'string';
  result = createNewRegExpAtom(obj);
  assert.sameValue(Object.getPrototypeOf(result), RegExp.prototype);
  assert.sameValue(result.source, 'source text');
  assert.sameValue(result.flags, 'i');

  obj[Symbol.match] = [];
  result = createNewRegExpAtom(obj);
  assert.sameValue(Object.getPrototypeOf(result), RegExp.prototype);
  assert.sameValue(result.source, 'source text');
  assert.sameValue(result.flags, 'i');

  obj[Symbol.match] = Symbol();
  result = createNewRegExpAtom(obj);
  assert.sameValue(Object.getPrototypeOf(result), RegExp.prototype);
  assert.sameValue(result.source, 'source text');
  assert.sameValue(result.flags, 'i');

  obj[Symbol.match] = 86;
  result = createNewRegExpAtom(obj);
  assert.sameValue(Object.getPrototypeOf(result), RegExp.prototype);
  assert.sameValue(result.source, 'source text');
  assert.sameValue(result.flags, 'i');
});
// file from-regexp-like-short-circuit.js
Deno.test('RegExp: from-regexp-like-short-circuit.js', () => {
  // Copyright (C) 2015 the V8 project authors. All rights reserved.

  /*---
description: Skipping construction from RegExp-like objects
info: |
    1. Let patternIsRegExp be IsRegExp(pattern).
    [...]
    3. If NewTarget is not undefined, let newTarget be NewTarget.
    4. Else,
       a. Let newTarget be the active function object.
       b. If patternIsRegExp is true and flags is undefined, then
          i. Let patternConstructor be Get(pattern, "constructor").
          ii. ReturnIfAbrupt(patternConstructor).
          iii. If SameValue(newTarget, patternConstructor) is true, return
               pattern.
features: [Symbol, Symbol.match]
  ---*/

  const obj = {
    constructor: RegExp,
  };

  obj[Symbol.match] = true;
  assert.sameValue(RegExp(obj), obj);

  obj[Symbol.match] = 'string';
  assert.sameValue(RegExp(obj), obj);

  obj[Symbol.match] = [];
  assert.sameValue(RegExp(obj), obj);

  obj[Symbol.match] = Symbol();
  assert.sameValue(RegExp(obj), obj);

  obj[Symbol.match] = 86;
  assert.sameValue(RegExp(obj), obj);
});
// file is-a-constructor.js
Deno.test('RegExp: is-a-constructor.js', () => {
  // Copyright (C) 2020 Rick Waldron. All rights reserved.

  /*---
esid: sec-ecmascript-standard-built-in-objects
  The RegExp constructor implements [[Construct]]
info: |
  IsConstructor ( argument )

  The abstract operation IsConstructor takes argument argument (an ECMAScript language value).
  It determines if argument is a function object with a [[Construct]] internal method.
  It performs the following steps when called:

  If Type(argument) is not Object, return false.
  If argument has a [[Construct]] internal method, return true.
  Return false.
includes: [isConstructor.js]
features: [Reflect.construct]
  ---*/

  assert.sameValue(isConstructor(RegExp), true, 'isConstructor(RegExp) must return true');
  createNewRegExpAtom('');
});
// file lastIndex.js
Deno.test('RegExp: lastIndex.js', () => {
  // Copyright (C) 2016 the V8 project authors. All rights reserved.

  /*---
esid: sec-regexp-pattern-flags
description: Initial state of the `lastIndex` property
info: |
  [...]
  7. Let O be ? RegExpAlloc(newTarget).
  8. Return ? RegExpInitialize(O, P, F).

  21.2.3.2.2 Runtime Semantics: RegExpInitialize

  [...]
  12. Perform ? Set(obj, "lastIndex", 0, true).
  [...]

  21.2.3.2.1 Runtime Semantics: RegExpAlloc

  [...]
  2. Perform ! DefinePropertyOrThrow(obj, "lastIndex", PropertyDescriptor
     {[[Writable]]: true, [[Enumerable]]: false, [[Configurable]]: false}).
  [...]
includes: [propertyHelper.js]
  ---*/

  const re = createNewRegExpAtom('');

  assert.sameValue(re.lastIndex, 0);

  verifyProperty(re, 'lastIndex', {
    writable: true,
    enumerable: false,
    configurable: false,
  });
});
// file lookahead-quantifier-match-groups.js
Deno.test('RegExp: lookahead-quantifier-match-groups.js', () => {
  // Copyright (C) 2023 Kevin Gibbons. All rights reserved.

  /*---
esid: sec-runtime-semantics-repeatmatcher-abstract-operation
description: 0-length matches update the captures list if and only if they are not followed by a quantifier which allows them to match 0 times.
info: |
  RepeatMatcher
    1. If max = 0, return c(x).
    2. Let d be a new MatcherContinuation with parameters (y) that captures m, min, max, greedy, x, c, parenIndex, and parenCount and performs the following steps when called:
      [...]
      b. If min = 0 and y's endIndex = x's endIndex, return failure.
      c. If min = 0, let min2 be 0; otherwise let min2 be min - 1.
      d. If max = +∞, let max2 be +∞; otherwise let max2 be max - 1.
      e. Return RepeatMatcher(m, min2, max2, greedy, y, c, parenIndex, parenCount).
    3. Let cap be a copy of x's captures List.
    4. For each integer k in the inclusive interval from parenIndex + 1 to parenIndex + parenCount, set cap[k] to undefined.
    [...]
    7. Let xr be the MatchState (Input, e, cap).
    [...]
    10. Let z be m(xr, d).
    11. If z is not failure, return z.
    12. Return c(x).
includes: [compareArray.js]
  ---*/

  assert.compareArray('abc'.match(/(?:(?=(abc)))a/), ['a', 'abc'], 'unquantified');
  assert.compareArray('abc'.match(/(?:(?=(abc)))?a/), ['a', undefined], '? quantifier');
  assert.compareArray('abc'.match(/(?:(?=(abc))){1,1}a/), ['a', 'abc'], '{1,1} quantifier');
  assert.compareArray('abc'.match(/(?:(?=(abc))){0,1}a/), ['a', undefined], '{0,1} quantifier');
});
// file nullable-quantifier.js
Deno.test('RegExp: nullable-quantifier.js', () => {
  // Copyright (C) 2024 Aurèle Barrière. All rights reserved.

  /*---
esid: sec-runtime-semantics-repeatmatcher-abstract-operation
description: JavaScript nullable quantifiers have special semantics, optional iterations are not allowed to match the empty string. Point 2.b below shows that after each optional (min=0) iteration of a quantifier, if the iteration matched the empty string (y.[[EndIndex]] = x.[[EndIndex]]), then the iteration is discarded. In particular, for (a?b??)* on "ab", it is possible to do two iterations of the star, one matching "a" and the other matching "b".
info: |
    RepeatMatcher ( m, min, max, greedy, x, c, parenIndex, parenCount )

    2. Let d be a new MatcherContinuation with parameters (y) that captures m, min, max, greedy, x, c, parenIndex, and parenCount and performs the following steps when called:

      b. If min = 0 and y.[[EndIndex]] = x.[[EndIndex]], return failure.
author: Aurèle Barrière
  ---*/

  const input = 'ab';
  const regex = /(a?b??)*/;
  const match = regex.exec(input);
  const expected = 'ab';

  assert.sameValue(match[0], expected, 'The regex is expected to match the whole string');
});
// file prop-desc.js
Deno.test('RegExp: prop-desc.js', () => {
  // Copyright (C) 2019 Bocoup. All rights reserved.

  /*---
esid: sec-constructor-properties-of-the-global-object-regexp
description: Property descriptor for RegExp
info: |
  Every other data property described in clauses 18 through 26 and in Annex B.2
  has the attributes { [[Writable]]: true, [[Enumerable]]: false,
  [[Configurable]]: true } unless otherwise specified.
includes: [propertyHelper.js]
  ---*/

  verifyProperty(this, 'RegExp', {
    writable: true,
    enumerable: false,
    configurable: true,
  });
});
// file proto-from-ctor-realm.js
Deno.test('RegExp: proto-from-ctor-realm.js', () => {
  // Copyright (C) 2016 the V8 project authors. All rights reserved.

  /*---
esid: sec-boolean-constructor-boolean-value
description: Default [[Prototype]] value derived from realm of the newTarget
info: |
    [...]
    2. If NewTarget is not undefined, let newTarget be NewTarget.
    [...]
    7. Let O be ? RegExpAlloc(newTarget).
    [...]

    9.1.14 GetPrototypeFromConstructor

    [...]
    3. Let proto be ? Get(constructor, "prototype").
    4. If Type(proto) is not Object, then
       a. Let realm be ? GetFunctionRealm(constructor).
       b. Let proto be realm's intrinsic object named intrinsicDefaultProto.
    [...]
features: [cross-realm, Reflect]
  ---*/

  const other = $262.createRealm().global;
  const C = new other.Function();
  C.prototype = null;

  const o = Reflect.construct(RegExp, [], C);

  assert.sameValue(Object.getPrototypeOf(o), other.RegExp.prototype);
});
// file quantifier-integer-limit.js
Deno.test('RegExp: quantifier-integer-limit.js', () => {
  // Copyright (C) 2020 Alexey Shvayka. All rights reserved.

  /*---
esid: sec-quantifier
  MV of DecimalDigits evaluates to 2 ** 53 - 1.
  (although DecimalDigits could be arbitrary large integer)
info: |
  Quantifier

  The production QuantifierPrefix :: { DecimalDigits } evaluates as follows:

  1. Let i be the MV of DecimalDigits (see 11.8.3).
  2. Return the two results i and i.

  The production QuantifierPrefix :: { DecimalDigits, } evaluates as follows:

  1. Let i be the MV of DecimalDigits.
  2. Return the two results i and ∞.

  The production QuantifierPrefix :: { DecimalDigits, DecimalDigits } evaluates as follows:

  1. Let i be the MV of the first DecimalDigits.
  2. Let j be the MV of the second DecimalDigits.
  3. Return the two results i and j.
  ---*/

  const re1 = createNewRegExpAtom('b{' + Number.MAX_SAFE_INTEGER + '}', 'u');
  assert(!re1.test(''));

  const re2 = createNewRegExpAtom('b{' + Number.MAX_SAFE_INTEGER + ',}?');
  assert(!re2.test('a'));

  const re3 = createNewRegExpAtom('b{' + Number.MAX_SAFE_INTEGER + ',' + Number.MAX_SAFE_INTEGER + '}');
  assert(!re3.test('b'));
});
// file regexp-class-chars.js
Deno.test('RegExp: regexp-class-chars.js', () => {
  // Copyright (C) 2019 Mike Pennisi. All rights reserved.

  /*---
description: RegularExpressionClassChars may include the forward slash character
info: |
  11.8.5Regular Expression Literals

  RegularExpressionClass ::
    [ RegularExpressionClassChars ]

  RegularExpressionClassChars ::
    [empty]
    RegularExpressionClassChars RegularExpressionClassChar

  RegularExpressionClassChar ::
    RegularExpressionNonTerminator but not one of ] or \
    RegularExpressionBackslashSequence

  RegularExpressionNonTerminator ::
    SourceCharacterbut not LineTerminator
esid: sec-literals-regular-expression-literals
  ---*/

  assert(/[/]/.test('/'), 'Forward slash');
  assert.sameValue(/[/]/.test('x'), false, 'Forward slash');

  assert(/[//]/.test('/'), 'Forward slash - repeated');
  assert.sameValue(/[//]/.test('x'), false, 'Forward slash - repeated');
});
// file S15.10.1_A1_T10.js
Deno.test('RegExp: S15.10.1_A1_T10.js', () => {
  /*---
info: RegExp syntax errors must be caught when matcher(s) compiles
description: Tested RegExp is "++a"
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom("++a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('++a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.1_A1_T11.js
Deno.test('RegExp: S15.10.1_A1_T11.js', () => {
  /*---
info: RegExp syntax errors must be caught when matcher(s) compiles
description: Tested RegExp is "?a"
  ---*/

  try {
    throw new Test262Error('#1.1: createNewRegExpAtom("?a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('?a')));
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.1_A1_T12.js
Deno.test('RegExp: S15.10.1_A1_T12.js', () => {
  /*---
info: RegExp syntax errors must be caught when matcher(s) compiles
description: Tested RegExp is "??a"
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom("??a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('??a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.1_A1_T13.js
Deno.test('RegExp: S15.10.1_A1_T13.js', () => {
  /*---
info: RegExp syntax errors must be caught when matcher(s) compiles
description: Tested RegExp is "x{1}{1,}"
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom("x{1}{1,}") throw SyntaxError. Actual: ' + (createNewRegExpAtom('x{1}{1,}')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.1_A1_T14.js
Deno.test('RegExp: S15.10.1_A1_T14.js', () => {
  /*---
info: RegExp syntax errors must be caught when matcher(s) compiles
description: Tested RegExp is "x{1,2}{1}"
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom("x{1,2}{1}") throw SyntaxError. Actual: ' + (createNewRegExpAtom('x{1,2}{1}')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.1_A1_T15.js
Deno.test('RegExp: S15.10.1_A1_T15.js', () => {
  /*---
info: RegExp syntax errors must be caught when matcher(s) compiles
description: Tested RegExp is "x{1,}{1}"
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom("x{1,}{1}") throw SyntaxError. Actual: ' + (createNewRegExpAtom('x{1,}{1}')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.1_A1_T16.js
Deno.test('RegExp: S15.10.1_A1_T16.js', () => {
  /*---
info: RegExp syntax errors must be caught when matcher(s) compiles
description: Tested RegExp is "x{0,1}{1,}"
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom("x{0,1}{1,}") throw SyntaxError. Actual: ' + (createNewRegExpAtom('x{0,1}{1,}')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.1_A1_T1.js
Deno.test('RegExp: S15.10.1_A1_T1.js', () => {
  /*---
info: RegExp syntax errors must be caught when matcher(s) compiles
description: Tested RegExp is "a**"
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom("a**") throw SyntaxError. Actual: ' + (createNewRegExpAtom('a**')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.1_A1_T2.js
Deno.test('RegExp: S15.10.1_A1_T2.js', () => {
  /*---
info: RegExp syntax errors must be caught when matcher(s) compiles
description: Tested RegExp is "a***"
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom("a***") throw SyntaxError. Actual: ' + (createNewRegExpAtom('a***')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.1_A1_T3.js
Deno.test('RegExp: S15.10.1_A1_T3.js', () => {
  /*---
info: RegExp syntax errors must be caught when matcher(s) compiles
description: Tested RegExp is "a++"
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom("a++") throw SyntaxError. Actual: ' + (createNewRegExpAtom('a++')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.1_A1_T4.js
Deno.test('RegExp: S15.10.1_A1_T4.js', () => {
  /*---
info: RegExp syntax errors must be caught when matcher(s) compiles
description: Tested RegExp is "a+++"
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom("a+++") throw SyntaxError. Actual: ' + (createNewRegExpAtom('a+++')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.1_A1_T5.js
Deno.test('RegExp: S15.10.1_A1_T5.js', () => {
  /*---
info: RegExp syntax errors must be caught when matcher(s) compiles
description: Tested RegExp is "a???"
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom("a???") throw SyntaxError. Actual: ' + (createNewRegExpAtom('a???')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.1_A1_T6.js
Deno.test('RegExp: S15.10.1_A1_T6.js', () => {
  /*---
info: RegExp syntax errors must be caught when matcher(s) compiles
description: Tested RegExp is "a????"
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom("a????") throw SyntaxError. Actual: ' + (createNewRegExpAtom('a????')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.1_A1_T7.js
Deno.test('RegExp: S15.10.1_A1_T7.js', () => {
  /*---
info: RegExp syntax errors must be caught when matcher(s) compiles
description: Tested RegExp is "*a"
  ---*/

  try {
    throw new Test262Error('#1.1: createNewRegExpAtom("*a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('*a')));
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.1_A1_T8.js
Deno.test('RegExp: S15.10.1_A1_T8.js', () => {
  /*---
info: RegExp syntax errors must be caught when matcher(s) compiles
description: Tested RegExp is "**a"
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom("**a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('**a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.1_A1_T9.js
Deno.test('RegExp: S15.10.1_A1_T9.js', () => {
  /*---
info: RegExp syntax errors must be caught when matcher(s) compiles
description: Tested RegExp is "+a"
  ---*/

  try {
    throw new Test262Error('#1.1: createNewRegExpAtom("+a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('+a')));
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.10_A1.1_T1.js
Deno.test('RegExp: S15.10.2.10_A1.1_T1.js', () => {
  /*---
info: |
    The production CharacterEscape :: t evaluates by returning
    the character \u0009
description: Use \t in RegExp and \u0009 in tested string
  ---*/

  let arr = /\t/.exec('\u0009');
  if ((arr === null) || (arr[0] !== '\u0009')) {
    throw new Test262Error('#1: const arr = /\\t/.exec("\\u0009"); arr[0] === "\\u0009". Actual. ' + (arr && arr[0]));
  }

  arr = /\t\t/.exec('a\u0009\u0009b');
  if ((arr === null) || (arr[0] !== '\u0009\u0009')) {
    throw new Test262Error(
      '#2: const arr = /\\t\\t/.exec("a\\u0009\\u0009b"); arr[0] === "\\u0009\\u0009". Actual. ' + (arr && arr[0]),
    );
  }
});
// file S15.10.2.10_A1.2_T1.js
Deno.test('RegExp: S15.10.2.10_A1.2_T1.js', () => {
  /*---
info: |
    The production CharacterEscape :: n evaluates by returning
    the character \u000A
description: Use \n in RegExp and \u000A in tested string
  ---*/

  let arr = /\n/.exec('\u000A');
  if ((arr === null) || (arr[0] !== '\u000A')) {
    throw new Test262Error('#1: const arr = /\\n/.exec("\\u000A"); arr[0] === "\\u000A". Actual. ' + (arr && arr[0]));
  }

  arr = /\n\n/.exec('a\u000A\u000Ab');
  if ((arr === null) || (arr[0] !== '\u000A\u000A')) {
    throw new Test262Error(
      '#2: const arr = /\\n\\n/.exec("a\\u000A\\u000Ab"); arr[0] === "\\u000A\\u000A". Actual. ' + (arr && arr[0]),
    );
  }
});
// file S15.10.2.10_A1.3_T1.js
Deno.test('RegExp: S15.10.2.10_A1.3_T1.js', () => {
  /*---
info: |
    The production CharacterEscape :: v evaluates by returning
    the character \u000B
description: Use \v in RegExp and \u000B in tested string
  ---*/

  let arr = /\v/.exec('\u000B');
  if ((arr === null) || (arr[0] !== '\u000B')) {
    throw new Test262Error('#1: const arr = /\\v/.exec("\\u000B"); arr[0] === "\\u000B". Actual. ' + (arr && arr[0]));
  }

  arr = /\v\v/.exec('a\u000B\u000Bb');
  if ((arr === null) || (arr[0] !== '\u000B\u000B')) {
    throw new Test262Error(
      '#2: const arr = /\\v\\v/.exec("a\\u000B\\u000Bb"); arr[0] === "\\u000B\\u000B". Actual. ' + (arr && arr[0]),
    );
  }
});
// file S15.10.2.10_A1.4_T1.js
Deno.test('RegExp: S15.10.2.10_A1.4_T1.js', () => {
  /*---
info: |
    The production CharacterEscape :: f evaluates by returning
    the character \u000C
description: Use \f in RegExp and \u000C in tested string
  ---*/

  let arr = /\f/.exec('\u000C');
  if ((arr === null) || (arr[0] !== '\u000C')) {
    throw new Test262Error('#1: const arr = /\\f/.exec("\\u000C"); arr[0] === "\\u000C". Actual. ' + (arr && arr[0]));
  }

  arr = /\f\f/.exec('a\u000C\u000Cb');
  if ((arr === null) || (arr[0] !== '\u000C\u000C')) {
    throw new Test262Error(
      '#2: const arr = /\\f\\f/.exec("a\\u000C\\u000Cb"); arr[0] === "\\u000C\\u000C". Actual. ' + (arr && arr[0]),
    );
  }
});
// file S15.10.2.10_A1.5_T1.js
Deno.test('RegExp: S15.10.2.10_A1.5_T1.js', () => {
  /*---
info: |
    The production CharacterEscape :: r evaluates by returning
    the character \u000D
description: Use \r in RegExp and \u000D in tested string
  ---*/

  let arr = /\r/.exec('\u000D');
  if ((arr === null) || (arr[0] !== '\u000D')) {
    throw new Test262Error('#1: const arr = /\\r/.exec("\\u000D"); arr[0] === "\\u000D". Actual. ' + (arr && arr[0]));
  }

  arr = /\r\r/.exec('a\u000D\u000Db');
  if ((arr === null) || (arr[0] !== '\u000D\u000D')) {
    throw new Test262Error(
      '#2: const arr = /\\r\\r/.exec("a\\u000D\\u000Db"); arr[0] === "\\u000D\\u000D". Actual. ' + (arr && arr[0]),
    );
  }
});
// file S15.10.2.10_A2.1_T1.js
Deno.test('RegExp: S15.10.2.10_A2.1_T1.js', () => {
  /*---
info: "CharacterEscape :: c ControlLetter"
description: "ControlLetter :: A - Z"
  ---*/

  const result = true;
  for (const alpha = 0x0041; alpha <= 0x005A; alpha++) {
    const str = String.fromCharCode(alpha % 32);
    const arr = (createNewRegExpAtom('\\c' + String.fromCharCode(alpha))).exec(str);
    if ((arr === null) || (arr[0] !== str)) {
      result = false;
    }
  }

  assert.sameValue(result, true, 'The value of result is expected to be true');
});
// file S15.10.2.10_A2.1_T2.js
Deno.test('RegExp: S15.10.2.10_A2.1_T2.js', () => {
  /*---
info: "CharacterEscape :: c ControlLetter"
description: "ControlLetter :: a - z"
  ---*/

  const result = true;
  for (const alpha = 0x0061; alpha <= 0x007A; alpha++) {
    const str = String.fromCharCode(alpha % 32);
    const arr = (createNewRegExpAtom('\\c' + String.fromCharCode(alpha))).exec(str);
    if ((arr === null) || (arr[0] !== str)) {
      result = false;
    }
  }

  assert.sameValue(result, true, 'The value of result is expected to be true');
});
// file S15.10.2.10_A3.1_T1.js
Deno.test('RegExp: S15.10.2.10_A3.1_T1.js', () => {
  /*---
info: "CharacterEscape :: HexEscapeSequence :: x HexDigit HexDigit"
description: Tested string include equal unicode symbols
  ---*/

  let arr = /\x00/.exec('\u0000');
  if ((arr === null) || (arr[0] !== '\u0000')) {
    throw new Test262Error('#0: const arr = /\\x00/.exec(\\u0000); arr[0] === "\\u0000". Actual. ' + (arr && arr[0]));
  }

  arr = /\x01/.exec('\u0001');
  if ((arr === null) || (arr[0] !== '\u0001')) {
    throw new Test262Error('#1: const arr = /\\x01/.exec(\\u0001); arr[0] === "\\u0001". Actual. ' + (arr && arr[0]));
  }

  arr = /\x0A/.exec('\u000A');
  if ((arr === null) || (arr[0] !== '\u000A')) {
    throw new Test262Error('#2: const arr = /\\x0A/.exec(\\u000A); arr[0] === "\\u000A". Actual. ' + (arr && arr[0]));
  }

  arr = /\xFF/.exec('\u00FF');
  if ((arr === null) || (arr[0] !== '\u00FF')) {
    throw new Test262Error('#3: const arr = /\\xFF/.exec(\\u00FF); arr[0] === "\\u00FF". Actual. ' + (arr && arr[0]));
  }
});
// file S15.10.2.10_A3.1_T2.js
Deno.test('RegExp: S15.10.2.10_A3.1_T2.js', () => {
  /*---
info: "CharacterEscape :: HexEscapeSequence :: x HexDigit HexDigit"
description: Checking ENGLISH CAPITAL ALPHABET and english small alphabet
  ---*/

  const hex = [
    '\\x41',
    '\\x42',
    '\\x43',
    '\\x44',
    '\\x45',
    '\\x46',
    '\\x47',
    '\\x48',
    '\\x49',
    '\\x4A',
    '\\x4B',
    '\\x4C',
    '\\x4D',
    '\\x4E',
    '\\x4F',
    '\\x50',
    '\\x51',
    '\\x52',
    '\\x53',
    '\\x54',
    '\\x55',
    '\\x56',
    '\\x57',
    '\\x58',
    '\\x59',
    '\\x5A',
  ];
  const character = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  let result = true;
  for (const index = 0; index < hex.length; index++) {
    const arr = (createNewRegExpAtom(hex[index])).exec(character[index]);
    if ((arr === null) || (arr[0] !== character[index])) {
      result = false;
    }
  }

  assert.sameValue(result, true, 'The value of result is expected to be true');

  hex = [
    '\\x61',
    '\\x62',
    '\\x63',
    '\\x64',
    '\\x65',
    '\\x66',
    '\\x67',
    '\\x68',
    '\\x69',
    '\\x6A',
    '\\x6B',
    '\\x6C',
    '\\x6D',
    '\\x6E',
    '\\x6F',
    '\\x70',
    '\\x71',
    '\\x72',
    '\\x73',
    '\\x74',
    '\\x75',
    '\\x76',
    '\\x77',
    '\\x78',
    '\\x79',
    '\\x7A',
  ];
  character = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  result = true;
  for (index = 0; index < hex.length; index++) {
    arr = (createNewRegExpAtom(hex[index])).exec(character[index]);
    if ((arr === null) || (arr[0] !== character[index])) {
      result = false;
    }
  }

  assert.sameValue(result, true, 'The value of result is expected to be true');
});
// file S15.10.2.10_A4.1_T1.js
Deno.test('RegExp: S15.10.2.10_A4.1_T1.js', () => {
  /*---
info: |
    CharacterEscape :: UnicodeEscapeSequence :: u HexDigit HexDigit HexDigit
    HexDigit
description: RegExp and tested string include uncode symbols
  ---*/

  let arr = /\u0000/.exec('\u0000');
  if ((arr === null) || (arr[0] !== '\u0000')) {
    throw new Test262Error('#0: const arr = /\\u0000/.exec(\\u0000); arr[0] === "\\u0000". Actual. ' + (arr && arr[0]));
  }

  arr = /\u0001/.exec('\u0001');
  if ((arr === null) || (arr[0] !== '\u0001')) {
    throw new Test262Error('#1: const arr = /\\u0001/.exec(\\u0001); arr[0] === "\\u0001". Actual. ' + (arr && arr[0]));
  }

  arr = /\u000A/.exec('\u000A');
  if ((arr === null) || (arr[0] !== '\u000A')) {
    throw new Test262Error('#2: const arr = /\\u000A/.exec(\\u000A); arr[0] === "\\u000A". Actual. ' + (arr && arr[0]));
  }

  arr = /\u00FF/.exec('\u00FF');
  if ((arr === null) || (arr[0] !== '\u00FF')) {
    throw new Test262Error('#3: const arr = /\\u00FF/.exec(\\u00FF); arr[0] === "\\u00FF". Actual. ' + (arr && arr[0]));
  }

  arr = /\u0FFF/.exec('\u0FFF');
  if ((arr === null) || (arr[0] !== '\u0FFF')) {
    throw new Test262Error('#4: const arr = /\\u0FFF/.exec(\\u0FFF); arr[0] === "\\u0FFF". Actual. ' + (arr && arr[0]));
  }

  arr = /\uFFFF/.exec('\uFFFF');
  if ((arr === null) || (arr[0] !== '\uFFFF')) {
    throw new Test262Error('#5: const arr = /\\uFFFF/.exec(\\uFFFF); arr[0] === "\\uFFFF". Actual. ' + (arr && arr[0]));
  }
});
// file S15.10.2.10_A4.1_T2.js
Deno.test('RegExp: S15.10.2.10_A4.1_T2.js', () => {
  /*---
info: |
    CharacterEscape :: UnicodeEscapeSequence :: u HexDigit HexDigit HexDigit
    HexDigit
    Tested string include ENGLISH CAPITAL ALPHABET and english small
    alphabet
  ---*/

  const hex = [
    '\\u0041',
    '\\u0042',
    '\\u0043',
    '\\u0044',
    '\\u0045',
    '\\u0046',
    '\\u0047',
    '\\u0048',
    '\\u0049',
    '\\u004A',
    '\\u004B',
    '\\u004C',
    '\\u004D',
    '\\u004E',
    '\\u004F',
    '\\u0050',
    '\\u0051',
    '\\u0052',
    '\\u0053',
    '\\u0054',
    '\\u0055',
    '\\u0056',
    '\\u0057',
    '\\u0058',
    '\\u0059',
    '\\u005A',
  ];
  const character = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  let result = true;
  for (const index = 0; index < hex.length; index++) {
    const arr = (createNewRegExpAtom(hex[index])).exec(character[index]);
    if ((arr === null) || (arr[0] !== character[index])) {
      result = false;
    }
  }

  assert.sameValue(result, true, 'The value of result is expected to be true');

  hex = [
    '\\u0061',
    '\\u0062',
    '\\u0063',
    '\\u0064',
    '\\u0065',
    '\\u0066',
    '\\u0067',
    '\\u0068',
    '\\u0069',
    '\\u006A',
    '\\u006B',
    '\\u006C',
    '\\u006D',
    '\\u006E',
    '\\u006F',
    '\\u0070',
    '\\u0071',
    '\\u0072',
    '\\u0073',
    '\\u0074',
    '\\u0075',
    '\\u0076',
    '\\u0077',
    '\\u0078',
    '\\u0079',
    '\\u007A',
  ];
  character = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  result = true;
  for (index = 0; index < hex.length; index++) {
    arr = (createNewRegExpAtom(hex[index])).exec(character[index]);
    if ((arr === null) || (arr[0] !== character[index])) {
      result = false;
    }
  }

  assert.sameValue(result, true, 'The value of result is expected to be true');
});
// file S15.10.2.10_A4.1_T3.js
Deno.test('RegExp: S15.10.2.10_A4.1_T3.js', () => {
  /*---
info: |
    CharacterEscape :: UnicodeEscapeSequence :: u HexDigit HexDigit HexDigit
    HexDigit
    Tested string include RUSSIAN CAPITAL ALPHABET and russian small
    alphabet in unicode notation
  ---*/

  const hex = [
    '\\u0410',
    '\\u0411',
    '\\u0412',
    '\\u0413',
    '\\u0414',
    '\\u0415',
    '\\u0416',
    '\\u0417',
    '\\u0418',
    '\\u0419',
    '\\u041A',
    '\\u041B',
    '\\u041C',
    '\\u041D',
    '\\u041E',
    '\\u041F',
    '\\u0420',
    '\\u0421',
    '\\u0422',
    '\\u0423',
    '\\u0424',
    '\\u0425',
    '\\u0426',
    '\\u0427',
    '\\u0428',
    '\\u0429',
    '\\u042A',
    '\\u042B',
    '\\u042C',
    '\\u042D',
    '\\u042E',
    '\\u042F',
    '\\u0401',
  ];
  const character = [
    '\u0410',
    '\u0411',
    '\u0412',
    '\u0413',
    '\u0414',
    '\u0415',
    '\u0416',
    '\u0417',
    '\u0418',
    '\u0419',
    '\u041A',
    '\u041B',
    '\u041C',
    '\u041D',
    '\u041E',
    '\u041F',
    '\u0420',
    '\u0421',
    '\u0422',
    '\u0423',
    '\u0424',
    '\u0425',
    '\u0426',
    '\u0427',
    '\u0428',
    '\u0429',
    '\u042A',
    '\u042B',
    '\u042C',
    '\u042D',
    '\u042E',
    '\u042F',
    '\u0401',
  ];
  let result = true;
  for (const index = 0; index < hex.length; index++) {
    const arr = (createNewRegExpAtom(hex[index])).exec(character[index]);
    if ((arr === null) || (arr[0] !== character[index])) {
      result = false;
    }
  }

  assert.sameValue(result, true, 'The value of result is expected to be true');

  hex = [
    '\\u0430',
    '\\u0431',
    '\\u0432',
    '\\u0433',
    '\\u0434',
    '\\u0435',
    '\\u0436',
    '\\u0437',
    '\\u0438',
    '\\u0439',
    '\\u043A',
    '\\u043B',
    '\\u043C',
    '\\u043D',
    '\\u043E',
    '\\u043F',
    '\\u0440',
    '\\u0441',
    '\\u0442',
    '\\u0443',
    '\\u0444',
    '\\u0445',
    '\\u0446',
    '\\u0447',
    '\\u0448',
    '\\u0449',
    '\\u044A',
    '\\u044B',
    '\\u044C',
    '\\u044D',
    '\\u044E',
    '\\u044F',
    '\\u0451',
  ];
  character = [
    '\u0430',
    '\u0431',
    '\u0432',
    '\u0433',
    '\u0434',
    '\u0435',
    '\u0436',
    '\u0437',
    '\u0438',
    '\u0439',
    '\u043A',
    '\u043B',
    '\u043C',
    '\u043D',
    '\u043E',
    '\u043F',
    '\u0440',
    '\u0441',
    '\u0442',
    '\u0443',
    '\u0444',
    '\u0445',
    '\u0446',
    '\u0447',
    '\u0448',
    '\u0449',
    '\u044A',
    '\u044B',
    '\u044C',
    '\u044D',
    '\u044E',
    '\u044F',
    '\u0451',
  ];
  result = true;
  for (index = 0; index < hex.length; index++) {
    arr = (createNewRegExpAtom(hex[index])).exec(character[index]);
    if ((arr === null) || (arr[0] !== character[index])) {
      result = false;
    }
  }

  assert.sameValue(result, true, 'The value of result is expected to be true');
});
// file S15.10.2.10_A5.1_T1.js
Deno.test('RegExp: S15.10.2.10_A5.1_T1.js', () => {
  /*---
info: |
    CharacterEscape :: IdentityEscapeSequence :: SourceCharacter but not
    IdentifierPart
description: "Tested string is \"~`!@#$%^&*()-+={[}]|\\\\:;'<,>./?\" + '\"'"
  ---*/

  const non_ident = "~`!@#$%^&*()-+={[}]|\\:;'<,>./?" + '"';
  for (const k = 0; k < non_ident.length; ++k) {
    const arr = createNewRegExpAtom('\\' + non_ident[k], 'g').exec(non_ident);
    assert.notSameValue(arr, null, 'No match for character: ' + non_ident[k]);
    assert.sameValue(arr[0], non_ident[k]);
  }
});
// file S15.10.2.11_A1_T1.js
Deno.test('RegExp: S15.10.2.11_A1_T1.js', () => {
  /*---
info: "DecimalEscape :: DecimalIntegerLiteral [lookahead not in DecimalDigit]"
    DecimalEscape :: 0. If i is zero, return the EscapeValue
    consisting of a <NUL> character (Unicodevalue0000)
  ---*/

  let arr = /\0/.exec('\u0000');
  if ((arr === null) || (arr[0] !== '\u0000')) {
    throw new Test262Error('#1: const arr = /\\0/.exec(\\u0000); arr[0] === "\\u0000". Actual. ' + (arr && arr[0]));
  }

  arr = (createNewRegExpAtom('\\0')).exec('\u0000');
  if ((arr === null) || (arr[0] !== '\u0000')) {
    throw new Test262Error(
      '#2: const arr = (createNewRegExpAtom("\\0")).exec(\\u0000); arr[0] === "\\u0000". Actual. ' + (arr && arr[0]),
    );
  }
});
// file S15.10.2.11_A1_T4.js
Deno.test('RegExp: S15.10.2.11_A1_T4.js', () => {
  /*---
info: "DecimalEscape :: DecimalIntegerLiteral [lookahead not in DecimalDigit]"
description: DecimalIntegerLiteral is not 0
  ---*/

  const arr = /(A)\1/.exec('AA');

  if ((arr === null) || (arr[0] !== 'AA')) {
    throw new Test262Error('#1: const arr = (/(A)\\1/.exec("AA")); arr[0] === "AA". Actual. ' + (arr && arr[0]));
  }

  if ((arr === null) || (arr[1] !== 'A')) {
    throw new Test262Error('#2: const arr = (/(A)\\1/.exec("AA")); arr[1] === "A". Actual. ' + (arr && arr[1]));
  }
});
// file S15.10.2.11_A1_T5.js
Deno.test('RegExp: S15.10.2.11_A1_T5.js', () => {
  /*---
info: "DecimalEscape :: DecimalIntegerLiteral [lookahead not in DecimalDigit]"
description: DecimalIntegerLiteral is not 0
  ---*/

  const arr = /\1(A)/.exec('AA');

  if ((arr === null) || (arr[0] !== 'A')) {
    throw new Test262Error('#1: const arr = (/\\1(A)/.exec("AA")); arr[0] === "A". Actual. ' + (arr && arr[0]));
  }

  if ((arr === null) || (arr[1] !== 'A')) {
    throw new Test262Error('#2: const arr = (/\\1(A)/.exec("AA")); arr[1] === "A". Actual. ' + (arr && arr[1]));
  }
});
// file S15.10.2.11_A1_T6.js
Deno.test('RegExp: S15.10.2.11_A1_T6.js', () => {
  /*---
info: "DecimalEscape :: DecimalIntegerLiteral [lookahead not in DecimalDigit]"
description: DecimalIntegerLiteral is not 0
  ---*/

  const arr = /(A)\1(B)\2/.exec('AABB');

  if ((arr === null) || (arr[0] !== 'AABB')) {
    throw new Test262Error(
      '#1: const arr = /(A)\\1(B)\\2/.exec("AABB"); arr[0] === "AABB". Actual. ' + (arr && arr[0]),
    );
  }

  if ((arr === null) || (arr[1] !== 'A')) {
    throw new Test262Error('#2: const arr = /(A)\\1(B)\\2/.exec("AABB"); arr[1] === "A". Actual. ' + (arr && arr[1]));
  }

  if ((arr === null) || (arr[2] !== 'B')) {
    throw new Test262Error('#3: const arr = /(A)\\1(B)\\2/.exec("AABB"); arr[2] === "B". Actual. ' + (arr && arr[2]));
  }
});
// file S15.10.2.11_A1_T7.js
Deno.test('RegExp: S15.10.2.11_A1_T7.js', () => {
  /*---
info: "DecimalEscape :: DecimalIntegerLiteral [lookahead not in DecimalDigit]"
description: DecimalIntegerLiteral is not 0
  ---*/

  const arr = /\1(A)(B)\2/.exec('ABB');

  if ((arr === null) || (arr[0] !== 'ABB')) {
    throw new Test262Error('#1: const arr = /\\1(A)(B)\\2/.exec("ABB"); arr[0] === "ABB". Actual. ' + (arr && arr[0]));
  }

  if ((arr === null) || (arr[1] !== 'A')) {
    throw new Test262Error('#2: const arr = /\\1(A)(B)\\2/.exec("ABB"); arr[1] === "A". Actual. ' + (arr && arr[1]));
  }

  if ((arr === null) || (arr[2] !== 'B')) {
    throw new Test262Error('#3: const arr = /\\1(A)(B)\\2/.exec("ABB"); arr[2] === "B". Actual. ' + (arr && arr[2]));
  }
});
// file S15.10.2.11_A1_T8.js
Deno.test('RegExp: S15.10.2.11_A1_T8.js', () => {
  /*---
info: "DecimalEscape :: DecimalIntegerLiteral [lookahead not in DecimalDigit]"
description: DecimalIntegerLiteral is not 0
  ---*/

  const arr = /((((((((((A))))))))))\1\2\3\4\5\6\7\8\9\10/.exec('AAAAAAAAAAA');

  if ((arr === null) || (arr[0] !== 'AAAAAAAAAAA')) {
    throw new Test262Error(
      '#1: const arr = /((((((((((A))))))))))\\1\\2\\3\\4\\5\\6\\7\\8\\9\\10/.exec("AAAAAAAAAAA"); arr[0] === "AAAAAAAAAAA". Actual. ' +
        (arr && arr[0]),
    );
  }

  for (const i = 1; i <= 10; i++) {
    if ((arr === null) || (arr[i] !== 'A')) {
      throw new Test262Error(
        '#2: const arr = /((((((((((A))))))))))\\1\\2\\3\\4\\5\\6\\7\\8\\9\\10/.exec("AAAAAAAAAAA"); arr[' + i +
          '] === "A". Actual. ' + (arr && arr[i]),
      );
    }
  }
});
// file S15.10.2.11_A1_T9.js
Deno.test('RegExp: S15.10.2.11_A1_T9.js', () => {
  /*---
info: "DecimalEscape :: DecimalIntegerLiteral [lookahead not in DecimalDigit]"
description: DecimalIntegerLiteral is not 0
  ---*/

  const arr = /((((((((((A))))))))))\10\9\8\7\6\5\4\3\2\1/.exec('AAAAAAAAAAA');

  if ((arr === null) || (arr[0] !== 'AAAAAAAAAAA')) {
    throw new Test262Error(
      '#1: const arr = /((((((((((A))))))))))\\10\\9\\8\\7\\6\\5\\4\\3\\2\\1/.exec("AAAAAAAAAAA"); arr[0] === "AAAAAAAAAAA". Actual. ' +
        (arr && arr[0]),
    );
  }

  for (const i = 1; i <= 10; i++) {
    if ((arr === null) || (arr[i] !== 'A')) {
      throw new Test262Error(
        '#2: const arr = /((((((((((A))))))))))\\10\\9\\8\\7\\6\\5\\4\\3\\2\\1/.exec("AAAAAAAAAAA"); arr[' + i +
          '] === "A". Actual. ' + (arr && arr[i]),
      );
    }
  }
});
// file S15.10.2.12_A3_T5.js
Deno.test('RegExp: S15.10.2.12_A3_T5.js', () => {
  /*---
info: |
    The production CharacterClassEscape :: w evaluates by returning the set of characters containing the sixty-three characters:
    a - z, A - Z, 0 - 9, _
description: non-w
  ---*/

  const non_w = "\f\n\r\t\v~`!@#$%^&*()-+={[}]|\\:;'<,>./? " + '"';

  assert.sameValue(
    /\w/.exec(non_w),
    null,
    '/w/.exec(""fnrtv~`!@#$%^&*()-+={[}]|:;\'<,>./? " + \'"\'") must return null',
  );

  const non_W = '_0123456789_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const regexp_w = /\w/g;
  const k = 0;
  while (regexp_w.exec(non_W) !== null) {
    k++;
  }

  assert.sameValue(non_W.length, k, 'The value of non_W.length is expected to equal the value of k');
});
// file S15.10.2.12_A4_T5.js
Deno.test('RegExp: S15.10.2.12_A4_T5.js', () => {
  /*---
info: |
    The production CharacterClassEscape :: W evaluates by returning the set of all characters not
    included in the set returned by CharacterClassEscape :: w
description: non-w
  ---*/

  const non_w = "\f\n\r\t\v~`!@#$%^&*()-+={[}]|\\:;'<,>./? " + '"';
  const regexp_W = /\W/g;
  const k = 0;
  while (regexp_W.exec(non_w) !== null) {
    k++;
  }

  assert.sameValue(non_w.length, k, 'The value of non_w.length is expected to equal the value of k');

  const non_W = '_0123456789_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  assert.sameValue(
    /\W/.exec(non_W),
    null,
    '/W/.exec(""_0123456789_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"") must return null',
  );
});
// file S15.10.2.13_A1_T10.js
Deno.test('RegExp: S15.10.2.13_A1_T10.js', () => {
  /*---
info: |
    The production CharacterClass :: [ [lookahead \notin {^}] ClassRanges ]
    evaluates by evaluating ClassRanges to obtain a CharSet and returning
    that CharSet and the boolean false
description: Execute /[a-c\d]+/.exec("\n\n\abc324234\n") and check results
  ---*/

  const __executed = /[a-c\d]+/.exec('\n\n\abc324234\n');

  const __expected = ['abc324234'];
  __expected.index = 2;
  __expected.input = '\n\n\abc324234\n';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.13_A1_T11.js
Deno.test('RegExp: S15.10.2.13_A1_T11.js', () => {
  /*---
info: |
    The production CharacterClass :: [ [lookahead \notin {^}] ClassRanges ]
    evaluates by evaluating ClassRanges to obtain a CharSet and returning
    that CharSet and the boolean false
description: Execute /ab[.]?c/.exec("abc") and check results
  ---*/

  const __executed = /ab[.]?c/.exec('abc');

  const __expected = ['abc'];
  __expected.index = 0;
  __expected.input = 'abc';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.13_A1_T12.js
Deno.test('RegExp: S15.10.2.13_A1_T12.js', () => {
  /*---
info: |
    The production CharacterClass :: [ [lookahead \notin {^}] ClassRanges ]
    evaluates by evaluating ClassRanges to obtain a CharSet and returning
    that CharSet and the boolean false
description: Execute /a[b]c/.exec("abc") and check results
  ---*/

  const __executed = /a[b]c/.exec('abc');

  const __expected = ['abc'];
  __expected.index = 0;
  __expected.input = 'abc';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.13_A1_T13.js
Deno.test('RegExp: S15.10.2.13_A1_T13.js', () => {
  /*---
info: |
    The production CharacterClass :: [ [lookahead \notin {^}] ClassRanges ]
    evaluates by evaluating ClassRanges to obtain a CharSet and returning
    that CharSet and the boolean false
    Execute /[a-z][^1-9][a-z]/.exec("a1b  b2c  c3d  def  f4g") and
    check results
  ---*/

  const __executed = /[a-z][^1-9][a-z]/.exec('a1b  b2c  c3d  def  f4g');

  const __expected = ['def'];
  __expected.index = 15;
  __expected.input = 'a1b  b2c  c3d  def  f4g';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.13_A1_T14.js
Deno.test('RegExp: S15.10.2.13_A1_T14.js', () => {
  /*---
info: |
    The production CharacterClass :: [ [lookahead \notin {^}] ClassRanges ]
    evaluates by evaluating ClassRanges to obtain a CharSet and returning
    that CharSet and the boolean false
description: Execute /[*&$]{3}/.exec("123*&$abc") and check results
  ---*/

  const __executed = /[*&$]{3}/.exec('123*&$abc');

  const __expected = ['*&$'];
  __expected.index = 3;
  __expected.input = '123*&$abc';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.13_A1_T15.js
Deno.test('RegExp: S15.10.2.13_A1_T15.js', () => {
  /*---
info: |
    The production CharacterClass :: [ [lookahead \notin {^}] ClassRanges ]
    evaluates by evaluating ClassRanges to obtain a CharSet and returning
    that CharSet and the boolean false
description: Execute /[\d][\n][^\d]/.exec("line1\nline2") and check results
  ---*/

  const __executed = /[\d][\n][^\d]/.exec('line1\nline2');

  const __expected = ['1\nl'];
  __expected.index = 4;
  __expected.input = 'line1\nline2';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.13_A1_T17.js
Deno.test('RegExp: S15.10.2.13_A1_T17.js', () => {
  /*---
info: |
    The production CharacterClass :: [ [lookahead \notin {^}] ClassRanges ]
    evaluates by evaluating ClassRanges to obtain a CharSet and returning
    that CharSet and the boolean false
description: Execute /[]/.exec("a[b\n[]\tc]d") and check results
  ---*/

  const __executed = /[]/.exec('a[b\n[]\tc]d');

  assert.sameValue(__executed, null, 'The value of __executed is expected to be null');
});
// file S15.10.2.13_A1_T1.js
Deno.test('RegExp: S15.10.2.13_A1_T1.js', () => {
  /*---
info: |
    The production CharacterClass :: [ [lookahead \notin {^}] ClassRanges ]
    evaluates by evaluating ClassRanges to obtain a CharSet and returning
    that CharSet and the boolean false
description: Execute /[]a/.test("\0a\0a") and check results
  ---*/

  const __executed = /[]a/.test('\0a\0a');
  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.13_A1_T2.js
Deno.test('RegExp: S15.10.2.13_A1_T2.js', () => {
  /*---
info: |
    The production CharacterClass :: [ [lookahead \notin {^}] ClassRanges ]
    evaluates by evaluating ClassRanges to obtain a CharSet and returning
    that CharSet and the boolean false
description: Execute /a[]/.test("\0a\0a") and check results
  ---*/

  const __executed = /a[]/.test('\0a\0a');
  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.13_A1_T3.js
Deno.test('RegExp: S15.10.2.13_A1_T3.js', () => {
  /*---
info: |
    The production CharacterClass :: [ [lookahead \notin {^}] ClassRanges ]
    evaluates by evaluating ClassRanges to obtain a CharSet and returning
    that CharSet and the boolean false
description: Execute /q[ax-zb](?=\s+)/.exec("qYqy ") and check results
  ---*/

  const __executed = /q[ax-zb](?=\s+)/.exec('qYqy ');

  const __expected = ['qy'];
  __expected.index = 2;
  __expected.input = 'qYqy ';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.13_A1_T4.js
Deno.test('RegExp: S15.10.2.13_A1_T4.js', () => {
  /*---
info: |
    The production CharacterClass :: [ [lookahead \notin {^}] ClassRanges ]
    evaluates by evaluating ClassRanges to obtain a CharSet and returning
    that CharSet and the boolean false
description: Execute /q[ax-zb](?=\s+)/.exec("tqaqy ") and check results
  ---*/

  const __executed = /q[ax-zb](?=\s+)/.exec('tqaqy ');

  const __expected = ['qy'];
  __expected.index = 3;
  __expected.input = 'tqaqy ';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.13_A1_T5.js
Deno.test('RegExp: S15.10.2.13_A1_T5.js', () => {
  /*---
info: |
    The production CharacterClass :: [ [lookahead \notin {^}] ClassRanges ]
    evaluates by evaluating ClassRanges to obtain a CharSet and returning
    that CharSet and the boolean false
description: Execute /q[ax-zb](?=\s+)/.exec("tqa\t  qy ") and check results
  ---*/

  const __executed = /q[ax-zb](?=\s+)/.exec('tqa\t  qy ');

  const __expected = ['qa'];
  __expected.index = 1;
  __expected.input = 'tqa\t  qy ';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.13_A1_T6.js
Deno.test('RegExp: S15.10.2.13_A1_T6.js', () => {
  /*---
info: |
    The production CharacterClass :: [ [lookahead \notin {^}] ClassRanges ]
    evaluates by evaluating ClassRanges to obtain a CharSet and returning
    that CharSet and the boolean false
description: Execute /ab[ercst]de/.exec("abcde") and check results
  ---*/

  const __executed = /ab[ercst]de/.exec('abcde');

  const __expected = ['abcde'];
  __expected.index = 0;
  __expected.input = 'abcde';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.13_A1_T7.js
Deno.test('RegExp: S15.10.2.13_A1_T7.js', () => {
  /*---
info: |
    The production CharacterClass :: [ [lookahead \notin {^}] ClassRanges ]
    evaluates by evaluating ClassRanges to obtain a CharSet and returning
    that CharSet and the boolean false
description: Execute /ab[erst]de/.test("abcde") and check results
  ---*/

  const __executed = /ab[erst]de/.test('abcde');

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.13_A1_T8.js
Deno.test('RegExp: S15.10.2.13_A1_T8.js', () => {
  /*---
info: |
    The production CharacterClass :: [ [lookahead \notin {^}] ClassRanges ]
    evaluates by evaluating ClassRanges to obtain a CharSet and returning
    that CharSet and the boolean false
description: Execute /[d-h]+/.exec("abcdefghijkl") and check results
  ---*/

  const __executed = /[d-h]+/.exec('abcdefghijkl');

  const __expected = ['defgh'];
  __expected.index = 3;
  __expected.input = 'abcdefghijkl';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.13_A1_T9.js
Deno.test('RegExp: S15.10.2.13_A1_T9.js', () => {
  /*---
info: |
    The production CharacterClass :: [ [lookahead \notin {^}] ClassRanges ]
    evaluates by evaluating ClassRanges to obtain a CharSet and returning
    that CharSet and the boolean false
description: Execute /[1234567].{2}/.exec("abc6defghijkl") and check results
  ---*/

  const __executed = /[1234567].{2}/.exec('abc6defghijkl');

  const __expected = ['6de'];
  __expected.index = 3;
  __expected.input = 'abc6defghijkl';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.13_A2_T1.js
Deno.test('RegExp: S15.10.2.13_A2_T1.js', () => {
  /*---
info: |
    The production CharacterClass :: [ ^ ClassRanges ] evaluates by
    evaluating ClassRanges to  obtain a CharSet and returning that CharSet
    and the boolean true
description: Execute /[^]a/m.exec("a\naba") and check results
  ---*/

  const __executed = /[^]a/m.exec('a\naba');

  const __expected = ['\na'];
  __expected.index = 1;
  __expected.input = 'a\naba';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.13_A2_T2.js
Deno.test('RegExp: S15.10.2.13_A2_T2.js', () => {
  /*---
info: |
    The production CharacterClass :: [ ^ ClassRanges ] evaluates by
    evaluating ClassRanges to  obtain a CharSet and returning that CharSet
    and the boolean true
description: Execute /a[^]/.exec("   a\t\n") and check results
  ---*/

  const __executed = /a[^]/.exec('   a\t\n');

  const __expected = ['a\t'];
  __expected.index = 3;
  __expected.input = '   a\t\n';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.13_A2_T3.js
Deno.test('RegExp: S15.10.2.13_A2_T3.js', () => {
  /*---
info: |
    The production CharacterClass :: [ ^ ClassRanges ] evaluates by
    evaluating ClassRanges to  obtain a CharSet and returning that CharSet
    and the boolean true
description: Execute /a[^b-z]\s+/.exec("ab an az aY n") and check results
  ---*/

  const __executed = /a[^b-z]\s+/.exec('ab an az aY n');

  const __expected = ['aY '];
  __expected.index = 9;
  __expected.input = 'ab an az aY n';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.13_A2_T4.js
Deno.test('RegExp: S15.10.2.13_A2_T4.js', () => {
  /*---
info: |
    The production CharacterClass :: [ ^ ClassRanges ] evaluates by
    evaluating ClassRanges to  obtain a CharSet and returning that CharSet
    and the boolean true
description: Execute /[^\b]+/g.exec("easy\bto\u0008ride") and check results
  ---*/

  const __executed = /[^\b]+/g.exec('easy\bto\u0008ride');

  const __expected = ['easy'];
  __expected.index = 0;
  __expected.input = 'easy\bto\u0008ride';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.13_A2_T5.js
Deno.test('RegExp: S15.10.2.13_A2_T5.js', () => {
  /*---
info: |
    The production CharacterClass :: [ ^ ClassRanges ] evaluates by
    evaluating ClassRanges to  obtain a CharSet and returning that CharSet
    and the boolean true
description: Execute /a[^1-9]c/.exec("abc") and check results
  ---*/

  const __executed = /a[^1-9]c/.exec('abc');

  const __expected = ['abc'];
  __expected.index = 0;
  __expected.input = 'abc';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.13_A2_T6.js
Deno.test('RegExp: S15.10.2.13_A2_T6.js', () => {
  /*---
info: |
    The production CharacterClass :: [ ^ ClassRanges ] evaluates by
    evaluating ClassRanges to  obtain a CharSet and returning that CharSet
    and the boolean true
description: Execute /a[^b]c/.test("abc") and check results
  ---*/

  const __executed = /a[^b]c/.test('abc');

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.13_A2_T7.js
Deno.test('RegExp: S15.10.2.13_A2_T7.js', () => {
  /*---
info: |
    The production CharacterClass :: [ ^ ClassRanges ] evaluates by
    evaluating ClassRanges to  obtain a CharSet and returning that CharSet
    and the boolean true
description: Execute /[^a-z]{4}/.exec("abc#$%def%&*@ghi") and check results
  ---*/

  const __executed = /[^a-z]{4}/.exec('abc#$%def%&*@ghi');

  const __expected = ['%&*@'];
  __expected.index = 9;
  __expected.input = 'abc#$%def%&*@ghi';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.13_A2_T8.js
Deno.test('RegExp: S15.10.2.13_A2_T8.js', () => {
  /*---
info: |
    The production CharacterClass :: [ ^ ClassRanges ] evaluates by
    evaluating ClassRanges to  obtain a CharSet and returning that CharSet
    and the boolean true
description: Execute /[^]/.exec("abc#$%def%&*@ghi") and check results
  ---*/

  const __executed = /[^]/.exec('abc#$%def%&*@ghi');

  const __expected = ['a'];
  __expected.index = 0;
  __expected.input = 'abc#$%def%&*@ghi';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.13_A3_T1.js
Deno.test('RegExp: S15.10.2.13_A3_T1.js', () => {
  /*---
info: Inside a CharacterClass, \b means the backspace character
description: Execute /.[\b]./.exec("abc\bdef") and check results
  ---*/

  const __executed = /.[\b]./.exec('abc\bdef');

  const __expected = ['c\bd'];
  __expected.index = 2;
  __expected.input = 'abc\bdef';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.13_A3_T2.js
Deno.test('RegExp: S15.10.2.13_A3_T2.js', () => {
  /*---
info: Inside a CharacterClass, \b means the backspace character
description: Execute /c[\b]{3}d/.exec("abc\b\b\bdef") and check results
  ---*/

  const __executed = /c[\b]{3}d/.exec('abc\b\b\bdef');

  const __expected = ['c\b\b\bd'];
  __expected.index = 2;
  __expected.input = 'abc\b\b\bdef';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.13_A3_T3.js
Deno.test('RegExp: S15.10.2.13_A3_T3.js', () => {
  /*---
info: Inside a CharacterClass, \b means the backspace character
description: Execute /[^\[\b\]]+/.exec("abc\bdef") and check results
  ---*/

  const __executed = /[^\[\b\]]+/.exec('abc\bdef');

  const __expected = ['abc'];
  __expected.index = 0;
  __expected.input = 'abc\bdef';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.13_A3_T4.js
Deno.test('RegExp: S15.10.2.13_A3_T4.js', () => {
  /*---
info: Inside a CharacterClass, \b means the backspace character
description: Execute /[^\[\b\]]+/.exec("abcdef") and check results
  ---*/

  const __executed = /[^\[\b\]]+/.exec('abcdef');

  const __expected = ['abcdef'];
  __expected.index = 0;
  __expected.input = 'abcdef';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.15_A1_T10.js
Deno.test('RegExp: S15.10.2.15_A1_T10.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[\10b-G]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[\\10b-G]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[\\10b-G]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T11.js
Deno.test('RegExp: S15.10.2.15_A1_T11.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[\bd-G]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[\\bd-G]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[\\bd-G]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T12.js
Deno.test('RegExp: S15.10.2.15_A1_T12.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[\Bd-G]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[\\Bd-G]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[\\Bd-G]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T13.js
Deno.test('RegExp: S15.10.2.15_A1_T13.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[\td-G]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[\\td-G]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[\\td-G]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T14.js
Deno.test('RegExp: S15.10.2.15_A1_T14.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[\nd-G]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[\\nd-G]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[\\nd-G]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T15.js
Deno.test('RegExp: S15.10.2.15_A1_T15.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[\vd-G]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[\\vd-G]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[\\vd-G]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T16.js
Deno.test('RegExp: S15.10.2.15_A1_T16.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[\fd-G]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[\\fd-G]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[\\fd-G]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T17.js
Deno.test('RegExp: S15.10.2.15_A1_T17.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[\rd-G]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[\\rd-G]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[\\rd-G]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T18.js
Deno.test('RegExp: S15.10.2.15_A1_T18.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[\c0001d-G]/.exec("1")" leads to
    throwing the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[\\c0001d-G]/.exec("1") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[\\c0001d-G]').exec('1')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T19.js
Deno.test('RegExp: S15.10.2.15_A1_T19.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[\x0061d-G]/.exec("1")" leads to
    throwing the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[\\x0061d-G]/.exec("1") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[\\x0061d-G]').exec('1')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T1.js
Deno.test('RegExp: S15.10.2.15_A1_T1.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[b-ac-e]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[b-ac-e]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[b-ac-e]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T20.js
Deno.test('RegExp: S15.10.2.15_A1_T20.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[\u0061d-G]/.exec("a")" leads to
    throwing the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[\\u0061d-G]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[\\u0061d-G]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T21.js
Deno.test('RegExp: S15.10.2.15_A1_T21.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[\ad-G]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[\\ad-G]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[\\ad-G]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T22.js
Deno.test('RegExp: S15.10.2.15_A1_T22.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[c-eb-a]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[c-eb-a]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[c-eb-a]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T23.js
Deno.test('RegExp: S15.10.2.15_A1_T23.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[b-G\d]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[b-G\\d]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[b-G\\d]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T24.js
Deno.test('RegExp: S15.10.2.15_A1_T24.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[b-G\D]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[b-G\\D]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[b-G\\D]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T25.js
Deno.test('RegExp: S15.10.2.15_A1_T25.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[b-G\s]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[b-G\\s]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[b-G\\s]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T26.js
Deno.test('RegExp: S15.10.2.15_A1_T26.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[b-G\S]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[b-G\\S]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[b-G\\S]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T27.js
Deno.test('RegExp: S15.10.2.15_A1_T27.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[b-G\w]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[b-G\\w]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[b-G\\w]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T28.js
Deno.test('RegExp: S15.10.2.15_A1_T28.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[b-G\W]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[b-G\\W]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[b-G\\W]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T29.js
Deno.test('RegExp: S15.10.2.15_A1_T29.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[b-G\0]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[b-G\\0]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[b-G\\0]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T2.js
Deno.test('RegExp: S15.10.2.15_A1_T2.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[a-dc-b]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[a-dc-b]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[a-dc-b]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T30.js
Deno.test('RegExp: S15.10.2.15_A1_T30.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[b-G\10]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[b-G\\10]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[b-G\\10]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T31.js
Deno.test('RegExp: S15.10.2.15_A1_T31.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[d-G\b]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[d-G\\b]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[d-G\\b]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T32.js
Deno.test('RegExp: S15.10.2.15_A1_T32.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[d-G\B]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[d-G\\B]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[d-G\\B]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T33.js
Deno.test('RegExp: S15.10.2.15_A1_T33.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[d-G\t]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[d-G\\t]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[d-G\\t]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T34.js
Deno.test('RegExp: S15.10.2.15_A1_T34.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[d-G\n]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[d-G\\n]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[d-G\\n]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T35.js
Deno.test('RegExp: S15.10.2.15_A1_T35.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[d-G\v]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[d-G\\v]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[d-G\\v]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T36.js
Deno.test('RegExp: S15.10.2.15_A1_T36.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[d-G\f]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[d-G\\f]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[d-G\\f]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T37.js
Deno.test('RegExp: S15.10.2.15_A1_T37.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[d-G\r]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[d-G\\r]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[d-G\\r]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T38.js
Deno.test('RegExp: S15.10.2.15_A1_T38.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[d-G\c0001]/.exec("1")" leads to
    throwing the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[d-G\\c0001]/.exec("1") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[d-G\\c0001]').exec('1')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T39.js
Deno.test('RegExp: S15.10.2.15_A1_T39.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[d-G\x0061]/.exec("1")" leads to
    throwing the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[d-G\\x0061]/.exec("1") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[d-G\\x0061]').exec('1')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T3.js
Deno.test('RegExp: S15.10.2.15_A1_T3.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[\db-G]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[\\db-G]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[\\db-G]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T40.js
Deno.test('RegExp: S15.10.2.15_A1_T40.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[d-G\u0061]/.exec("a")" leads to
    throwing the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[d-G\\u0061]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[d-G\\u0061]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T41.js
Deno.test('RegExp: S15.10.2.15_A1_T41.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[d-G\a]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[d-G\\a]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[d-G\\a]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T4.js
Deno.test('RegExp: S15.10.2.15_A1_T4.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[\Db-G]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[\\Db-G]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[\\Db-G]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T5.js
Deno.test('RegExp: S15.10.2.15_A1_T5.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[\sb-G]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[\\sb-G]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[\\sb-G]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T6.js
Deno.test('RegExp: S15.10.2.15_A1_T6.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[\Sb-G]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[\\Sb-G]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[\\Sb-G]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T7.js
Deno.test('RegExp: S15.10.2.15_A1_T7.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[\wb-G]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[\\wb-G]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[\\wb-G]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T8.js
Deno.test('RegExp: S15.10.2.15_A1_T8.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[\Wb-G]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[\\Wb-G]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[\\Wb-G]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.15_A1_T9.js
Deno.test('RegExp: S15.10.2.15_A1_T9.js', () => {
  /*---
info: |
    The internal helper function CharacterRange takes two CharSet parameters A and B and performs the
    following:
    2. Let a be the one character in CharSet A.
    3. Let b be the one character in CharSet B.
    4. Let i be the character value of character a.
    5. Let j be the character value of character b.
    6. If i > j, throw a SyntaxError exception.
    Checking if execution of "/[\0b-G]/.exec("a")" leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: /[\\0b-G]/.exec("a") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[\\0b-G]').exec('a')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.2.3_A1_T10.js
Deno.test('RegExp: S15.10.2.3_A1_T10.js', () => {
  /*---
info: |
    The | regular expression operator separates two alternatives.
    The pattern first tries to match the left Alternative (followed by the sequel of the regular expression).
    If it fails, it tries to match the right Disjunction (followed by the sequel of the regular expression)
description: "Execute /(?:ab|cd)+|ef/i.exec(\"AEKeFCDab\") and check results"
  ---*/

  const __executed = /(?:ab|cd)+|ef/i.exec('AEKeFCDab');

  const __expected = ['eF'];
  __expected.index = 3;
  __expected.input = 'AEKeFCDab';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.3_A1_T11.js
Deno.test('RegExp: S15.10.2.3_A1_T11.js', () => {
  /*---
info: |
    The | regular expression operator separates two alternatives.
    The pattern first tries to match the left Alternative (followed by the sequel of the regular expression).
    If it fails, it tries to match the right Disjunction (followed by the sequel of the regular expression)
description: Execute /11111|111/.exec("1111111111111111") and check results
  ---*/

  const __executed = /11111|111/.exec('1111111111111111');

  const __expected = ['11111'];
  __expected.index = 0;
  __expected.input = '1111111111111111';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.3_A1_T12.js
Deno.test('RegExp: S15.10.2.3_A1_T12.js', () => {
  /*---
info: |
    The | regular expression operator separates two alternatives.
    The pattern first tries to match the left Alternative (followed by the sequel of the regular expression).
    If it fails, it tries to match the right Disjunction (followed by the sequel of the regular expression)
description: Execute /xyz|.../.exec("abc") and check results
  ---*/

  const __executed = /xyz|.../.exec('abc');

  const __expected = ['abc'];
  __expected.index = 0;
  __expected.input = 'abc';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.3_A1_T13.js
Deno.test('RegExp: S15.10.2.3_A1_T13.js', () => {
  /*---
info: |
    The | regular expression operator separates two alternatives.
    The pattern first tries to match the left Alternative (followed by the sequel of the regular expression).
    If it fails, it tries to match the right Disjunction (followed by the sequel of the regular expression)
description: Execute /(.)..|abc/.exec("abc") and check results
  ---*/

  const __executed = /(.)..|abc/.exec('abc');

  const __expected = ['abc', 'a'];
  __expected.index = 0;
  __expected.input = 'abc';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.3_A1_T14.js
Deno.test('RegExp: S15.10.2.3_A1_T14.js', () => {
  /*---
info: |
    The | regular expression operator separates two alternatives.
    The pattern first tries to match the left Alternative (followed by the sequel of the regular expression).
    If it fails, it tries to match the right Disjunction (followed by the sequel of the regular expression)
description: "Execute /.+: gr(a|e)y/.exec(\"color: grey\") and check results"
  ---*/

  const __executed = /.+: gr(a|e)y/.exec('color: grey');

  const __expected = ['color: grey', 'e'];
  __expected.index = 0;
  __expected.input = 'color: grey';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.3_A1_T15.js
Deno.test('RegExp: S15.10.2.3_A1_T15.js', () => {
  /*---
info: |
    The | regular expression operator separates two alternatives.
    The pattern first tries to match the left Alternative (followed by the sequel of the regular expression).
    If it fails, it tries to match the right Disjunction (followed by the sequel of the regular expression)
    Execute /(Rob)|(Bob)|(Robert)|(Bobby)/.exec("Hi Bob") and check
    results
  ---*/

  const __executed = /(Rob)|(Bob)|(Robert)|(Bobby)/.exec('Hi Bob');

  const __expected = ['Bob', undefined, 'Bob', undefined, undefined];
  __expected.index = 3;
  __expected.input = 'Hi Bob';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.3_A1_T16.js
Deno.test('RegExp: S15.10.2.3_A1_T16.js', () => {
  /*---
info: |
    The | regular expression operator separates two alternatives.
    The pattern first tries to match the left Alternative (followed by the sequel of the regular expression).
    If it fails, it tries to match the right Disjunction (followed by the sequel of the regular expression)
description: Execute /()|/.exec("") and check results
  ---*/

  const __executed = /()|/.exec('');

  const __expected = ['', ''];
  __expected.index = 0;
  __expected.input = '';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.3_A1_T17.js
Deno.test('RegExp: S15.10.2.3_A1_T17.js', () => {
  /*---
info: |
    The | regular expression operator separates two alternatives.
    The pattern first tries to match the left Alternative (followed by the sequel of the regular expression).
    If it fails, it tries to match the right Disjunction (followed by the sequel of the regular expression)
description: Execute /|()/.exec("") and check results
  ---*/

  const __executed = /|()/.exec('');

  const __expected = ['', undefined];
  __expected.index = 0;
  __expected.input = '';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.3_A1_T1.js
Deno.test('RegExp: S15.10.2.3_A1_T1.js', () => {
  /*---
info: |
    The | regular expression operator separates two alternatives.
    The pattern first tries to match the left Alternative (followed by the sequel of the regular expression).
    If it fails, it tries to match the right Disjunction (followed by the sequel of the regular expression)
description: Execute /a|ab/.exec("abc") and check results
  ---*/

  const __executed = /a|ab/.exec('abc');

  const __expected = ['a'];
  __expected.index = 0;
  __expected.input = 'abc';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.3_A1_T2.js
Deno.test('RegExp: S15.10.2.3_A1_T2.js', () => {
  /*---
info: |
    The | regular expression operator separates two alternatives.
    The pattern first tries to match the left Alternative (followed by the sequel of the regular expression).
    If it fails, it tries to match the right Disjunction (followed by the sequel of the regular expression)
description: Execute /((a)|(ab))((c)|(bc))/.exec("abc") and check results
  ---*/

  const __executed = /((a)|(ab))((c)|(bc))/.exec('abc');

  const __expected = ['abc', 'a', 'a', undefined, 'bc', undefined, 'bc'];
  __expected.index = 0;
  __expected.input = 'abc';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.3_A1_T3.js
Deno.test('RegExp: S15.10.2.3_A1_T3.js', () => {
  /*---
info: |
    The | regular expression operator separates two alternatives.
    The pattern first tries to match the left Alternative (followed by the sequel of the regular expression).
    If it fails, it tries to match the right Disjunction (followed by the sequel of the regular expression)
    Execute /\d{3}|[a-z]{4}/.exec("2, 12 and of course repeat 12") and
    check results
  ---*/

  const __executed = /\d{3}|[a-z]{4}/.exec('2, 12 and of course repeat 12');

  const __expected = ['cour'];
  __expected.index = 13;
  __expected.input = '2, 12 and of course repeat 12';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.3_A1_T4.js
Deno.test('RegExp: S15.10.2.3_A1_T4.js', () => {
  /*---
info: |
    The | regular expression operator separates two alternatives.
    The pattern first tries to match the left Alternative (followed by the sequel of the regular expression).
    If it fails, it tries to match the right Disjunction (followed by the sequel of the regular expression)
    Execute /\d{3}|[a-z]{4}/.exec("2, 12 and 234 AND of course repeat
    12") and check results
  ---*/

  const __executed = /\d{3}|[a-z]{4}/.exec('2, 12 and 234 AND of course repeat 12');

  const __expected = ['234'];
  __expected.index = 10;
  __expected.input = '2, 12 and 234 AND of course repeat 12';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.3_A1_T5.js
Deno.test('RegExp: S15.10.2.3_A1_T5.js', () => {
  /*---
info: |
    The | regular expression operator separates two alternatives.
    The pattern first tries to match the left Alternative (followed by the sequel of the regular expression).
    If it fails, it tries to match the right Disjunction (followed by the sequel of the regular expression)
    Execute /\d{3}|[a-z]{4}/.test("2, 12 and 23 AND 0.00.1") and check
    results
  ---*/

  const __executed = /\d{3}|[a-z]{4}/.test('2, 12 and 23 AND 0.00.1');

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.3_A1_T6.js
Deno.test('RegExp: S15.10.2.3_A1_T6.js', () => {
  /*---
info: |
    The | regular expression operator separates two alternatives.
    The pattern first tries to match the left Alternative (followed by the sequel of the regular expression).
    If it fails, it tries to match the right Disjunction (followed by the sequel of the regular expression)
description: Execute /ab|cd|ef/i.exec("AEKFCD") and check results
  ---*/

  const __executed = /ab|cd|ef/i.exec('AEKFCD');

  const __expected = ['CD'];
  __expected.index = 4;
  __expected.input = 'AEKFCD';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.3_A1_T7.js
Deno.test('RegExp: S15.10.2.3_A1_T7.js', () => {
  /*---
info: |
    The | regular expression operator separates two alternatives.
    The pattern first tries to match the left Alternative (followed by the sequel of the regular expression).
    If it fails, it tries to match the right Disjunction (followed by the sequel of the regular expression)
description: Execute /ab|cd|ef/.test("AEKFCD") and check results
  ---*/

  const __executed = /ab|cd|ef/.test('AEKFCD');

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.3_A1_T8.js
Deno.test('RegExp: S15.10.2.3_A1_T8.js', () => {
  /*---
info: |
    The | regular expression operator separates two alternatives.
    The pattern first tries to match the left Alternative (followed by the sequel of the regular expression).
    If it fails, it tries to match the right Disjunction (followed by the sequel of the regular expression)
description: "Execute /(?:ab|cd)+|ef/i.exec(\"AEKFCD\") and check results"
  ---*/

  const __executed = /(?:ab|cd)+|ef/i.exec('AEKFCD');

  const __expected = ['CD'];
  __expected.index = 4;
  __expected.input = 'AEKFCD';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.3_A1_T9.js
Deno.test('RegExp: S15.10.2.3_A1_T9.js', () => {
  /*---
info: |
    The | regular expression operator separates two alternatives.
    The pattern first tries to match the left Alternative (followed by the sequel of the regular expression).
    If it fails, it tries to match the right Disjunction (followed by the sequel of the regular expression)
description: "Execute /(?:ab|cd)+|ef/i.exec(\"AEKFCDab\") and check results"
  ---*/

  const __executed = /(?:ab|cd)+|ef/i.exec('AEKFCDab');

  const __expected = ['CDab'];
  __expected.index = 4;
  __expected.input = 'AEKFCDab';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.5_A1_T1.js
Deno.test('RegExp: S15.10.2.5_A1_T1.js', () => {
  /*---
info: |
    An Atom followed by a Quantifier is repeated the number of times
    specified by the Quantifier
description: Execute /a[a-z]{2,4}/.exec("abcdefghi") and check results
  ---*/

  const __executed = /a[a-z]{2,4}/.exec('abcdefghi');

  const __expected = ['abcde'];
  __expected.index = 0;
  __expected.input = 'abcdefghi';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.5_A1_T2.js
Deno.test('RegExp: S15.10.2.5_A1_T2.js', () => {
  /*---
info: |
    An Atom followed by a Quantifier is repeated the number of times
    specified by the Quantifier
description: Execute /a[a-z]{2,4}?/.exec("abcdefghi") and check results
  ---*/

  const __executed = /a[a-z]{2,4}?/.exec('abcdefghi');

  const __expected = ['abc'];
  __expected.index = 0;
  __expected.input = 'abcdefghi';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.5_A1_T3.js
Deno.test('RegExp: S15.10.2.5_A1_T3.js', () => {
  /*---
info: |
    An Atom followed by a Quantifier is repeated the number of times
    specified by the Quantifier
description: Execute /(aa|aabaac|ba|b|c)* /.exec("aabaac") and check results
  ---*/

  const __executed = /(aa|aabaac|ba|b|c)*/.exec('aabaac');

  const __expected = ['aaba', 'ba'];
  __expected.index = 0;
  __expected.input = 'aabaac';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.5_A1_T4.js
Deno.test('RegExp: S15.10.2.5_A1_T4.js', () => {
  /*---
info: |
    An Atom followed by a Quantifier is repeated the number of times
    specified by the Quantifier
description: Execute /(z)((a+)?(b+)?(c))* /.exec("zaacbbbcac") and check results
  ---*/

  const __executed = /(z)((a+)?(b+)?(c))*/.exec('zaacbbbcac');

  const __expected = ['zaacbbbcac', 'z', 'ac', 'a', undefined, 'c'];
  __expected.index = 0;
  __expected.input = 'zaacbbbcac';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.5_A1_T5.js
Deno.test('RegExp: S15.10.2.5_A1_T5.js', () => {
  /*---
info: |
    An Atom followed by a Quantifier is repeated the number of times
    specified by the Quantifier
description: Execute /(a*)b\1+/.exec("baaaac") and check results
  ---*/

  const __executed = /(a*)b\1+/.exec('baaaac');

  const __expected = ['b', ''];
  __expected.index = 0;
  __expected.input = 'baaaac';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A1_T1.js
Deno.test('RegExp: S15.10.2.6_A1_T1.js', () => {
  /*---
info: |
    The production Assertion :: $ evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
description: Execute /s$/.test("pairs\nmakes\tdouble") and check results
  ---*/

  const __executed = /s$/.test('pairs\nmakes\tdouble');

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.6_A1_T2.js
Deno.test('RegExp: S15.10.2.6_A1_T2.js', () => {
  /*---
info: |
    The production Assertion :: $ evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
description: Execute /e$/.exec("pairs\nmakes\tdouble") and check results
  ---*/

  const __executed = /e$/.exec('pairs\nmakes\tdouble');

  const __expected = ['e'];
  __expected.index = 17;
  __expected.input = 'pairs\nmakes\tdouble';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A1_T3.js
Deno.test('RegExp: S15.10.2.6_A1_T3.js', () => {
  /*---
info: |
    The production Assertion :: $ evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
description: Execute /s$/m.exec("pairs\nmakes\tdouble") and check results
  ---*/

  const __executed = /s$/m.exec('pairs\nmakes\tdouble');

  const __expected = ['s'];
  __expected.index = 4;
  __expected.input = 'pairs\nmakes\tdouble';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A1_T4.js
Deno.test('RegExp: S15.10.2.6_A1_T4.js', () => {
  /*---
info: |
    The production Assertion :: $ evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
description: Execute /[^e]$/mg.exec("pairs\nmakes\tdouble") and check results
  ---*/

  const __executed = /[^e]$/mg.exec('pairs\nmakes\tdouble');

  const __expected = ['s'];
  __expected.index = 4;
  __expected.input = 'pairs\nmakes\tdouble';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A1_T5.js
Deno.test('RegExp: S15.10.2.6_A1_T5.js', () => {
  /*---
info: |
    The production Assertion :: $ evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
    Execute /es$/mg.exec("pairs\nmakes\tdoubl\u0065s") and check
    results
  ---*/

  const __executed = /es$/mg.exec('pairs\nmakes\tdoubl\u0065s');

  const __expected = ['es'];
  __expected.index = 17;
  __expected.input = 'pairs\nmakes\tdoubles';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A2_T10.js
Deno.test('RegExp: S15.10.2.6_A2_T10.js', () => {
  /*---
info: |
    The production Assertion :: ^ evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
description: Execute /^\d+/m.exec("abc\n123xyz") and check results
  ---*/

  const __executed = /^\d+/m.exec('abc\n123xyz');

  const __expected = ['123'];
  __expected.index = 4;
  __expected.input = 'abc\n123xyz';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A2_T1.js
Deno.test('RegExp: S15.10.2.6_A2_T1.js', () => {
  /*---
info: |
    The production Assertion :: ^ evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
description: Execute /^m/.test("pairs\nmakes\tdouble") and check results
  ---*/

  const __executed = /^m/.test('pairs\nmakes\tdouble');

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.6_A2_T2.js
Deno.test('RegExp: S15.10.2.6_A2_T2.js', () => {
  /*---
info: |
    The production Assertion :: ^ evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
description: Execute /^m/m.exec("pairs\nmakes\tdouble") and check results
  ---*/

  const __executed = /^m/m.exec('pairs\nmakes\tdouble');

  const __expected = ['m'];
  __expected.index = 6;
  __expected.input = 'pairs\nmakes\tdouble';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A2_T3.js
Deno.test('RegExp: S15.10.2.6_A2_T3.js', () => {
  /*---
info: |
    The production Assertion :: ^ evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
    Execute /^p[a-z]/.exec("pairs\nmakes\tdouble\npesos") and check
    results
  ---*/

  const __executed = /^p[a-z]/.exec('pairs\nmakes\tdouble\npesos');

  const __expected = ['pa'];
  __expected.index = 0;
  __expected.input = 'pairs\nmakes\tdouble\npesos';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A2_T4.js
Deno.test('RegExp: S15.10.2.6_A2_T4.js', () => {
  /*---
info: |
    The production Assertion :: ^ evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
    Execute /^p[a-z]/m.exec("pairs\nmakes\tdouble\npesos") and check
    results
  ---*/

  const __executed = /^p[b-z]/m.exec('pairs\nmakes\tdouble\npesos');

  const __expected = ['pe'];
  __expected.index = 19;
  __expected.input = 'pairs\nmakes\tdouble\npesos';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A2_T5.js
Deno.test('RegExp: S15.10.2.6_A2_T5.js', () => {
  /*---
info: |
    The production Assertion :: ^ evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
    Execute /^[^p]/m.exec("pairs\nmakes\tdouble\npesos") and check
    results
  ---*/

  const __executed = /^[^p]/m.exec('pairs\nmakes\tdouble\npesos');

  const __expected = ['m'];
  __expected.index = 6;
  __expected.input = 'pairs\nmakes\tdouble\npesos';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A2_T6.js
Deno.test('RegExp: S15.10.2.6_A2_T6.js', () => {
  /*---
info: |
    The production Assertion :: ^ evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
description: Execute /^ab/.exec("abcde") and check results
  ---*/

  const __executed = /^ab/.exec('abcde');

  const __expected = ['ab'];
  __expected.index = 0;
  __expected.input = 'abcde';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A2_T7.js
Deno.test('RegExp: S15.10.2.6_A2_T7.js', () => {
  /*---
info: |
    The production Assertion :: ^ evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
description: Execute /^..^e/.test("ab\ncde") and check results
  ---*/

  const __executed = /^..^e/.test('ab\ncde');

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.6_A2_T8.js
Deno.test('RegExp: S15.10.2.6_A2_T8.js', () => {
  /*---
info: |
    The production Assertion :: ^ evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
description: Execute /^xxx/.test("yyyyy") and check results
  ---*/

  const __executed = /^xxx/.test('yyyyy');

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.6_A2_T9.js
Deno.test('RegExp: S15.10.2.6_A2_T9.js', () => {
  /*---
info: |
    The production Assertion :: ^ evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
description: Execute /^\^+/.exec("^^^x") and check results
  ---*/

  const __executed = /^\^+/.exec('^^^x');

  const __expected = ['^^^'];
  __expected.index = 0;
  __expected.input = '^^^x';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A3_T10.js
Deno.test('RegExp: S15.10.2.6_A3_T10.js', () => {
  /*---
info: |
    The production Assertion :: \b evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
    Execute /\brobot\b/.exec("pilot\nsoviet robot\topenoffice") and
    check results
  ---*/

  const __executed = /\brobot\b/.exec('pilot\nsoviet robot\topenoffice');

  const __expected = ['robot'];
  __expected.index = 13;
  __expected.input = 'pilot\nsoviet robot\topenoffice';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A3_T11.js
Deno.test('RegExp: S15.10.2.6_A3_T11.js', () => {
  /*---
info: |
    The production Assertion :: \b evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
    Execute /\b\w{5}\b/.exec("pilot\nsoviet robot\topenoffice") and
    check results
  ---*/

  const __executed = /\b\w{5}\b/.exec('pilot\nsoviet robot\topenoffice');

  const __expected = ['pilot'];
  __expected.index = 0;
  __expected.input = 'pilot\nsoviet robot\topenoffice';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A3_T12.js
Deno.test('RegExp: S15.10.2.6_A3_T12.js', () => {
  /*---
info: |
    The production Assertion :: \b evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
    Execute /\bop/.exec("pilot\nsoviet robot\topenoffice") and check
    results
  ---*/

  const __executed = /\bop/.exec('pilot\nsoviet robot\topenoffice');

  const __expected = ['op'];
  __expected.index = 19;
  __expected.input = 'pilot\nsoviet robot\topenoffice';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A3_T13.js
Deno.test('RegExp: S15.10.2.6_A3_T13.js', () => {
  /*---
info: |
    The production Assertion :: \b evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
    Execute /op\b/.test("pilot\nsoviet robot\topenoffice") and check
    results
  ---*/

  const __executed = /op\b/.test('pilot\nsoviet robot\topenoffice');

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.6_A3_T14.js
Deno.test('RegExp: S15.10.2.6_A3_T14.js', () => {
  /*---
info: |
    The production Assertion :: \b evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
    Execute /e\b/.exec("pilot\nsoviet robot\topenoffic\u0065") and
    check results
  ---*/

  const __executed = /e\b/.exec('pilot\nsoviet robot\topenoffic\u0065');

  const __expected = ['e'];
  __expected.index = 28;
  __expected.input = 'pilot\nsoviet robot\topenoffice';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A3_T15.js
Deno.test('RegExp: S15.10.2.6_A3_T15.js', () => {
  /*---
info: |
    The production Assertion :: \b evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
    Execute /\be/.test("pilot\nsoviet robot\topenoffic\u0065") and
    check results
  ---*/

  const __executed = /\be/.test('pilot\nsoviet robot\topenoffic\u0065');

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.6_A3_T1.js
Deno.test('RegExp: S15.10.2.6_A3_T1.js', () => {
  /*---
info: |
    The production Assertion :: \b evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
    Execute /\bp/.exec("pilot\nsoviet robot\topenoffice") and check
    results
  ---*/

  const __executed = /\bp/.exec('pilot\nsoviet robot\topenoffice');

  const __expected = ['p'];
  __expected.index = 0;
  __expected.input = 'pilot\nsoviet robot\topenoffice';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A3_T2.js
Deno.test('RegExp: S15.10.2.6_A3_T2.js', () => {
  /*---
info: |
    The production Assertion :: \b evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
    Execute /ot\b/.exec("pilot\nsoviet robot\topenoffice") and check
    results
  ---*/

  const __executed = /ot\b/.exec('pilot\nsoviet robot\topenoffice');

  const __expected = ['ot'];
  __expected.index = 3;
  __expected.input = 'pilot\nsoviet robot\topenoffice';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A3_T3.js
Deno.test('RegExp: S15.10.2.6_A3_T3.js', () => {
  /*---
info: |
    The production Assertion :: \b evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
    Execute /\bot/.test("pilot\nsoviet robot\topenoffice") and check
    results
  ---*/

  const __executed = /\bot/.test('pilot\nsoviet robot\topenoffice');

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.6_A3_T4.js
Deno.test('RegExp: S15.10.2.6_A3_T4.js', () => {
  /*---
info: |
    The production Assertion :: \b evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
    Execute /\bso/.exec("pilot\nsoviet robot\topenoffice") and check
    results
  ---*/

  const __executed = /\bso/.exec('pilot\nsoviet robot\topenoffice');

  const __expected = ['so'];
  __expected.index = 6;
  __expected.input = 'pilot\nsoviet robot\topenoffice';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A3_T5.js
Deno.test('RegExp: S15.10.2.6_A3_T5.js', () => {
  /*---
info: |
    The production Assertion :: \b evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
    Execute /so\b/.test("pilot\nsoviet robot\topenoffice") and check
    results
  ---*/

  const __executed = /so\b/.test('pilot\nsoviet robot\topenoffice');

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.6_A3_T6.js
Deno.test('RegExp: S15.10.2.6_A3_T6.js', () => {
  /*---
info: |
    The production Assertion :: \b evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
    Execute /[^o]t\b/.exec("pilOt\nsoviet robot\topenoffice") and
    check results
  ---*/

  const __executed = /[^o]t\b/.exec('pilOt\nsoviet robot\topenoffice');

  const __expected = ['Ot'];
  __expected.index = 3;
  __expected.input = 'pilOt\nsoviet robot\topenoffice';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A3_T7.js
Deno.test('RegExp: S15.10.2.6_A3_T7.js', () => {
  /*---
info: |
    The production Assertion :: \b evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
    Execute /[^o]t\b/i.exec("pilOt\nsoviet robot\topenoffice") and
    check results
  ---*/

  const __executed = /[^o]t\b/i.exec('pilOt\nsoviet robot\topenoffice');

  const __expected = ['et'];
  __expected.index = 10;
  __expected.input = 'pilOt\nsoviet robot\topenoffice';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A3_T8.js
Deno.test('RegExp: S15.10.2.6_A3_T8.js', () => {
  /*---
info: |
    The production Assertion :: \b evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
    Execute /\bro/.exec("pilot\nsoviet robot\topenoffice") and check
    results
  ---*/

  const __executed = /\bro/.exec('pilot\nsoviet robot\topenoffice');

  const __expected = ['ro'];
  __expected.index = 13;
  __expected.input = 'pilot\nsoviet robot\topenoffice';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A3_T9.js
Deno.test('RegExp: S15.10.2.6_A3_T9.js', () => {
  /*---
info: |
    The production Assertion :: \b evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
    Execute /r\b/.exec("pilot\nsoviet robot\topenoffice") and check
    results
  ---*/

  const __executed = /r\b/.test('pilot\nsoviet robot\topenoffice');

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.6_A4_T1.js
Deno.test('RegExp: S15.10.2.6_A4_T1.js', () => {
  /*---
info: |
    The production Assertion :: \B evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
    Execute /\Bevil\B/.exec("devils arise\tfor\nevil") and check
    results
  ---*/

  const __executed = /\Bevil\B/.exec('devils arise\tfor\nevil');

  const __expected = ['evil'];
  __expected.index = 1;
  __expected.input = 'devils arise\tfor\nevil';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A4_T2.js
Deno.test('RegExp: S15.10.2.6_A4_T2.js', () => {
  /*---
info: |
    The production Assertion :: \B evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
    Execute /[f-z]e\B/.exec("devils arise\tfor\nevil") and check
    results
  ---*/

  const __executed = /[f-z]e\B/.exec('devils arise\tfor\nrevil');

  const __expected = ['re'];
  __expected.index = 17;
  __expected.input = 'devils arise\tfor\nrevil';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A4_T3.js
Deno.test('RegExp: S15.10.2.6_A4_T3.js', () => {
  /*---
info: |
    The production Assertion :: \B evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
description: Execute /\Bo\B/.exec("devils arise\tfor\nevil") and check results
  ---*/

  const __executed = /\Bo\B/i.exec('devils arise\tfOr\nrevil');

  const __expected = ['O'];
  __expected.index = 14;
  __expected.input = 'devils arise\tfOr\nrevil';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A4_T4.js
Deno.test('RegExp: S15.10.2.6_A4_T4.js', () => {
  /*---
info: |
    The production Assertion :: \B evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
description: Execute /\B\w\B/.exec("devils arise\tfor\nevil") and check results
  ---*/

  const __executed = /\B\w\B/.exec('devils arise\tfor\nrevil');

  const __expected = ['e'];
  __expected.index = 1;
  __expected.input = 'devils arise\tfor\nrevil';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A4_T5.js
Deno.test('RegExp: S15.10.2.6_A4_T5.js', () => {
  /*---
info: |
    The production Assertion :: \B evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
description: Execute /\w\B/.exec("devils arise\tfor\nevil") and check results
  ---*/

  const __executed = /\w\B/.exec('devils arise\tfor\nrevil');

  const __expected = ['d'];
  __expected.index = 0;
  __expected.input = 'devils arise\tfor\nrevil';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A4_T6.js
Deno.test('RegExp: S15.10.2.6_A4_T6.js', () => {
  /*---
info: |
    The production Assertion :: \B evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
description: Execute /\B\w/.exec("devils arise\tfor\nevil") and check results
  ---*/

  const __executed = /\B\w/.exec('devils arise\tfor\nrevil');

  const __expected = ['e'];
  __expected.index = 1;
  __expected.input = 'devils arise\tfor\nrevil';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A4_T7.js
Deno.test('RegExp: S15.10.2.6_A4_T7.js', () => {
  /*---
info: |
    The production Assertion :: \B evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
    Execute /\B[^z]{4}\B/.exec("devil arise\tforzzx\nevils") and
    check results
  ---*/

  const __executed = /\B[^z]{4}\B/.exec('devil arise\tforzzx\nevils');

  const __expected = ['il a'];
  __expected.index = 3;
  __expected.input = 'devil arise\tforzzx\nevils';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A4_T8.js
Deno.test('RegExp: S15.10.2.6_A4_T8.js', () => {
  /*---
info: |
    The production Assertion :: \B evaluates by returning an internal
    AssertionTester closure that takes a State argument x and performs the ...
    Execute /\B\w{4}\B/.exec("devil arise\tforzzx\nevils") and check
    results
  ---*/

  const __executed = /\B\w{4}\B/.exec('devil arise\tforzzx\nevils');

  const __expected = ['orzz'];
  __expected.index = 13;
  __expected.input = 'devil arise\tforzzx\nevils';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A5_T1.js
Deno.test('RegExp: S15.10.2.6_A5_T1.js', () => {
  /*---
info: |
    Since assertion evaluating do not change endIndex repetition of assertion
    does the same result
description: Execute /^^^^^^^robot$$$$/.exec("robot") and check results
  ---*/

  const __executed = /^^^^^^^robot$$$$/.exec('robot');

  const __expected = ['robot'];
  __expected.index = 0;
  __expected.input = 'robot';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A5_T2.js
Deno.test('RegExp: S15.10.2.6_A5_T2.js', () => {
  /*---
info: |
    Since assertion evaluating do not change endIndex repetition of assertion
    does the same result
    Execute /\B\B\B\B\B\Bbot\b\b\b\b\b\b\b/.exec("robot wall-e") and
    check results
  ---*/

  const __executed = /\B\B\B\B\B\Bbot\b\b\b\b\b\b\b/.exec('robot wall-e');

  const __expected = ['bot'];
  __expected.index = 2;
  __expected.input = 'robot wall-e';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A6_T1.js
Deno.test('RegExp: S15.10.2.6_A6_T1.js', () => {
  /*---
info: Assertions in combination
    while asterix is non greedy it is run till the end because of
    dollar assertion
  ---*/

  const __executed = /^.*?$/.exec('Hello World');

  const __expected = ['Hello World'];
  __expected.index = 0;
  __expected.input = 'Hello World';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A6_T2.js
Deno.test('RegExp: S15.10.2.6_A6_T2.js', () => {
  /*---
info: Assertions in combination
description: Execute /^.*?/.exec("Hello World") and check results
  ---*/

  const __executed = /^.*?/.exec('Hello World');

  const __expected = [''];
  __expected.index = 0;
  __expected.input = 'Hello World';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A6_T3.js
Deno.test('RegExp: S15.10.2.6_A6_T3.js', () => {
  /*---
info: Assertions in combination
description: while asterix is non greedy it is run till matches end or colon
  ---*/

  const __executed = /^.*?(:|$)/.exec('Hello: World');

  const __expected = ['Hello:', ':'];
  __expected.index = 0;
  __expected.input = 'Hello: World';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.6_A6_T4.js
Deno.test('RegExp: S15.10.2.6_A6_T4.js', () => {
  /*---
info: Assertions in combination
description: "Execute /^.*(:|$)/.exec(\"Hello: World\") and check results"
  ---*/

  const __executed = /^.*(:|$)/.exec('Hello: World');

  const __expected = ['Hello: World', ''];
  __expected.index = 0;
  __expected.input = 'Hello: World';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A1_T10.js
Deno.test('RegExp: S15.10.2.7_A1_T10.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: { DecimalDigits , DecimalDigits }
    evaluates as ...
description: Execute /b{0,93}c/.exec("aaabbbbcccddeeeefffff") and check results
  ---*/

  const __executed = /b{0,93}c/.exec('aaabbbbcccddeeeefffff');

  const __expected = ['bbbbc'];
  __expected.index = 3;
  __expected.input = 'aaabbbbcccddeeeefffff';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A1_T11.js
Deno.test('RegExp: S15.10.2.7_A1_T11.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: { DecimalDigits , DecimalDigits }
    evaluates as ...
description: Execute /bx{0,93}c/.exec("aaabbbbcccddeeeefffff") and check results
  ---*/

  const __executed = /bx{0,93}c/.exec('aaabbbbcccddeeeefffff');

  const __expected = ['bc'];
  __expected.index = 6;
  __expected.input = 'aaabbbbcccddeeeefffff';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A1_T12.js
Deno.test('RegExp: S15.10.2.7_A1_T12.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: { DecimalDigits , DecimalDigits }
    evaluates as ...
description: Execute /.{0,93}/.exec("weirwerdf") and check results
  ---*/

  const __executed = /.{0,93}/.exec('weirwerdf');

  const __expected = ['weirwerdf'];
  __expected.index = 0;
  __expected.input = 'weirwerdf';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A1_T1.js
Deno.test('RegExp: S15.10.2.7_A1_T1.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: { DecimalDigits , DecimalDigits }
    evaluates as ...
description: Execute /\d{2,4}/.exec("the answer is 42") and check results
  ---*/

  const __executed = /\d{2,4}/.exec('the answer is 42');

  const __expected = ['42'];
  __expected.index = 14;
  __expected.input = 'the answer is 42';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A1_T2.js
Deno.test('RegExp: S15.10.2.7_A1_T2.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: { DecimalDigits , DecimalDigits }
    evaluates as ...
description: Execute /\d{2,4}/.test("the 7 movie") and check results
  ---*/

  const __executed = /\d{2,4}/.test('the 7 movie');

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.7_A1_T3.js
Deno.test('RegExp: S15.10.2.7_A1_T3.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: { DecimalDigits , DecimalDigits }
    evaluates as ...
    Execute /\d{2,4}/.exec("the 20000 Leagues Under the Sea book") and
    check results
  ---*/

  const __executed = /\d{2,4}/.exec('the 20000 Leagues Under the Sea book');

  const __expected = ['2000'];
  __expected.index = 4;
  __expected.input = 'the 20000 Leagues Under the Sea book';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A1_T4.js
Deno.test('RegExp: S15.10.2.7_A1_T4.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: { DecimalDigits , DecimalDigits }
    evaluates as ...
description: Execute /\d{2,4}/.exec("the Fahrenheit 451 book") and check results
  ---*/

  const __executed = /\d{2,4}/.exec('the Fahrenheit 451 book');

  const __expected = ['451'];
  __expected.index = 15;
  __expected.input = 'the Fahrenheit 451 book';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A1_T5.js
Deno.test('RegExp: S15.10.2.7_A1_T5.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: { DecimalDigits , DecimalDigits }
    evaluates as ...
description: Execute /\d{2,4}/.exec("the 1984 novel") and check results
  ---*/

  const __executed = /\d{2,4}/.exec('the 1984 novel');

  const __expected = ['1984'];
  __expected.index = 4;
  __expected.input = 'the 1984 novel';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A1_T6.js
Deno.test('RegExp: S15.10.2.7_A1_T6.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: { DecimalDigits , DecimalDigits }
    evaluates as ...
description: Execute /\d{2,4}/.exec("0a0\u0031\u0031b") and check results
  ---*/

  const __executed = /\d{2,4}/.exec('0a0\u0031\u0031b');

  const __expected = ['011'];
  __expected.index = 2;
  __expected.input = '0a011b';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A1_T7.js
Deno.test('RegExp: S15.10.2.7_A1_T7.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: { DecimalDigits , DecimalDigits }
    evaluates as ...
description: Execute /\d{2,4}/.exec("0a0\u0031\u003122b") and check results
  ---*/

  const __executed = /\d{2,4}/.exec('0a0\u0031\u003122b');

  const __expected = ['0112'];
  __expected.index = 2;
  __expected.input = '0a01122b';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A1_T8.js
Deno.test('RegExp: S15.10.2.7_A1_T8.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: { DecimalDigits , DecimalDigits }
    evaluates as ...
description: Execute /b{2,3}c/.exec("aaabbbbcccddeeeefffff") and check results
  ---*/

  const __executed = /b{2,3}c/.exec('aaabbbbcccddeeeefffff');

  const __expected = ['bbbc'];
  __expected.index = 4;
  __expected.input = 'aaabbbbcccddeeeefffff';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A1_T9.js
Deno.test('RegExp: S15.10.2.7_A1_T9.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: { DecimalDigits , DecimalDigits }
    evaluates as ...
description: Execute /b{42,93}c/.exec("aaabbbbcccddeeeefffff") and check results
  ---*/

  const __executed = /b{42,93}c/.test('aaabbbbcccddeeeefffff');

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.7_A2_T1.js
Deno.test('RegExp: S15.10.2.7_A2_T1.js', () => {
  /*---
info: |
    i) The production QuantifierPrefix :: { DecimalDigits } evaluates...
    ii) The production QuantifierPrefix :: ? evaluates by returning the two results 0 and 1
description: Execute /\w{3}\d?/.exec("CE\uFFFFL\uFFDDbox127") and check results
  ---*/

  const __executed = /\w{3}\d?/.exec('CE\uFFFFL\uFFDDbox127');

  const __expected = ['box1'];
  __expected.index = 5;
  __expected.input = 'CE\uFFFFL\uFFDDbox127';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A2_T2.js
Deno.test('RegExp: S15.10.2.7_A2_T2.js', () => {
  /*---
info: |
    i) The production QuantifierPrefix :: { DecimalDigits } evaluates...
    ii) The production QuantifierPrefix :: ? evaluates by returning the two results 0 and 1
description: Execute /\w{3}\d?/.exec("CELL\uFFDDbox127") and check results
  ---*/

  const __executed = /\w{3}\d?/.exec('CELL\uFFDDbox127');

  const __expected = ['CEL'];
  __expected.index = 0;
  __expected.input = 'CELL\uFFDDbox127';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A2_T3.js
Deno.test('RegExp: S15.10.2.7_A2_T3.js', () => {
  /*---
info: |
    i) The production QuantifierPrefix :: { DecimalDigits } evaluates...
    ii) The production QuantifierPrefix :: ? evaluates by returning the two results 0 and 1
description: Execute /b{2}c/.exec("aaabbbbcccddeeeefffff") and check results
  ---*/

  const __executed = /b{2}c/.exec('aaabbbbcccddeeeefffff');

  const __expected = ['bbc'];
  __expected.index = 5;
  __expected.input = 'aaabbbbcccddeeeefffff';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A2_T4.js
Deno.test('RegExp: S15.10.2.7_A2_T4.js', () => {
  /*---
info: |
    i) The production QuantifierPrefix :: { DecimalDigits } evaluates...
    ii) The production QuantifierPrefix :: ? evaluates by returning the two results 0 and 1
description: Execute /b{8}c/.test("aaabbbbcccddeeeefffff") and check results
  ---*/

  const __executed = /b{8}/.test('aaabbbbcccddeeeefffff');

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.7_A3_T10.js
Deno.test('RegExp: S15.10.2.7_A3_T10.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: + evaluates by returning the two
    results 1 and \infty
description: Execute /o+/.test("abcdefg") and check results
  ---*/

  const __executed = /o+/.test('abcdefg');

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.7_A3_T11.js
Deno.test('RegExp: S15.10.2.7_A3_T11.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: + evaluates by returning the two
    results 1 and \infty
description: Execute /d+/.exec("abcdefg") and check results
  ---*/

  const __executed = /d+/.exec('abcdefg');

  const __expected = ['d'];
  __expected.index = 3;
  __expected.input = 'abcdefg';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A3_T12.js
Deno.test('RegExp: S15.10.2.7_A3_T12.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: + evaluates by returning the two
    results 1 and \infty
description: Execute /(b+)(b+)(b+)/.exec("abbbbbbbc") and check results
  ---*/

  const __executed = /(b+)(b+)(b+)/.exec('abbbbbbbc');

  const __expected = ['bbbbbbb', 'bbbbb', 'b', 'b'];
  __expected.index = 1;
  __expected.input = 'abbbbbbbc';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A3_T13.js
Deno.test('RegExp: S15.10.2.7_A3_T13.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: + evaluates by returning the two
    results 1 and \infty
description: Execute /(b+)(b*)/.exec("abbbbbbbc") and check results
  ---*/

  const __executed = /(b+)(b*)/.exec('abbbbbbbc');

  const __expected = ['bbbbbbb', 'bbbbbbb', ''];
  __expected.index = 1;
  __expected.input = 'abbbbbbbc';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A3_T14.js
Deno.test('RegExp: S15.10.2.7_A3_T14.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: + evaluates by returning the two
    results 1 and \infty
description: Execute /b*b+/.exec("abbbbbbbc") and check results
  ---*/

  const __executed = /b*b+/.exec('abbbbbbbc');

  const __expected = ['bbbbbbb'];
  __expected.index = 1;
  __expected.input = 'abbbbbbbc';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A3_T1.js
Deno.test('RegExp: S15.10.2.7_A3_T1.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: + evaluates by returning the two
    results 1 and \infty
description: Execute /\s+java\s+/.exec("language  java\n") and check results
  ---*/

  const __executed = /\s+java\s+/.exec('language  java\n');

  const __expected = ['  java\n'];
  __expected.index = 8;
  __expected.input = 'language  java\n';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A3_T2.js
Deno.test('RegExp: S15.10.2.7_A3_T2.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: + evaluates by returning the two
    results 1 and \infty
description: Execute /\s+java\s+/.exec("\t java object") and check results
  ---*/

  const __executed = /\s+java\s+/.exec('\t java object');

  const __expected = ['\t java '];
  __expected.index = 0;
  __expected.input = '\t java object';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A3_T3.js
Deno.test('RegExp: S15.10.2.7_A3_T3.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: + evaluates by returning the two
    results 1 and \infty
description: Execute /\s+java\s+/.test("\t javax package") and check results
  ---*/

  const __executed = /\s+java\s+/.test('\t javax package');

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.7_A3_T4.js
Deno.test('RegExp: S15.10.2.7_A3_T4.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: + evaluates by returning the two
    results 1 and \infty
description: Execute /\s+java\s+/.test("java\n\nobject") and check results
  ---*/

  const __executed = /\s+java\s+/.test('java\n\nobject');

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.7_A3_T5.js
Deno.test('RegExp: S15.10.2.7_A3_T5.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: + evaluates by returning the two
    results 1 and \infty
    Execute /[a-z]+\d+/.exec("x 2 ff 55 x2 as1 z12 abc12.0") and check
    results
  ---*/

  const __executed = /[a-z]+\d+/.exec('x 2 ff 55 x2 as1 z12 abc12.0');

  const __expected = ['x2'];
  __expected.index = 10;
  __expected.input = 'x 2 ff 55 x2 as1 z12 abc12.0';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A3_T6.js
Deno.test('RegExp: S15.10.2.7_A3_T6.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: + evaluates by returning the two
    results 1 and \infty
description: Execute /[a-z]+\d+/.exec("__abc123.0") and check results
  ---*/

  const __executed = /[a-z]+\d+/.exec('__abc123.0');

  const __expected = ['abc123'];
  __expected.index = 2;
  __expected.input = '__abc123.0';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A3_T7.js
Deno.test('RegExp: S15.10.2.7_A3_T7.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: + evaluates by returning the two
    results 1 and \infty
    Execute /[a-z]+(\d+)/.exec("x 2 ff 55 x2 as1 z12 abc12.0") and
    check results
  ---*/

  const __executed = /[a-z]+(\d+)/.exec('x 2 ff 55 x2 as1 z12 abc12.0');

  const __expected = ['x2', '2'];
  __expected.index = 10;
  __expected.input = 'x 2 ff 55 x2 as1 z12 abc12.0';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A3_T8.js
Deno.test('RegExp: S15.10.2.7_A3_T8.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: + evaluates by returning the two
    results 1 and \infty
description: Execute /[a-z]+(\d+)/.exec("__abc123.0") and check results
  ---*/

  const __executed = /[a-z]+(\d+)/.exec('__abc123.0');

  const __expected = ['abc123', '123'];
  __expected.index = 2;
  __expected.input = '__abc123.0';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A3_T9.js
Deno.test('RegExp: S15.10.2.7_A3_T9.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: + evaluates by returning the two
    results 1 and \infty
description: Execute /d+/.exec("abcdddddefg") and check results
  ---*/

  const __executed = /d+/.exec('abcdddddefg');

  const __expected = ['ddddd'];
  __expected.index = 3;
  __expected.input = 'abcdddddefg';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A4_T10.js
Deno.test('RegExp: S15.10.2.7_A4_T10.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: * evaluates by returning the two
    results 0 and \infty
description: Execute /d* /.exec('abcddddefg') and check results
  ---*/

  const __executed = /d*/.exec('abcddddefg');

  const __expected = [''];
  __expected.index = 0;
  __expected.input = 'abcddddefg';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A4_T11.js
Deno.test('RegExp: S15.10.2.7_A4_T11.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: * evaluates by returning the two
    results 0 and \infty
description: Execute /cd* /.exec('abcddddefg') and check results
  ---*/

  const __executed = /cd*/.exec('abcddddefg');

  const __expected = ['cdddd'];
  __expected.index = 2;
  __expected.input = 'abcddddefg';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A4_T12.js
Deno.test('RegExp: S15.10.2.7_A4_T12.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: * evaluates by returning the two
    results 0 and \infty
description: Execute /cx*d/.exec('abcdefg') and check results
  ---*/

  const __executed = /cx*d/.exec('abcdefg');

  const __expected = ['cd'];
  __expected.index = 2;
  __expected.input = 'abcdefg';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A4_T13.js
Deno.test('RegExp: S15.10.2.7_A4_T13.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: * evaluates by returning the two
    results 0 and \infty
description: Execute /(x*)(x+)/.exec('xxxxxxx') and check results
  ---*/

  const __executed = /(x*)(x+)/.exec('xxxxxxx');

  const __expected = ['xxxxxxx', 'xxxxxx', 'x'];
  __expected.index = 0;
  __expected.input = 'xxxxxxx';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A4_T14.js
Deno.test('RegExp: S15.10.2.7_A4_T14.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: * evaluates by returning the two
    results 0 and \infty
description: Execute /(\d*)(\d+)/.exec('1234567890') and check results
  ---*/

  const __executed = /(\d*)(\d+)/.exec('1234567890');

  const __expected = ['1234567890', '123456789', '0'];
  __expected.index = 0;
  __expected.input = '1234567890';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A4_T15.js
Deno.test('RegExp: S15.10.2.7_A4_T15.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: * evaluates by returning the two
    results 0 and \infty
description: Execute /(\d*)\d(\d+)/.exec('1234567890') and check results
  ---*/

  const __executed = /(\d*)\d(\d+)/.exec('1234567890');

  const __expected = ['1234567890', '12345678', '0'];
  __expected.index = 0;
  __expected.input = '1234567890';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A4_T16.js
Deno.test('RegExp: S15.10.2.7_A4_T16.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: * evaluates by returning the two
    results 0 and \infty
description: Execute /(x+)(x*)/.exec('xxxxxxx') and check results
  ---*/

  const __executed = /(x+)(x*)/.exec('xxxxxxx');

  const __expected = ['xxxxxxx', 'xxxxxxx', ''];
  __expected.index = 0;
  __expected.input = 'xxxxxxx';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A4_T17.js
Deno.test('RegExp: S15.10.2.7_A4_T17.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: * evaluates by returning the two
    results 0 and \infty
description: Execute /x*y+$/.exec('xxxxxxyyyyyy') and check results
  ---*/

  const __executed = /x*y+$/.exec('xxxxxxyyyyyy');

  const __expected = ['xxxxxxyyyyyy'];
  __expected.index = 0;
  __expected.input = 'xxxxxxyyyyyy';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A4_T18.js
Deno.test('RegExp: S15.10.2.7_A4_T18.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: * evaluates by returning the two
    results 0 and \infty
description: Execute /[\d]*[\s]*bc./.exec('abcdef') and check results
  ---*/

  const __executed = /[\d]*[\s]*bc./.exec('abcdef');

  const __expected = ['bcd'];
  __expected.index = 1;
  __expected.input = 'abcdef';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A4_T19.js
Deno.test('RegExp: S15.10.2.7_A4_T19.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: * evaluates by returning the two
    results 0 and \infty
description: Execute /bc..[\d]*[\s]* /.exec('abcdef') and check results
  ---*/

  const __executed = /bc..[\d]*[\s]*/.exec('abcdef');

  const __expected = ['bcde'];
  __expected.index = 1;
  __expected.input = 'abcdef';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A4_T1.js
Deno.test('RegExp: S15.10.2.7_A4_T1.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: * evaluates by returning the two
    results 0 and \infty
description: Execute /[^"]* /.exec('"beast"-nickname') and check results
  ---*/

  const __executed = /[^"]*/.exec('"beast"-nickname');

  const __expected = [''];
  __expected.index = 0;
  __expected.input = '"beast"-nickname';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A4_T20.js
Deno.test('RegExp: S15.10.2.7_A4_T20.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: * evaluates by returning the two
    results 0 and \infty
description: Execute /.* /.exec('a1b2c3') and check results
  ---*/

  const __executed = /.*/.exec('a1b2c3');

  const __expected = ['a1b2c3'];
  __expected.index = 0;
  __expected.input = 'a1b2c3';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A4_T21.js
Deno.test('RegExp: S15.10.2.7_A4_T21.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: * evaluates by returning the two
    results 0 and \infty
description: Execute /[xyz]*1/.test('a0.b2.c3') and check results
  ---*/

  const __executed = /[xyz]*1/.test('a0.b2.c3');

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.7_A4_T2.js
Deno.test('RegExp: S15.10.2.7_A4_T2.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: * evaluates by returning the two
    results 0 and \infty
description: "Execute /[^\"]* /.exec('alice said: \"don\\'t\"') and check results"
  ---*/

  const __executed = /[^"]*/.exec('alice said: "don\'t"');

  const __expected = ['alice said: '];
  __expected.index = 0;
  __expected.input = 'alice said: "don\'t"';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A4_T3.js
Deno.test('RegExp: S15.10.2.7_A4_T3.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: * evaluates by returning the two
    results 0 and \infty
description: Execute /[^"]* /.exec("before\'i\'start") and check results
  ---*/

  const __executed = /[^"]*/.exec("before'i'start");

  const __expected = ["before'i'start"];
  __expected.index = 0;
  __expected.input = "before'i'start";

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A4_T4.js
Deno.test('RegExp: S15.10.2.7_A4_T4.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: * evaluates by returning the two
    results 0 and \infty
    Execute /[^"]* /.exec('alice \"sweep\": "don\'t"') and check
    results
  ---*/

  const __executed = /[^"]*/.exec('alice "sweep": "don\'t"');

  const __expected = ['alice '];
  __expected.index = 0;
  __expected.input = 'alice "sweep": "don\'t"';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A4_T5.js
Deno.test('RegExp: S15.10.2.7_A4_T5.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: * evaluates by returning the two
    results 0 and \infty
    Execute /[^"]* /.exec('alice \u0022sweep\u0022: "don\'t"') and
    check results
  ---*/

  const __executed = /[^"]*/.exec('alice \u0022sweep\u0022: "don\'t"');

  const __expected = ['alice '];
  __expected.index = 0;
  __expected.input = 'alice "sweep": "don\'t"';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A4_T6.js
Deno.test('RegExp: S15.10.2.7_A4_T6.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: * evaluates by returning the two
    results 0 and \infty
    Execute /["'][^"']*["']/.exec('alice \u0022sweep\u0022: "don\'t"')
    and check results
  ---*/

  const __executed = /["'][^"']*["']/.exec('alice \u0022sweep\u0022: "don\'t"');

  const __expected = ['"sweep"'];
  __expected.index = 6;
  __expected.input = 'alice "sweep": "don\'t"';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A4_T7.js
Deno.test('RegExp: S15.10.2.7_A4_T7.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: * evaluates by returning the two
    results 0 and \infty
    Execute /["'][^"']*["']/.exec('alice cries out: \'don\'t\'') and
    check results
  ---*/

  const __executed = /["'][^"']*["']/.exec("alice cries out: 'don't'");

  const __expected = ["'don'"];
  __expected.index = 17;
  __expected.input = "alice cries out: 'don't'";

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A4_T8.js
Deno.test('RegExp: S15.10.2.7_A4_T8.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: * evaluates by returning the two
    results 0 and \infty
    Execute /["'][^"']*["']/.test('alice cries out: don\'t') and check
    results
  ---*/

  const __executed = /["'][^"']*["']/.test("alice cries out: don't");

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.7_A4_T9.js
Deno.test('RegExp: S15.10.2.7_A4_T9.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: * evaluates by returning the two
    results 0 and \infty
    Execute /["'][^"']*["']/.exec('alice cries out:\"\"') and check
    results
  ---*/

  const __executed = /["'][^"']*["']/.exec('alice cries out:""');

  const __expected = ['""'];
  __expected.index = 16;
  __expected.input = 'alice cries out:""';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A5_T10.js
Deno.test('RegExp: S15.10.2.7_A5_T10.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: ? evaluates by returning the two
    results 0 and 1
description: Execute /ab?c?d?x?y?z/.exec("123az789") and check results
  ---*/

  const __executed = /ab?c?d?x?y?z/.exec('123az789');

  const __expected = ['az'];
  __expected.index = 3;
  __expected.input = '123az789';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A5_T11.js
Deno.test('RegExp: S15.10.2.7_A5_T11.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: ? evaluates by returning the two
    results 0 and 1
description: Execute /\??\??\??\??\??/.exec("?????") and check results
  ---*/

  const __executed = /\??\??\??\??\??/.exec('?????');

  const __expected = ['?????'];
  __expected.index = 0;
  __expected.input = '?????';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A5_T12.js
Deno.test('RegExp: S15.10.2.7_A5_T12.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: ? evaluates by returning the two
    results 0 and 1
description: Execute /.?.?.?.?.?.?.?/.exec("test") and check results
  ---*/

  const __executed = /.?.?.?.?.?.?.?/.exec('test');

  const __expected = ['test'];
  __expected.index = 0;
  __expected.input = 'test';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A5_T1.js
Deno.test('RegExp: S15.10.2.7_A5_T1.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: ? evaluates by returning the two
    results 0 and 1
    Execute /java(script)?/.exec("state: javascript is extension of
    ecma script") and check results
  ---*/

  const __executed = /java(script)?/.exec('state: javascript is extension of ecma script');

  const __expected = ['javascript', 'script'];
  __expected.index = 7;
  __expected.input = 'state: javascript is extension of ecma script';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A5_T2.js
Deno.test('RegExp: S15.10.2.7_A5_T2.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: ? evaluates by returning the two
    results 0 and 1
    Execute /java(script)?/.exec("state: java and javascript are
    vastly different") and check results
  ---*/

  const __executed = /java(script)?/.exec('state: java and javascript are vastly different');

  const __expected = ['java', undefined];
  __expected.index = 7;
  __expected.input = 'state: java and javascript are vastly different';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A5_T3.js
Deno.test('RegExp: S15.10.2.7_A5_T3.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: ? evaluates by returning the two
    results 0 and 1
    Execute /java(script)?/.test("state: both Java and JavaScript used
    in web development") and check results
  ---*/

  const __executed = /java(script)?/.test('state: both Java and JavaScript used in web development');

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.7_A5_T4.js
Deno.test('RegExp: S15.10.2.7_A5_T4.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: ? evaluates by returning the two
    results 0 and 1
description: Execute /cd?e/.exec("abcdef") and check results
  ---*/

  const __executed = /cd?e/.exec('abcdef');

  const __expected = ['cde'];
  __expected.index = 2;
  __expected.input = 'abcdef';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A5_T5.js
Deno.test('RegExp: S15.10.2.7_A5_T5.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: ? evaluates by returning the two
    results 0 and 1
description: Execute /cdx?e/.exec("abcdef") and check results
  ---*/

  const __executed = /cdx?e/.exec('abcdef');

  const __expected = ['cde'];
  __expected.index = 2;
  __expected.input = 'abcdef';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A5_T6.js
Deno.test('RegExp: S15.10.2.7_A5_T6.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: ? evaluates by returning the two
    results 0 and 1
description: Execute /o?pqrst/.exec("pqrstuvw") and check results
  ---*/

  const __executed = /o?pqrst/.exec('pqrstuvw');

  const __expected = ['pqrst'];
  __expected.index = 0;
  __expected.input = 'pqrstuvw';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A5_T7.js
Deno.test('RegExp: S15.10.2.7_A5_T7.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: ? evaluates by returning the two
    results 0 and 1
description: Execute /x?y?z?/.exec("abcd") and check results
  ---*/

  const __executed = /x?y?z?/.exec('abcd');

  const __expected = [''];
  __expected.index = 0;
  __expected.input = 'abcd';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A5_T8.js
Deno.test('RegExp: S15.10.2.7_A5_T8.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: ? evaluates by returning the two
    results 0 and 1
description: Execute /x?ay?bz?c/.exec("abcd") and check results
  ---*/

  const __executed = /x?ay?bz?c/.exec('abcd');

  const __expected = ['abc'];
  __expected.index = 0;
  __expected.input = 'abcd';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A5_T9.js
Deno.test('RegExp: S15.10.2.7_A5_T9.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: ? evaluates by returning the two
    results 0 and 1
description: Execute /b?b?b?b/.exec("abbbbc") and check results
  ---*/

  const __executed = /b?b?b?b/.exec('abbbbc');

  const __expected = ['bbbb'];
  __expected.index = 1;
  __expected.input = 'abbbbc';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A6_T1.js
Deno.test('RegExp: S15.10.2.7_A6_T1.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: { DecimalDigits , }evaluates as follows:
    i) Let i be the MV of DecimalDigits
    ii) Return the two results i and \infty
description: Execute /b{2,}c/.exec("aaabbbbcccddeeeefffff") and check results
  ---*/

  const __executed = /b{2,}c/.exec('aaabbbbcccddeeeefffff');

  const __expected = ['bbbbc'];
  __expected.index = 3;
  __expected.input = 'aaabbbbcccddeeeefffff';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A6_T2.js
Deno.test('RegExp: S15.10.2.7_A6_T2.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: { DecimalDigits , }evaluates as follows:
    i) Let i be the MV of DecimalDigits
    ii) Return the two results i and \infty
description: Execute /b{8,}c/.test("aaabbbbcccddeeeefffff") and check results
  ---*/

  const __executed = /b{8,}c/.test('aaabbbbcccddeeeefffff');

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.7_A6_T3.js
Deno.test('RegExp: S15.10.2.7_A6_T3.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: { DecimalDigits , }evaluates as follows:
    i) Let i be the MV of DecimalDigits
    ii) Return the two results i and \infty
description: Execute /\d{1,}/.exec("wqe456646dsff") and check results
  ---*/

  const __executed = /\d{1,}/.exec('wqe456646dsff');

  const __expected = ['456646'];
  __expected.index = 3;
  __expected.input = 'wqe456646dsff';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A6_T4.js
Deno.test('RegExp: S15.10.2.7_A6_T4.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: { DecimalDigits , }evaluates as follows:
    i) Let i be the MV of DecimalDigits
    ii) Return the two results i and \infty
description: Execute /(123){1,}/.exec("123123") and check results
  ---*/

  const __executed = /(123){1,}/.exec('123123');

  const __expected = ['123123', '123'];
  __expected.index = 0;
  __expected.input = '123123';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A6_T5.js
Deno.test('RegExp: S15.10.2.7_A6_T5.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: { DecimalDigits , }evaluates as follows:
    i) Let i be the MV of DecimalDigits
    ii) Return the two results i and \infty
description: Execute /(123){1,}x\1/.exec("123123x123") and check results
  ---*/

  const __executed = /(123){1,}x\1/.exec('123123x123');

  const __expected = ['123123x123', '123'];
  __expected.index = 0;
  __expected.input = '123123x123';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.7_A6_T6.js
Deno.test('RegExp: S15.10.2.7_A6_T6.js', () => {
  /*---
info: |
    The production QuantifierPrefix :: { DecimalDigits , }evaluates as follows:
    i) Let i be the MV of DecimalDigits
    ii) Return the two results i and \infty
description: Execute /x{1,2}x{1,}/.exec("xxxxxxx") and check results
  ---*/

  const __executed = /x{1,2}x{1,}/.exec('xxxxxxx');

  const __expected = ['xxxxxxx'];
  __expected.index = 0;
  __expected.input = 'xxxxxxx';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A1_T1.js
Deno.test('RegExp: S15.10.2.8_A1_T1.js', () => {
  /*---
info: |
    The form (?= Disjunction ) specifies a zero-width positive lookahead.
    In order for it to succeed, the pattern inside Disjunction must match at the current position, but the current position is not advanced before matching the sequel.
    If Disjunction can match at the current position in several ways, only the first one is tried
description: Execute /(?=(a+))/.exec("baaabac") and check results
  ---*/

  const __executed = /(?=(a+))/.exec('baaabac');

  const __expected = ['', 'aaa'];
  __expected.index = 1;
  __expected.input = 'baaabac';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A1_T2.js
Deno.test('RegExp: S15.10.2.8_A1_T2.js', () => {
  /*---
info: |
    The form (?= Disjunction ) specifies a zero-width positive lookahead.
    In order for it to succeed, the pattern inside Disjunction must match at the current position, but the current position is not advanced before matching the sequel.
    If Disjunction can match at the current position in several ways, only the first one is tried
description: Execute /(?=(a+))a*b\1/.exec("baaabac") and check results
  ---*/

  const __executed = /(?=(a+))a*b\1/.exec('baaabac');

  const __expected = ['aba', 'a'];
  __expected.index = 3;
  __expected.input = 'baaabac';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A1_T3.js
Deno.test('RegExp: S15.10.2.8_A1_T3.js', () => {
  /*---
info: |
    The form (?= Disjunction ) specifies a zero-width positive lookahead.
    In order for it to succeed, the pattern inside Disjunction must match at the current position, but the current position is not advanced before matching the sequel.
    If Disjunction can match at the current position in several ways, only the first one is tried
    Execute /[Jj]ava([Ss]cript)?(?=\:)/.exec("just Javascript: the way
    af jedi") and check results
  ---*/

  const __executed = /[Jj]ava([Ss]cript)?(?=\:)/.exec('just Javascript: the way af jedi');

  const __expected = ['Javascript', 'script'];
  __expected.index = 5;
  __expected.input = 'just Javascript: the way af jedi';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A1_T4.js
Deno.test('RegExp: S15.10.2.8_A1_T4.js', () => {
  /*---
info: |
    The form (?= Disjunction ) specifies a zero-width positive lookahead.
    In order for it to succeed, the pattern inside Disjunction must match at the current position, but the current position is not advanced before matching the sequel.
    If Disjunction can match at the current position in several ways, only the first one is tried
    Execute /[Jj]ava([Ss]cript)?(?=\:)/.exec("taste of java: the
    cookbook ") and check results
  ---*/

  const __executed = /[Jj]ava([Ss]cript)?(?=\:)/.exec('taste of java: the cookbook ');

  const __expected = ['java', undefined];
  __expected.index = 9;
  __expected.input = 'taste of java: the cookbook ';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A1_T5.js
Deno.test('RegExp: S15.10.2.8_A1_T5.js', () => {
  /*---
info: |
    The form (?= Disjunction ) specifies a zero-width positive lookahead.
    In order for it to succeed, the pattern inside Disjunction must match at the current position, but the current position is not advanced before matching the sequel.
    If Disjunction can match at the current position in several ways, only the first one is tried
    Execute /[Jj]ava([Ss]cript)?(?=\:)/.test("rhino is JavaScript
    engine") and check results
  ---*/

  const __executed = /[Jj]ava([Ss]cript)?(?=\:)/.test('rhino is JavaScript engine');

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.8_A2_T10.js
Deno.test('RegExp: S15.10.2.8_A2_T10.js', () => {
  /*---
info: |
    The form (?! Disjunction ) specifies a zero-width negative lookahead.
    In order for it to succeed, the pattern inside Disjunction must fail to match at the current position.
    The current position is not advanced before matching the sequel
description: Execute /(?!a|b)|c/.exec("bc") and check results
  ---*/

  const __executed = /(?!a|b)|c/.exec('bc');

  const __expected = [''];
  __expected.index = 1;
  __expected.input = 'bc';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A2_T11.js
Deno.test('RegExp: S15.10.2.8_A2_T11.js', () => {
  /*---
info: |
    The form (?! Disjunction ) specifies a zero-width negative lookahead.
    In order for it to succeed, the pattern inside Disjunction must fail to match at the current position.
    The current position is not advanced before matching the sequel
description: Execute /(?!a|b)|c/.exec("d") and check results
  ---*/

  const __executed = /(?!a|b)|c/.exec('d');

  const __expected = [''];
  __expected.index = 0;
  __expected.input = 'd';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A2_T1.js
Deno.test('RegExp: S15.10.2.8_A2_T1.js', () => {
  /*---
info: |
    The form (?! Disjunction ) specifies a zero-width negative lookahead.
    In order for it to succeed, the pattern inside Disjunction must fail to match at the current position.
    The current position is not advanced before matching the sequel
    Execute /(.*?)a(?!(a+)b\2c)\2(.*)/.exec("baaabaac") and check
    results
  ---*/

  const __executed = /(.*?)a(?!(a+)b\2c)\2(.*)/.exec('baaabaac');

  const __expected = ['baaabaac', 'ba', undefined, 'abaac'];
  __expected.index = 0;
  __expected.input = 'baaabaac';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A2_T2.js
Deno.test('RegExp: S15.10.2.8_A2_T2.js', () => {
  /*---
info: |
    The form (?! Disjunction ) specifies a zero-width negative lookahead.
    In order for it to succeed, the pattern inside Disjunction must fail to match at the current position.
    The current position is not advanced before matching the sequel
    Execute /Java(?!Script)([A-Z]\w*)/.exec("using of JavaBeans
    technology") and check results
  ---*/

  const __executed = /Java(?!Script)([A-Z]\w*)/.exec('using of JavaBeans technology');

  const __expected = ['JavaBeans', 'Beans'];
  __expected.index = 9;
  __expected.input = 'using of JavaBeans technology';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A2_T3.js
Deno.test('RegExp: S15.10.2.8_A2_T3.js', () => {
  /*---
info: |
    The form (?! Disjunction ) specifies a zero-width negative lookahead.
    In order for it to succeed, the pattern inside Disjunction must fail to match at the current position.
    The current position is not advanced before matching the sequel
    Execute /Java(?!Script)([A-Z]\w*)/.test("using of Java language")
    and check results
  ---*/

  const __executed = /Java(?!Script)([A-Z]\w*)/.test('using of Java language');

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.8_A2_T4.js
Deno.test('RegExp: S15.10.2.8_A2_T4.js', () => {
  /*---
info: |
    The form (?! Disjunction ) specifies a zero-width negative lookahead.
    In order for it to succeed, the pattern inside Disjunction must fail to match at the current position.
    The current position is not advanced before matching the sequel
    Execute /Java(?!Script)([A-Z]\w*)/.test("i'm a JavaScripter ") and
    check results
  ---*/

  const __executed = /Java(?!Script)([A-Z]\w*)/.test("i'm a JavaScripter ");

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.8_A2_T5.js
Deno.test('RegExp: S15.10.2.8_A2_T5.js', () => {
  /*---
info: |
    The form (?! Disjunction ) specifies a zero-width negative lookahead.
    In order for it to succeed, the pattern inside Disjunction must fail to match at the current position.
    The current position is not advanced before matching the sequel
    Execute /Java(?!Script)([A-Z]\w*)/.exec("JavaScr oops ipt ") and
    check results
  ---*/

  const __executed = /Java(?!Script)([A-Z]\w*)/.exec('JavaScr oops ipt ');

  const __expected = ['JavaScr', 'Scr'];
  __expected.index = 0;
  __expected.input = 'JavaScr oops ipt ';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A2_T6.js
Deno.test('RegExp: S15.10.2.8_A2_T6.js', () => {
  /*---
info: |
    The form (?! Disjunction ) specifies a zero-width negative lookahead.
    In order for it to succeed, the pattern inside Disjunction must fail to match at the current position.
    The current position is not advanced before matching the sequel
description: Execute /(\.(?!com|org)|\/)/.exec("ah.info") and check results
  ---*/

  const __executed = /(\.(?!com|org)|\/)/.exec('ah.info');

  const __expected = ['.', '.'];
  __expected.index = 2;
  __expected.input = 'ah.info';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A2_T7.js
Deno.test('RegExp: S15.10.2.8_A2_T7.js', () => {
  /*---
info: |
    The form (?! Disjunction ) specifies a zero-width negative lookahead.
    In order for it to succeed, the pattern inside Disjunction must fail to match at the current position.
    The current position is not advanced before matching the sequel
description: Execute /(\.(?!com|org)|\/)/.exec("ah/info") and check results
  ---*/

  const __executed = /(\.(?!com|org)|\/)/.exec('ah/info');

  const __expected = ['/', '/'];
  __expected.index = 2;
  __expected.input = 'ah/info';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A2_T8.js
Deno.test('RegExp: S15.10.2.8_A2_T8.js', () => {
  /*---
info: |
    The form (?! Disjunction ) specifies a zero-width negative lookahead.
    In order for it to succeed, the pattern inside Disjunction must fail to match at the current position.
    The current position is not advanced before matching the sequel
description: Execute /(\.(?!com|org)|\/)/.test("ah.com") and check results
  ---*/

  const __executed = /(\.(?!com|org)|\/)/.test('ah.com');

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.8_A2_T9.js
Deno.test('RegExp: S15.10.2.8_A2_T9.js', () => {
  /*---
info: |
    The form (?! Disjunction ) specifies a zero-width negative lookahead.
    In order for it to succeed, the pattern inside Disjunction must fail to match at the current position.
    The current position is not advanced before matching the sequel
description: Execute /(?!a|b)|c/.exec("") and check results
  ---*/

  const __executed = /(?!a|b)|c/.exec('');

  const __expected = [''];
  __expected.index = 0;
  __expected.input = '';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T10.js
Deno.test('RegExp: S15.10.2.8_A3_T10.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
description: Execute /(\d{3})(\d{3})\1\2/.exec("123456123456") and check results
  ---*/

  const __executed = /(\d{3})(\d{3})\1\2/.exec('123456123456');

  const __expected = ['123456123456', '123', '456'];
  __expected.index = 0;
  __expected.input = '123456123456';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T11.js
Deno.test('RegExp: S15.10.2.8_A3_T11.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
description: Execute /a(..(..)..)/.exec("abcdefgh") and check results
  ---*/

  const __executed = /a(..(..)..)/.exec('abcdefgh');

  const __expected = ['abcdefg', 'bcdefg', 'de'];
  __expected.index = 0;
  __expected.input = 'abcdefgh';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T12.js
Deno.test('RegExp: S15.10.2.8_A3_T12.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
description: Execute /(a(b(c)))(d(e(f)))/.exec("xabcdefg") and check results
  ---*/

  const __executed = /(a(b(c)))(d(e(f)))/.exec('xabcdefg');

  const __expected = ['abcdef', 'abc', 'bc', 'c', 'def', 'ef', 'f'];
  __expected.index = 1;
  __expected.input = 'xabcdefg';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T13.js
Deno.test('RegExp: S15.10.2.8_A3_T13.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
    Execute /(a(b(c)))(d(e(f)))\2\5/.exec("xabcdefbcefg") and check
    results
  ---*/

  const __executed = /(a(b(c)))(d(e(f)))\2\5/.exec('xabcdefbcefg');

  const __expected = ['abcdefbcef', 'abc', 'bc', 'c', 'def', 'ef', 'f'];
  __expected.index = 1;
  __expected.input = 'xabcdefbcefg';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T14.js
Deno.test('RegExp: S15.10.2.8_A3_T14.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
description: Execute /a(.?)b\1c\1d\1/.exec("abcd") and check results
  ---*/

  const __executed = /a(.?)b\1c\1d\1/.exec('abcd');

  const __expected = ['abcd', ''];
  __expected.index = 0;
  __expected.input = 'abcd';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T15.js
Deno.test('RegExp: S15.10.2.8_A3_T15.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
description: "see bug http:bugzilla.mozilla.org/show_bug.cgi?id=119909"
  ---*/

  const __strOriginal = 'hello';
  const __openParen = '(';
  const __closeParen = ')';
  const __pattern = '';
  const numParens = 200;

  for (const i = 0; i < numParens; i++) {
    __pattern += __openParen;
  }

  __pattern += __strOriginal;

  for (i = 0; i < numParens; i++) {
    __pattern += __closeParen;
  }

  const __re = createNewRegExpAtom(__pattern);

  const __executed = __re.exec(__strOriginal);

  const __expected = [];
  for (const i = 0; i <= numParens; i++) {
    __expected.push(__strOriginal);
  }
  __expected.index = 0;
  __expected.input = __strOriginal;

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T16.js
Deno.test('RegExp: S15.10.2.8_A3_T16.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
description: "see bug http:bugzilla.mozilla.org/show_bug.cgi?id=119909"
  ---*/

  const __strOriginal = 'hello';
  const __openParen = '(?:';
  const __closeParen = ')';
  const __pattern = '';
  const numParens = 200;

  for (const i = 0; i < numParens; i++) {
    __pattern += __openParen;
  }

  __pattern += __strOriginal;

  for (i = 0; i < numParens; i++) {
    __pattern += __closeParen;
  }

  const __re = createNewRegExpAtom(__pattern);

  const __executed = __re.exec(__strOriginal);

  const __expected = [__strOriginal];
  __expected.index = 0;
  __expected.input = __strOriginal;

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T17.js
Deno.test('RegExp: S15.10.2.8_A3_T17.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
description: "see bug http:bugzilla.mozilla.org/show_bug.cgi?id=169497"
  ---*/

  const __body = '';
  __body += '<body onXXX="alert(event.type);">\n';
  __body += '<p>Kibology for all<\/p>\n';
  __body += '<p>All for Kibology<\/p>\n';
  __body += '<\/body>';

  const __html = '';
  __html += '<html>\n';
  __html += __body;
  __html += '\n<\/html>';

  const __executed = /<body.*>((.*\n?)*?)<\/body>/i.exec(__html);

  const __expected = [__body, '\n<p>Kibology for all</p>\n<p>All for Kibology</p>\n', '<p>All for Kibology</p>\n'];
  __expected.index = 7;
  __expected.input = __html;

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T18.js
Deno.test('RegExp: S15.10.2.8_A3_T18.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
description: "see bug  http:bugzilla.mozilla.org/show_bug.cgi?id=169534"
  ---*/

  const __replaced = 'To sign up click |here|https:www.xxxx.org/subscribe.htm|'.replace(
    /(\|)([\w\x81-\xff ]*)(\|)([\/a-z][\w:\/\.]*\.[a-z]{3,4})(\|)/ig,
    '<a href="$4">$2</a>',
  );

  const __expected = 'To sign up click <a href="https:www.xxxx.org/subscribe.htm">here</a>';

  assert.sameValue(__replaced, __expected, 'The value of __replaced is expected to equal the value of __expected');
});
// file S15.10.2.8_A3_T19.js
Deno.test('RegExp: S15.10.2.8_A3_T19.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
    Execute /([\S]+([ \t]+[\S]+)*)[ \t]*=[
    \t]*[\S]+/.exec("Course_Creator = Test") and check results
  ---*/

  const __executed = /([\S]+([ \t]+[\S]+)*)[ \t]*=[ \t]*[\S]+/.exec('Course_Creator = Test');

  const __expected = ['Course_Creator = Test', 'Course_Creator', undefined];
  __expected.index = 0;
  __expected.input = 'Course_Creator = Test';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T1.js
Deno.test('RegExp: S15.10.2.8_A3_T1.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
    Execute /([Jj]ava([Ss]cript)?)\sis\s(fun\w*)/.exec("Learning
    javaScript is funny, really") and check results
  ---*/

  const __executed = /([Jj]ava([Ss]cript)?)\sis\s(fun\w*)/.exec('Learning javaScript is funny, really');

  const __expected = ['javaScript is funny', 'javaScript', 'Script', 'funny'];
  __expected.index = 9;
  __expected.input = 'Learning javaScript is funny, really';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T20.js
Deno.test('RegExp: S15.10.2.8_A3_T20.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
description: Execute /^(A)?(A.*)$/.exec("AAA") and check results
  ---*/

  const __executed = /^(A)?(A.*)$/.exec('AAA');

  const __expected = ['AAA', 'A', 'AA'];
  __expected.index = 0;
  __expected.input = 'AAA';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T21.js
Deno.test('RegExp: S15.10.2.8_A3_T21.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
description: Execute /^(A)?(A.*)$/.exec("AA") and check results
  ---*/

  const __executed = /^(A)?(A.*)$/.exec('AA');

  const __expected = ['AA', 'A', 'A'];
  __expected.index = 0;
  __expected.input = 'AA';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T22.js
Deno.test('RegExp: S15.10.2.8_A3_T22.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
description: Execute /^(A)?(A.*)$/.exec("A") and check results
  ---*/

  const __executed = /^(A)?(A.*)$/.exec('A');

  const __expected = ['A', undefined, 'A'];
  __expected.index = 0;
  __expected.input = 'A';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T23.js
Deno.test('RegExp: S15.10.2.8_A3_T23.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
    Execute /(A)?(A.*)/.exec("zxcasd;fl\\\  ^AAAaaAAaaaf;lrlrzs") and
    check results
  ---*/

  const __string = 'zxcasd;fl\\\  ^AAAaaAAaaaf;lrlrzs';

  const __executed = /(A)?(A.*)/.exec(__string);

  const __expected = ['AAAaaAAaaaf;lrlrzs', 'A', 'AAaaAAaaaf;lrlrzs'];
  __expected.index = 13;
  __expected.input = __string;

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T24.js
Deno.test('RegExp: S15.10.2.8_A3_T24.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
    Execute /(A)?(A.*)/.exec("zxcasd;fl\\\  ^AAaaAAaaaf;lrlrzs") and
    check results
  ---*/

  const __string = 'zxcasd;fl\\\  ^AAaaAAaaaf;lrlrzs';

  const __executed = /(A)?(A.*)/.exec(__string);

  const __expected = ['AAaaAAaaaf;lrlrzs', 'A', 'AaaAAaaaf;lrlrzs'];
  __expected.index = 13;
  __expected.input = __string;

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T25.js
Deno.test('RegExp: S15.10.2.8_A3_T25.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
    Execute /(A)?(A.*)/.exec("zxcasd;fl\\\  ^AaaAAaaaf;lrlrzs") and
    check results
  ---*/

  const __string = 'zxcasd;fl\\\  ^AaaAAaaaf;lrlrzs';

  const __executed = /(A)?(A.*)/.exec(__string);

  const __expected = ['AaaAAaaaf;lrlrzs', undefined, 'AaaAAaaaf;lrlrzs'];
  __expected.index = 13;
  __expected.input = __string;

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T26.js
Deno.test('RegExp: S15.10.2.8_A3_T26.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
description: Execute /(a)?a/.exec("a") and check results
  ---*/

  const __string = 'a';

  const __executed = /(a)?a/.exec(__string);

  const __expected = ['a', undefined];
  __expected.index = 0;
  __expected.input = __string;

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T27.js
Deno.test('RegExp: S15.10.2.8_A3_T27.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
description: Execute /a|(b)/.exec("a") and check results
  ---*/

  const __string = 'a';

  const __executed = /a|(b)/.exec(__string);

  const __expected = ['a', undefined];
  __expected.index = 0;
  __expected.input = __string;

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T28.js
Deno.test('RegExp: S15.10.2.8_A3_T28.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
description: Execute /(a)?(a)/.exec("a") and check results
  ---*/

  const __string = 'a';

  const __executed = /(a)?(a)/.exec(__string);

  const __expected = ['a', undefined, 'a'];
  __expected.index = 0;
  __expected.input = __string;

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T29.js
Deno.test('RegExp: S15.10.2.8_A3_T29.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
description: "See bug http:bugzilla.mozilla.org/show_bug.cgi?id=165353"
  ---*/

  const __string = 'a';

  const __executed = /^([a-z]+)*[a-z]$/.exec(__string);

  const __expected = ['a', undefined];
  __expected.index = 0;
  __expected.input = __string;

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T2.js
Deno.test('RegExp: S15.10.2.8_A3_T2.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
    Execute /([Jj]ava([Ss]cript)?)\sis\s(fun\w*)/.exec("Developing
    with Java is fun, try it") and check results
  ---*/

  const __executed = /([Jj]ava([Ss]cript)?)\sis\s(fun\w*)/.exec('Developing with Java is fun, try it');

  const __expected = ['Java is fun', 'Java', undefined, 'fun'];
  __expected.index = 16;
  __expected.input = 'Developing with Java is fun, try it';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T30.js
Deno.test('RegExp: S15.10.2.8_A3_T30.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
description: "See bug http:bugzilla.mozilla.org/show_bug.cgi?id=165353"
  ---*/

  const __string = 'ab';

  const __executed = /^([a-z]+)*[a-z]$/.exec(__string);

  const __expected = ['ab', 'a'];
  __expected.index = 0;
  __expected.input = __string;

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T31.js
Deno.test('RegExp: S15.10.2.8_A3_T31.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
description: "See bug http:bugzilla.mozilla.org/show_bug.cgi?id=165353"
  ---*/

  const __string = 'abc';

  const __executed = /^([a-z]+)*[a-z]$/.exec(__string);

  const __expected = ['abc', 'ab'];
  __expected.index = 0;
  __expected.input = __string;

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T32.js
Deno.test('RegExp: S15.10.2.8_A3_T32.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
description: "See bug http:bugzilla.mozilla.org/show_bug.cgi?id=165353"
  ---*/

  const __string = 'www.netscape.com';

  const __executed = /^(([a-z]+)*[a-z]\.)+[a-z]{2,}$/.exec(__string);

  const __expected = ['www.netscape.com', 'netscape.', 'netscap'];
  __expected.index = 0;
  __expected.input = __string;

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T33.js
Deno.test('RegExp: S15.10.2.8_A3_T33.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
description: "See bug http:bugzilla.mozilla.org/show_bug.cgi?id=165353"
  ---*/

  const __string = 'www.netscape.com';

  const __executed = /^(([a-z]+)*([a-z])\.)+[a-z]{2,}$/.exec(__string);

  const __expected = ['www.netscape.com', 'netscape.', 'netscap', 'e'];
  __expected.index = 0;
  __expected.input = __string;

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T3.js
Deno.test('RegExp: S15.10.2.8_A3_T3.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
    Execute /([Jj]ava([Ss]cript)?)\sis\s(fun\w*)/.test("Developing
    with JavaScript is dangerous, do not try it without assistance")
    and check results
  ---*/

  const __executed = /([Jj]ava([Ss]cript)?)\sis\s(fun\w*)/.test(
    'Developing with JavaScript is dangerous, do not try it without assistance',
  );

  assert(!__executed, 'The value of !__executed is expected to be true');
});
// file S15.10.2.8_A3_T4.js
Deno.test('RegExp: S15.10.2.8_A3_T4.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
description: Execute /(abc)/.exec("abc") and check results
  ---*/

  const __executed = /(abc)/.exec('abc');

  const __expected = ['abc', 'abc'];
  __expected.index = 0;
  __expected.input = 'abc';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T5.js
Deno.test('RegExp: S15.10.2.8_A3_T5.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
description: Execute /a(bc)d(ef)g/.exec("abcdefg") and check results
  ---*/

  const __executed = /a(bc)d(ef)g/.exec('abcdefg');

  const __expected = ['abcdefg', 'bc', 'ef'];
  __expected.index = 0;
  __expected.input = 'abcdefg';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T6.js
Deno.test('RegExp: S15.10.2.8_A3_T6.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
description: Execute /(.{3})(.{4})/.exec("abcdefgh") and check results
  ---*/

  const __executed = /(.{3})(.{4})/.exec('abcdefgh');

  const __expected = ['abcdefg', 'abc', 'defg'];
  __expected.index = 0;
  __expected.input = 'abcdefgh';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T7.js
Deno.test('RegExp: S15.10.2.8_A3_T7.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
description: Execute /(aa)bcd\1/.exec("aabcdaabcd") and check results
  ---*/

  const __executed = /(aa)bcd\1/.exec('aabcdaabcd');

  const __expected = ['aabcdaa', 'aa'];
  __expected.index = 0;
  __expected.input = 'aabcdaabcd';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T8.js
Deno.test('RegExp: S15.10.2.8_A3_T8.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
description: Execute /(aa).+\1/.exec("aabcdaabcd") and check results
  ---*/

  const __executed = /(aa).+\1/.exec('aabcdaabcd');

  const __expected = ['aabcdaa', 'aa'];
  __expected.index = 0;
  __expected.input = 'aabcdaabcd';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A3_T9.js
Deno.test('RegExp: S15.10.2.8_A3_T9.js', () => {
  /*---
info: |
    Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
    The result can be used either in a backreference (\ followed by a nonzero decimal number),
    referenced in a replace string,
    or returned as part of an array from the regular expression matching function
description: Execute /(.{2}).+\1/.exec("aabcdaabcd") and check results
  ---*/

  const __executed = /(.{2}).+\1/.exec('aabcdaabcd');

  const __expected = ['aabcdaa', 'aa'];
  __expected.index = 0;
  __expected.input = 'aabcdaabcd';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A4_T1.js
Deno.test('RegExp: S15.10.2.8_A4_T1.js', () => {
  /*---
info: |
    The production Atom :: . evaluates as follows:
    i) Let A be the set of all characters except the four line terminator characters <LF>, <CR>, <LS>, or <PS>
    ii) Call CharacterSetMatcher(A, false) and return its Matcher result
description: Execute /ab.de/.exec("abcde") and check results
  ---*/

  const __string = 'abcde';
  const __executed = /ab.de/.exec(__string);

  const __expected = ['abcde'];
  __expected.index = 0;
  __expected.input = __string;

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A4_T2.js
Deno.test('RegExp: S15.10.2.8_A4_T2.js', () => {
  /*---
info: |
    The production Atom :: . evaluates as follows:
    i) Let A be the set of all characters except the four line terminator characters <LF>, <CR>, <LS>, or <PS>
    ii) Call CharacterSetMatcher(A, false) and return its Matcher result
description: Execute /.+/.exec("line 1\nline 2") and check results
  ---*/

  const __string = 'line 1\nline 2';
  const __executed = /.+/.exec(__string);

  const __expected = ['line 1'];
  __expected.index = 0;
  __expected.input = __string;

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A4_T3.js
Deno.test('RegExp: S15.10.2.8_A4_T3.js', () => {
  /*---
info: |
    The production Atom :: . evaluates as follows:
    i) Let A be the set of all characters except the four line terminator characters <LF>, <CR>, <LS>, or <PS>
    ii) Call CharacterSetMatcher(A, false) and return its Matcher result
description: Execute /.*a.* /.exec("this is a test") and check results
  ---*/

  const __string = 'this is a test';
  const __executed = /.*a.*/.exec(__string);

  const __expected = ['this is a test'];
  __expected.index = 0;
  __expected.input = __string;

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A4_T4.js
Deno.test('RegExp: S15.10.2.8_A4_T4.js', () => {
  /*---
info: |
    The production Atom :: . evaluates as follows:
    i) Let A be the set of all characters except the four line terminator characters <LF>, <CR>, <LS>, or <PS>
    ii) Call CharacterSetMatcher(A, false) and return its Matcher result
description: Execute /.+/.exec("this is a *&^%$# test") and check results
  ---*/

  const __string = 'this is a *&^%$# test';
  const __executed = /.+/.exec(__string);

  const __expected = ['this is a *&^%$# test'];
  __expected.index = 0;
  __expected.input = __string;

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A4_T5.js
Deno.test('RegExp: S15.10.2.8_A4_T5.js', () => {
  /*---
info: |
    The production Atom :: . evaluates as follows:
    i) Let A be the set of all characters except the four line terminator characters <LF>, <CR>, <LS>, or <PS>
    ii) Call CharacterSetMatcher(A, false) and return its Matcher result
description: Execute /.+/.exec("....") and check results
  ---*/

  const __string = '....';
  const __executed = /.+/.exec(__string);

  const __expected = ['....'];
  __expected.index = 0;
  __expected.input = __string;

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A4_T6.js
Deno.test('RegExp: S15.10.2.8_A4_T6.js', () => {
  /*---
info: |
    The production Atom :: . evaluates as follows:
    i) Let A be the set of all characters except the four line terminator characters <LF>, <CR>, <LS>, or <PS>
    ii) Call CharacterSetMatcher(A, false) and return its Matcher result
description: Execute /.+/.exec("abcdefghijklmnopqrstuvwxyz") and check results
  ---*/

  const __string = 'abcdefghijklmnopqrstuvwxyz';
  const __executed = /.+/.exec(__string);

  const __expected = ['abcdefghijklmnopqrstuvwxyz'];
  __expected.index = 0;
  __expected.input = __string;

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A4_T7.js
Deno.test('RegExp: S15.10.2.8_A4_T7.js', () => {
  /*---
info: |
    The production Atom :: . evaluates as follows:
    i) Let A be the set of all characters except the four line terminator characters <LF>, <CR>, <LS>, or <PS>
    ii) Call CharacterSetMatcher(A, false) and return its Matcher result
description: Execute /.+/.exec("ABCDEFGHIJKLMNOPQRSTUVWXYZ") and check results
  ---*/

  const __string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const __executed = /.+/.exec(__string);

  const __expected = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
  __expected.index = 0;
  __expected.input = __string;

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A4_T8.js
Deno.test('RegExp: S15.10.2.8_A4_T8.js', () => {
  /*---
info: |
    The production Atom :: . evaluates as follows:
    i) Let A be the set of all characters except the four line terminator characters <LF>, <CR>, <LS>, or <PS>
    ii) Call CharacterSetMatcher(A, false) and return its Matcher result
description: Execute /.+/.exec("`1234567890-=~!@#$%^&*()_+") and check results
  ---*/

  const __string = '`1234567890-=~!@#$%^&*()_+';
  const __executed = /.+/.exec(__string);

  const __expected = ['`1234567890-=~!@#$%^&*()_+'];
  __expected.index = 0;
  __expected.input = __string;

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A4_T9.js
Deno.test('RegExp: S15.10.2.8_A4_T9.js', () => {
  /*---
info: |
    The production Atom :: . evaluates as follows:
    i) Let A be the set of all characters except the four line terminator characters <LF>, <CR>, <LS>, or <PS>
    ii) Call CharacterSetMatcher(A, false) and return its Matcher result
description: "Execute /.+/.exec(\"|\\\\[{]};:\\\"\\',<>.?/\") and check results"
  ---*/

  const __string = '|\\[{]};:"\',<>.?/';
  const __executed = /.+/.exec(__string);

  const __expected = ['|\\[{]};:"\',<>.?/'];
  __expected.index = 0;
  __expected.input = __string;

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A5_T1.js
Deno.test('RegExp: S15.10.2.8_A5_T1.js', () => {
  /*---
info: |
    In case-insignificant matches all characters are implicitly converted to
    upper case immediately before they are compared
description: Execute /[a-z]+/ig.exec("ABC def ghi") and check results
  ---*/

  const __string = 'ABC def ghi';
  const __executed = /[a-z]+/ig.exec(__string);

  const __expected = ['ABC'];
  __expected.index = 0;
  __expected.input = __string;

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.8_A5_T2.js
Deno.test('RegExp: S15.10.2.8_A5_T2.js', () => {
  /*---
info: |
    In case-insignificant matches all characters are implicitly converted to
    upper case immediately before they are compared
description: Execute /[a-z]+/.exec("ABC def ghi") and check results
  ---*/

  const __string = 'ABC def ghi';
  const __executed = /[a-z]+/.exec(__string);

  const __expected = ['def'];
  __expected.index = 4;
  __expected.input = __string;

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.9_A1_T1.js
Deno.test('RegExp: S15.10.2.9_A1_T1.js', () => {
  /*---
info: |
    An escape sequence of the form \ followed by a nonzero decimal number n
    matches the result of the nth set of capturing parentheses (see
    15.10.2.11)
    Execute /\b(\w+) \1\b/.exec("do you listen the the band") and
    check results
  ---*/

  const __executed = /\b(\w+) \1\b/.exec('do you listen the the band');

  const __expected = ['the the', 'the'];
  __expected.index = 14;
  __expected.input = 'do you listen the the band';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.9_A1_T2.js
Deno.test('RegExp: S15.10.2.9_A1_T2.js', () => {
  /*---
info: |
    An escape sequence of the form \ followed by a nonzero decimal number n
    matches the result of the nth set of capturing parentheses (see
    15.10.2.11)
    Execute
    /([xu]\d{2}([A-H]{2})?)\1/.exec("x09x12x01x01u00FFu00FFx04x04x23")
    and check results
  ---*/

  const __executed = /([xu]\d{2}([A-H]{2})?)\1/.exec('x09x12x01x01u00FFu00FFx04x04x23');

  const __expected = ['x01x01', 'x01', undefined];
  __expected.index = 6;
  __expected.input = 'x09x12x01x01u00FFu00FFx04x04x23';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.9_A1_T3.js
Deno.test('RegExp: S15.10.2.9_A1_T3.js', () => {
  /*---
info: |
    An escape sequence of the form \ followed by a nonzero decimal number n
    matches the result of the nth set of capturing parentheses (see
    15.10.2.11)
    Execute
    /([xu]\d{2}([A-H]{2})?)\1/.exec("x09x12x01x05u00FFu00FFx04x04x23")
    and check results
  ---*/

  const __executed = /([xu]\d{2}([A-H]{2})?)\1/.exec('x09x12x01x05u00FFu00FFx04x04x23');

  const __expected = ['u00FFu00FF', 'u00FF', 'FF'];
  __expected.index = 12;
  __expected.input = 'x09x12x01x05u00FFu00FFx04x04x23';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2.9_A1_T5.js
Deno.test('RegExp: S15.10.2.9_A1_T5.js', () => {
  /*---
info: |
    An escape sequence of the form \ followed by a nonzero decimal number n
    matches the result of the nth set of capturing parentheses (see
    15.10.2.11)
description: Execute /(a*)b\1+/.exec("baaac") and check results
  ---*/

  const __executed = /(a*)b\1+/.exec('baaac');

  const __expected = ['b', ''];
  __expected.index = 0;
  __expected.input = 'baaac';

  assert.sameValue(
    __executed.length,
    __expected.length,
    'The value of __executed.length is expected to equal the value of __expected.length',
  );

  assert.sameValue(
    __executed.index,
    __expected.index,
    'The value of __executed.index is expected to equal the value of __expected.index',
  );

  assert.sameValue(
    __executed.input,
    __expected.input,
    'The value of __executed.input is expected to equal the value of __expected.input',
  );

  for (const index = 0; index < __expected.length; index++) {
    assert.sameValue(
      __executed[index],
      __expected[index],
      'The value of __executed[index] is expected to equal the value of __expected[index]',
    );
  }
});
// file S15.10.2_A1_T1.js
Deno.test('RegExp: S15.10.2_A1_T1.js', () => {
  /*---
info: XML Shallow Parsing with Regular Expressions
description: "See bug http://bugzilla.mozilla.org/show_bug.cgi?id=103087"
  ---*/

  // REX/Javascript 1.0
  // Robert D. Cameron "REX: XML Shallow Parsing with Regular Expressions",
  // Technical Report TR 1998-17, School of Computing Science, Simon Fraser
  // University, November, 1998.
  // Copyright (c) 1998, Robert D. Cameron.
  // The following code may be freely used and distributed provided that
  // this copyright and citation notice remains intact and that modifications
  // or additions are clearly identified.

  const TextSE = '[^<]+';
  const UntilHyphen = '[^-]*-';
  const Until2Hyphens = UntilHyphen + '([^-]' + UntilHyphen + ')*-';
  const CommentCE = Until2Hyphens + '>?';
  const UntilRSBs = '[^\\]]*\\]([^\\]]+\\])*\\]+';
  const CDATA_CE = UntilRSBs + '([^\\]>]' + UntilRSBs + ')*>';
  const S = '[ \\n\\t\\r]+';
  const NameStrt = '[A-Za-z_:]|[^\\x00-\\x7F]';
  const NameChar = '[A-Za-z0-9_:.-]|[^\\x00-\\x7F]';
  const Name = '(' + NameStrt + ')(' + NameChar + ')*';
  const QuoteSE = '"[^"]' + '*' + '"' + "|'[^']*'";
  const DT_IdentSE = S + Name + '(' + S + '(' + Name + '|' + QuoteSE + '))*';
  const MarkupDeclCE = '([^\\]"\'><]+|' + QuoteSE + ')*>';
  const S1 = '[\\n\\r\\t ]';
  const UntilQMs = '[^?]*\\?+';
  const PI_Tail = '\\?>|' + S1 + UntilQMs + '([^>?]' + UntilQMs + ')*>';
  const DT_ItemSE = '<(!(--' + Until2Hyphens + '>|[^-]' + MarkupDeclCE + ')|\\?' + Name + '(' + PI_Tail + '))|%' +
    Name +
    ';|' + S;
  const DocTypeCE = DT_IdentSE + '(' + S + ')?(\\[(' + DT_ItemSE + ')*\\](' + S + ')?)?>?';
  const DeclCE = '--(' + CommentCE + ')?|\\[CDATA\\[(' + CDATA_CE + ')?|DOCTYPE(' + DocTypeCE + ')?';
  const PI_CE = Name + '(' + PI_Tail + ')?';
  const EndTagCE = Name + '(' + S + ')?>?';
  const AttValSE = '"[^<"]' + '*' + '"' + "|'[^<']*'";
  const ElemTagCE = Name + '(' + S + Name + '(' + S + ')?=(' + S + ')?(' + AttValSE + '))*(' + S + ')?/?>?';
  const MarkupSPE = '<(!(' + DeclCE + ')?|\\?(' + PI_CE + ')?|/(' + EndTagCE + ')?|(' + ElemTagCE + ')?)';
  const XML_SPE = TextSE + '|' + MarkupSPE;

  ///
  ////
  /////

  const __patterns = [
    TextSE,
    UntilHyphen,
    Until2Hyphens,
    CommentCE,
    UntilRSBs,
    CDATA_CE,
    S,
    NameStrt,
    NameChar,
    Name,
    QuoteSE,
    DT_IdentSE,
    MarkupDeclCE,
    S1,
    UntilQMs,
    PI_Tail,
    DT_ItemSE,
    DocTypeCE,
    DeclCE,
    PI_CE,
    EndTagCE,
    AttValSE,
    ElemTagCE,
    MarkupSPE,
    XML_SPE,
  ];

  const __html = '' +
    '<html xmlns="http://www.w3.org/1999/xhtml"\n' +
    '      xmlns:xlink="http://www.w3.org/XML/XLink/0.9">\n' +
    '  <head><title>Three Namespaces</title></head>\n' +
    '  <body>\n' +
    '    <h1 align="center">An Ellipse and a Rectangle</h1>\n' +
    '    <svg xmlns="http://www.w3.org/Graphics/SVG/SVG-19991203.dtd"\n' +
    '         width="12cm" height="10cm">\n' +
    '      <ellipse rx="110" ry="130" />\n' +
    '      <rect x="4cm" y="1cm" width="3cm" height="6cm" />\n' +
    '    </svg>\n' +
    '    <p xlink:type="simple" xlink:href="ellipses.html">\n' +
    '      More about ellipses\n' +
    '    </p>\n' +
    '    <p xlink:type="simple" xlink:href="rectangles.html">\n' +
    '      More about rectangles\n' +
    '    </p>\n' +
    '    <hr/>\n' +
    '    <p>Last Modified February 13, 2000</p>\n' +
    '  </body>\n' +
    '</html>';

  //////////////////////////////////////////////////////////////////////////////
  try {
    for (const index = 0; index < __patterns.length; index++) {
      const __re = createNewRegExpAtom(__patterns[index]);
      __re.test(__html);
    }
  } catch (_e) {
    throw new Test262Error('#' + index + ': XML Shallow Parsing with Regular Expression: ' + __patterns[index]);
  }
  //
  //////////////////////////////////////////////////////////////////////////////

  // TODO: Convert to assert.throws() format.
});
// file S15.10.3.1_A1_T1.js
Deno.test('RegExp: S15.10.3.1_A1_T1.js', () => {
  /*---
info: |
    If pattern is an object R whose [[Class]] property is "RegExp" and flags
    is undefined, then return R unchanged
description: R is /x/i and instance is RegExp(R)
  ---*/

  const __re = /x/i;
  const __instance = RegExp(__re);
  __re.indicator = 1;

  assert.sameValue(__instance.indicator, 1, 'The value of __instance.indicator is expected to be 1');
});
// file S15.10.3.1_A1_T2.js
Deno.test('RegExp: S15.10.3.1_A1_T2.js', () => {
  /*---
info: |
    If pattern is an object R whose [[Class]] property is "RegExp" and flags
    is undefined, then return R unchanged
description: R is createNewRegExpAtom and instance is RegExp(R, function(){}())
  ---*/

  const __re = createNewRegExpAtom();
  const __instance = RegExp(__re, function () {}());
  __re.indicator = 1;

  assert.sameValue(__instance.indicator, 1, 'The value of __instance.indicator is expected to be 1');
});
// file S15.10.3.1_A1_T3.js
Deno.test('RegExp: S15.10.3.1_A1_T3.js', () => {
  /*---
info: |
    If pattern is an object R whose [[Class]] property is "RegExp" and flags
    is undefined, then return R unchanged
    R is createNewRegExpAtom() and instance is RegExp(R, x), where x is
    undefined variable
  ---*/

  const __re = createNewRegExpAtom();
  const __instance = RegExp(__re, x);
  __re.indicator = 1;

  assert.sameValue(__instance.indicator, 1, 'The value of __instance.indicator is expected to be 1');

  const x;
});
// file S15.10.3.1_A1_T4.js
Deno.test('RegExp: S15.10.3.1_A1_T4.js', () => {
  /*---
info: |
    If pattern is an object R whose [[Class]] property is "RegExp" and flags
    is undefined, then return R unchanged
description: R is createNewRegExpAtom() and instance is RegExp(R, void 0)
  ---*/

  const __re = RegExp();
  const __instance = RegExp(__re, void 0);
  __re.indicator = 1;

  assert.sameValue(__instance.indicator, 1, 'The value of __instance.indicator is expected to be 1');
});
// file S15.10.3.1_A1_T5.js
Deno.test('RegExp: S15.10.3.1_A1_T5.js', () => {
  /*---
info: |
    If pattern is an object R whose [[Class]] property is "RegExp" and flags
    is undefined, then return R unchanged
description: R is /\b/m and instance is RegExp(R, undefined)
  ---*/

  const __re = /\b/m;
  const __instance = RegExp(__re, undefined);
  __re.indicator = 1;

  assert.sameValue(__instance.indicator, 1, 'The value of __instance.indicator is expected to be 1');
});
// file S15.10.3.1_A2_T1.js
Deno.test('RegExp: S15.10.3.1_A2_T1.js', () => {
  /*---
info: |
    If pattern is an object R whose [[Class]] property is "RegExp" and flags is defined, then
    call the RegExp constructor (15.10.4.1), passing it the pattern and flags arguments and return the object constructed by that constructor
    Checking if using "1" as flags leads to throwing the correct
    exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: RegExp(createNewRegExpAtom("\\d"), "1")) throw SyntaxError. Actual: ' +
        (RegExp(createNewRegExpAtom('\d'), '1')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.3.1_A2_T2.js
Deno.test('RegExp: S15.10.3.1_A2_T2.js', () => {
  /*---
info: |
    If pattern is an object R whose [[Class]] property is "RegExp" and flags is defined, then
    call the RegExp constructor (15.10.4.1), passing it the pattern and flags arguments and return the object constructed by that constructor
    Checking if using dafined variable "x = 1" as flags leads to
    throwing the correct exception
  ---*/

  const x = 1;

  try {
    throw new Test262Error(
      '#1.1: const x = 1; RegExp(/[a-b]?/, x) throw SyntaxError. Actual: ' + (RegExp(/[a-b]?/, x)),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.3.1_A3_T1.js
Deno.test('RegExp: S15.10.3.1_A3_T1.js', () => {
  /*---
info: |
    If pattern and flags are defined, then
    call the RegExp constructor (15.10.4.1), passing it the pattern and flags arguments and return the object constructed by that constructor
description: R is "d+" and instance is RegExp(R,"i")
  ---*/

  const __re = 'd+';
  const __instance = RegExp(__re, 'i');

  assert.sameValue(
    __instance.constructor,
    RegExp,
    'The value of __instance.constructor is expected to equal the value of RegExp',
  );

  assert.sameValue(__instance.source, __re, 'The value of __instance.source is expected to equal the value of __re');
});
// file S15.10.3.1_A3_T2.js
Deno.test('RegExp: S15.10.3.1_A3_T2.js', () => {
  /*---
info: |
    If pattern and flags are defined, then
    call the RegExp constructor (15.10.4.1), passing it the pattern and flags arguments and return the object constructed by that constructor
    R is {toString:function(){return "[a-c]*";}} and instance is
    RegExp(R,"gm")
  ---*/

  const __instance = RegExp({
    toString: function () {
      return '[a-c]*';
    },
  }, 'gm');

  assert.sameValue(
    __instance.constructor,
    RegExp,
    'The value of __instance.constructor is expected to equal the value of RegExp',
  );

  assert.sameValue(__instance.source, '[a-c]*', 'The value of __instance.source is expected to be "[a-c]*"');
});
// file S15.10.4.1_A1_T1.js
Deno.test('RegExp: S15.10.4.1_A1_T1.js', () => {
  /*---
info: |
    If pattern is an object R whose [[Class]] property is "RegExp" and flags is undefined, then let P be
    the pattern used to construct R and let F be the flags used to construct R
description: Pattern is /./i and RegExp is createNewRegExpAtom(pattern)
  ---*/

  const __pattern = /./i;
  const __re = createNewRegExpAtom(__pattern);

  assert.sameValue(
    __re.source,
    __pattern.source,
    'The value of __re.source is expected to equal the value of __pattern.source',
  );

  assert.sameValue(
    __re.multiline,
    __pattern.multiline,
    'The value of __re.multiline is expected to equal the value of __pattern.multiline',
  );

  assert.sameValue(
    __re.global,
    __pattern.global,
    'The value of __re.global is expected to equal the value of __pattern.global',
  );

  assert.sameValue(
    __re.ignoreCase,
    __pattern.ignoreCase,
    'The value of __re.ignoreCase is expected to equal the value of __pattern.ignoreCase',
  );
});
// file S15.10.4.1_A1_T2.js
Deno.test('RegExp: S15.10.4.1_A1_T2.js', () => {
  /*---
info: |
    If pattern is an object R whose [[Class]] property is "RegExp" and flags is undefined, then let P be
    the pattern used to construct R and let F be the flags used to construct R
    Pattern is /\t/m and RegExp is createNewRegExpAtom(pattern,x), where x is
    undefined variable
  ---*/

  const __pattern = /\t/m;
  const __re = createNewRegExpAtom(__pattern, x);

  assert.sameValue(
    __re.source,
    __pattern.source,
    'The value of __re.source is expected to equal the value of __pattern.source',
  );

  assert.sameValue(
    __re.multiline,
    __pattern.multiline,
    'The value of __re.multiline is expected to equal the value of __pattern.multiline',
  );

  assert.sameValue(
    __re.global,
    __pattern.global,
    'The value of __re.global is expected to equal the value of __pattern.global',
  );

  assert.sameValue(
    __re.ignoreCase,
    __pattern.ignoreCase,
    'The value of __re.ignoreCase is expected to equal the value of __pattern.ignoreCase',
  );

  const x;
});
// file S15.10.4.1_A1_T3.js
Deno.test('RegExp: S15.10.4.1_A1_T3.js', () => {
  /*---
info: |
    If pattern is an object R whose [[Class]] property is "RegExp" and flags is undefined, then let P be
    the pattern used to construct R and let F be the flags used to construct R
description: Pattern is /[a-b]/g and RegExp is createNewRegExpAtom(pattern,void 0)
  ---*/

  const __pattern = /[a-b]/g;
  const __re = createNewRegExpAtom(__pattern, void 0);

  assert.sameValue(
    __re.source,
    __pattern.source,
    'The value of __re.source is expected to equal the value of __pattern.source',
  );

  assert.sameValue(
    __re.multiline,
    __pattern.multiline,
    'The value of __re.multiline is expected to equal the value of __pattern.multiline',
  );

  assert.sameValue(
    __re.global,
    __pattern.global,
    'The value of __re.global is expected to equal the value of __pattern.global',
  );

  assert.sameValue(
    __re.ignoreCase,
    __pattern.ignoreCase,
    'The value of __re.ignoreCase is expected to equal the value of __pattern.ignoreCase',
  );
});
// file S15.10.4.1_A1_T4.js
Deno.test('RegExp: S15.10.4.1_A1_T4.js', () => {
  /*---
info: |
    If pattern is an object R whose [[Class]] property is "RegExp" and flags is undefined, then let P be
    the pattern used to construct R and let F be the flags used to construct R
description: Pattern is createNewRegExpAtom and RegExp is createNewRegExpAtom(pattern,undefined)
  ---*/

  const __pattern = createNewRegExpAtom();
  const __re = createNewRegExpAtom(__pattern, undefined);

  assert.sameValue(
    __re.source,
    __pattern.source,
    'The value of __re.source is expected to equal the value of __pattern.source',
  );

  assert.sameValue(
    __re.multiline,
    __pattern.multiline,
    'The value of __re.multiline is expected to equal the value of __pattern.multiline',
  );

  assert.sameValue(
    __re.global,
    __pattern.global,
    'The value of __re.global is expected to equal the value of __pattern.global',
  );

  assert.sameValue(
    __re.ignoreCase,
    __pattern.ignoreCase,
    'The value of __re.ignoreCase is expected to equal the value of __pattern.ignoreCase',
  );
});
// file S15.10.4.1_A1_T5.js
Deno.test('RegExp: S15.10.4.1_A1_T5.js', () => {
  /*---
info: |
    If pattern is an object R whose [[Class]] property is "RegExp" and flags is undefined, then let P be
    the pattern used to construct R and let F be the flags used to construct R
    Pattern is RegExp("1?","mig") and RegExp is new
    RegExp(pattern,(function(){})())
  ---*/

  const __pattern = RegExp('1?', 'mig');
  const __re = createNewRegExpAtom(__pattern, (function () {})());

  assert.sameValue(
    __re.source,
    __pattern.source,
    'The value of __re.source is expected to equal the value of __pattern.source',
  );

  assert.sameValue(
    __re.multiline,
    __pattern.multiline,
    'The value of __re.multiline is expected to equal the value of __pattern.multiline',
  );

  assert.sameValue(
    __re.global,
    __pattern.global,
    'The value of __re.global is expected to equal the value of __pattern.global',
  );

  assert.sameValue(
    __re.ignoreCase,
    __pattern.ignoreCase,
    'The value of __re.ignoreCase is expected to equal the value of __pattern.ignoreCase',
  );
});
// file S15.10.4.1_A2_T1.js
Deno.test('RegExp: S15.10.4.1_A2_T1.js', () => {
  /*---
info: |
    pattern is an object R whose [[Class]] property is "RegExp" and flags
    is not undefined
    Checking if execution of "createNewRegExpAtom(pattern, "i")", where the
    pattern is "/\u0042/i", does not fail
  ---*/

  const regExpObj = createNewRegExpAtom(/\u0042/i, 'i');
  assert(regExpObj.ignoreCase);
});
// file S15.10.4.1_A2_T2.js
Deno.test('RegExp: S15.10.4.1_A2_T2.js', () => {
  /*---
info: |
    pattern is an object R whose [[Class]] property is "RegExp" and flags
    is not undefined. If ToString(pattern) is not a valid flags arguments,
    then throw a SyntaxError exception
    Checking if execution of "createNewRegExpAtom(pattern, {})", where the
    pattern is "/1?1/mig", fails
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom(/1?1/mig, {}) throw SyntaxError. Actual: ' + (createNewRegExpAtom(/1?1/mig, {})),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.4.1_A3_T1.js
Deno.test('RegExp: S15.10.4.1_A3_T1.js', () => {
  /*---
info: let P be the empty string if pattern is undefined
description: RegExp is createNewRegExpAtom
  ---*/

  const __re = createNewRegExpAtom();

  assert.sameValue(__re.multiline, false, 'The value of __re.multiline is expected to be false');
  assert.sameValue(__re.global, false, 'The value of __re.global is expected to be false');
  assert.sameValue(__re.ignoreCase, false, 'The value of __re.ignoreCase is expected to be false');
});
// file S15.10.4.1_A3_T2.js
Deno.test('RegExp: S15.10.4.1_A3_T2.js', () => {
  /*---
info: let P be the empty string if pattern is undefined
description: RegExp is createNewRegExpAtom(void 0)
  ---*/

  const __re = createNewRegExpAtom(void 0);

  assert.sameValue(__re.multiline, false, 'The value of __re.multiline is expected to be false');
  assert.sameValue(__re.global, false, 'The value of __re.global is expected to be false');
  assert.sameValue(__re.ignoreCase, false, 'The value of __re.ignoreCase is expected to be false');
});
// file S15.10.4.1_A3_T3.js
Deno.test('RegExp: S15.10.4.1_A3_T3.js', () => {
  /*---
info: let P be the empty string if pattern is undefined
description: RegExp is createNewRegExpAtom(x), where x is undefined variable
  ---*/

  const __re = createNewRegExpAtom(x);

  assert.sameValue(__re.multiline, false, 'The value of __re.multiline is expected to be false');
  assert.sameValue(__re.global, false, 'The value of __re.global is expected to be false');
  assert.sameValue(__re.ignoreCase, false, 'The value of __re.ignoreCase is expected to be false');

  const x;
});
// file S15.10.4.1_A3_T4.js
Deno.test('RegExp: S15.10.4.1_A3_T4.js', () => {
  /*---
info: let P be the empty string if pattern is undefined
description: RegExp is createNewRegExpAtom(undefined)
  ---*/

  const __re = createNewRegExpAtom(undefined);

  assert.sameValue(__re.multiline, false, 'The value of __re.multiline is expected to be false');
  assert.sameValue(__re.global, false, 'The value of __re.global is expected to be false');
  assert.sameValue(__re.ignoreCase, false, 'The value of __re.ignoreCase is expected to be false');
});
// file S15.10.4.1_A3_T5.js
Deno.test('RegExp: S15.10.4.1_A3_T5.js', () => {
  /*---
info: let P be the empty string if pattern is undefined
description: RegExp is createNewRegExpAtom((function(){})())
  ---*/

  const __re = createNewRegExpAtom((function () {})());

  assert.sameValue(__re.multiline, false, 'The value of __re.multiline is expected to be false');
  assert.sameValue(__re.global, false, 'The value of __re.global is expected to be false');
  assert.sameValue(__re.ignoreCase, false, 'The value of __re.ignoreCase is expected to be false');
});
// file S15.10.4.1_A4_T1.js
Deno.test('RegExp: S15.10.4.1_A4_T1.js', () => {
  /*---
info: let F be the empty string if flags is undefined
description: RegExp is createNewRegExpAtom(undefined)
  ---*/

  const __re = createNewRegExpAtom(null, void 0);

  assert.sameValue(__re.source, 'null', 'The value of __re.source is expected to be "null"');
  assert.sameValue(__re.multiline, false, 'The value of __re.multiline is expected to be false');
  assert.sameValue(__re.global, false, 'The value of __re.global is expected to be false');
  assert.sameValue(__re.ignoreCase, false, 'The value of __re.ignoreCase is expected to be false');
});
// file S15.10.4.1_A4_T2.js
Deno.test('RegExp: S15.10.4.1_A4_T2.js', () => {
  /*---
info: let F be the empty string if flags is undefined
description: RegExp is createNewRegExpAtom(undefined,undefined)
  ---*/

  const __re = createNewRegExpAtom(undefined, undefined);

  assert.sameValue(__re.multiline, false, 'The value of __re.multiline is expected to be false');
  assert.sameValue(__re.global, false, 'The value of __re.global is expected to be false');
  assert.sameValue(__re.ignoreCase, false, 'The value of __re.ignoreCase is expected to be false');
});
// file S15.10.4.1_A4_T3.js
Deno.test('RegExp: S15.10.4.1_A4_T3.js', () => {
  /*---
info: let F be the empty string if flags is undefined
description: Use undefined properties of object as flags of RegExp
  ---*/

  const __re = createNewRegExpAtom({}.p, {}.q);

  assert.sameValue(__re.multiline, false, 'The value of __re.multiline is expected to be false');
  assert.sameValue(__re.global, false, 'The value of __re.global is expected to be false');
  assert.sameValue(__re.ignoreCase, false, 'The value of __re.ignoreCase is expected to be false');
});
// file S15.10.4.1_A4_T4.js
Deno.test('RegExp: S15.10.4.1_A4_T4.js', () => {
  /*---
info: let F be the empty string if flags is undefined
description: RegExp is createNewRegExpAtom(null,void 0)
  ---*/

  const __re = createNewRegExpAtom(null, void 0);

  assert.sameValue(__re.source, 'null', 'The value of __re.source is expected to be "null"');
  assert.sameValue(__re.multiline, false, 'The value of __re.multiline is expected to be false');
  assert.sameValue(__re.global, false, 'The value of __re.global is expected to be false');
  assert.sameValue(__re.ignoreCase, false, 'The value of __re.ignoreCase is expected to be false');
});
// file S15.10.4.1_A4_T5.js
Deno.test('RegExp: S15.10.4.1_A4_T5.js', () => {
  /*---
info: let F be the empty string if flags is undefined
description: RegExp is createNewRegExpAtom("",(function(){})())
  ---*/

  const __re = createNewRegExpAtom('', (function () {})());

  assert.sameValue(__re.multiline, false, 'The value of __re.multiline is expected to be false');
  assert.sameValue(__re.global, false, 'The value of __re.global is expected to be false');
  assert.sameValue(__re.ignoreCase, false, 'The value of __re.ignoreCase is expected to be false');
});
// file S15.10.4.1_A5_T1.js
Deno.test('RegExp: S15.10.4.1_A5_T1.js', () => {
  /*---
info: |
    If F contains any character other than 'g', 'i', or 'm', or if it
    contains the same one more than once, then throw a SyntaxError exception
description: Checking if using "ii" as F leads to throwing the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom(undefined,"ii") throw SyntaxError. Actual: ' + (createNewRegExpAtom(undefined, 'ii')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.4.1_A5_T3.js
Deno.test('RegExp: S15.10.4.1_A5_T3.js', () => {
  /*---
info: |
    If F contains any character other than 'g', 'i', or 'm', or if it
    contains the same one more than once, then throw a SyntaxError exception
description: Checking by using eval, try to use eval("\"migr\"") as F
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom("",eval("\\"migr\\"")) throw SyntaxError. Actual: ' +
        (createNewRegExpAtom('', eval('"migr"'))),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.4.1_A5_T4.js
Deno.test('RegExp: S15.10.4.1_A5_T4.js', () => {
  /*---
info: |
    If F contains any character other than 'g', 'i', or 'm', or if it
    contains the same one more than once, then throw a SyntaxError exception
description: Checking if using "z" as F leads to throwing the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom("a|b","z") throw SyntaxError. Actual: ' + (createNewRegExpAtom('a|b', 'z')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.4.1_A5_T6.js
Deno.test('RegExp: S15.10.4.1_A5_T6.js', () => {
  /*---
info: |
    If F contains any character other than 'g', 'i', or 'm', or if it
    contains the same one more than once, then throw a SyntaxError exception
    Checking if using "null" as F leads to throwing the correct
    exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom(".",null) throw SyntaxError. Actual: ' + (createNewRegExpAtom('.', null)),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.4.1_A5_T7.js
Deno.test('RegExp: S15.10.4.1_A5_T7.js', () => {
  /*---
info: |
    If F contains any character other than 'g', 'i', or 'm', or if it
    contains the same one more than once, then throw a SyntaxError exception
description: Checking if using 1.0 as F leads to throwing the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom("^",1.0) throw SyntaxError. Actual: ' + (createNewRegExpAtom('^', 1.0)),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.4.1_A5_T8.js
Deno.test('RegExp: S15.10.4.1_A5_T8.js', () => {
  /*---
info: |
    If F contains any character other than 'g', 'i', or 'm', or if it
    contains the same one more than once, then throw a SyntaxError exception
    Checking if using "true" as F leads to throwing the correct
    exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom("|",true) throw SyntaxError. Actual: ' + (createNewRegExpAtom('|', true)),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.4.1_A5_T9.js
Deno.test('RegExp: S15.10.4.1_A5_T9.js', () => {
  /*---
info: |
    If F contains any character other than 'g', 'i', or 'm', or if it
    contains the same one more than once, then throw a SyntaxError exception
    Checking if using "{toString:function(){}}" as F leads to throwing
    the correct exception
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom("$sup",{toString:function(){}}) throw SyntaxError. Actual: ' +
        (createNewRegExpAtom('$sup', { toString: function () {} })),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.4.1_A6_T1.js
Deno.test('RegExp: S15.10.4.1_A6_T1.js', () => {
  /*---
info: The [[Class]] property of the newly constructed object is set to "RegExp"
description: Checking [[Class]] property of the newly constructed object
  ---*/

  const __re = createNewRegExpAtom();
  __re.toString = Object.prototype.toString;

  assert.sameValue(__re.toString(), '[object ' + 'RegExp' + ']', '__re.toString() must return "[object "+"RegExp"+"]"');
});
// file S15.10.4.1_A7_T1.js
Deno.test('RegExp: S15.10.4.1_A7_T1.js', () => {
  /*---
info: |
    The [[Prototype]] property of the newly constructed object is set to the
    original RegExp prototype object, the one that is the initial value of
    RegExp.prototype
    Add new property to [[Prototype]] of REgExp and check this
    property of the newly constructed object
  ---*/

  const __re = createNewRegExpAtom();
  RegExp.prototype.indicator = 1;

  assert.sameValue(__re.indicator, 1, 'The value of __re.indicator is expected to be 1');
});
// file S15.10.4.1_A7_T2.js
Deno.test('RegExp: S15.10.4.1_A7_T2.js', () => {
  /*---
info: |
    The [[Prototype]] property of the newly constructed object is set to the
    original RegExp prototype object, the one that is the initial value of
    RegExp.prototype
description: Checking [[Prototype]] property of the newly constructed object
  ---*/

  const __re = createNewRegExpAtom();

  assert.sameValue(
    RegExp.prototype.isPrototypeOf(__re),
    true,
    'RegExp.prototype.isPrototypeOf(createNewRegExpAtom()) must return true',
  );
});
// file S15.10.4.1_A8_T10.js
Deno.test('RegExp: S15.10.4.1_A8_T10.js', () => {
  /*---
info: let P be ToString(pattern) and let F be ToString(flags)
description: Pattern is true and flags is "m"
  ---*/

  const __re = createNewRegExpAtom(true, 'm');

  assert.sameValue(__re.ignoreCase, false, 'The value of __re.ignoreCase is expected to be false');
  assert.sameValue(__re.multiline, true, 'The value of __re.multiline is expected to be true');
  assert.sameValue(__re.global, false, 'The value of __re.global is expected to be false');
  assert.sameValue(__re.lastIndex, 0, 'The value of __re.lastIndex is expected to be 0');
  assert.notSameValue(typeof __re.source, 'undefined', 'The value of typeof __re.source is not "undefined"');
});
// file S15.10.4.1_A8_T11.js
Deno.test('RegExp: S15.10.4.1_A8_T11.js', () => {
  /*---
info: let P be ToString(pattern) and let F be ToString(flags)
description: Checking by using eval, pattern is Math and flags is eval("\"g\"")
  ---*/

  const __re = createNewRegExpAtom(Math, eval('"g"'));

  assert.sameValue(__re.ignoreCase, false, 'The value of __re.ignoreCase is expected to be false');
  assert.sameValue(__re.multiline, false, 'The value of __re.multiline is expected to be false');
  assert.sameValue(__re.global, true, 'The value of __re.global is expected to be true');
  assert.sameValue(__re.lastIndex, 0, 'The value of __re.lastIndex is expected to be 0');
  assert.notSameValue(typeof __re.source, 'undefined', 'The value of typeof __re.source is not "undefined"');
});
// file S15.10.4.1_A8_T12.js
Deno.test('RegExp: S15.10.4.1_A8_T12.js', () => {
  /*---
info: let P be ToString(pattern) and let F be ToString(flags)
    Pattern is "\u0042" and flags is {toString:void 0,
    valueOf:function(){throw "invalof";} }
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom("\\u0042", {toString:void 0, valueOf:function(){throw "invalof";}}) throw "invalof". Actual: ' +
        (createNewRegExpAtom('\u0042', {
          toString: void 0,
          valueOf: function () {
            throw 'invalof';
          },
        })),
    );
  } catch (e) {
    assert.sameValue(e, 'invalof', 'The value of e is expected to be "invalof"');
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.4.1_A8_T13.js
Deno.test('RegExp: S15.10.4.1_A8_T13.js', () => {
  /*---
info: let P be ToString(pattern) and let F be ToString(flags)
    Pattern is "1" and flags is {toString:function(){throw "intostr";}
    }
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom("1", {toString:function(){throw "intostr";}}) throw "intostr". Actual: ' +
        (createNewRegExpAtom('1', {
          toString: function () {
            throw 'intostr';
          },
        })),
    );
  } catch (e) {
    assert.sameValue(e, 'intostr', 'The value of e is expected to be "intostr"');
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.4.1_A8_T1.js
Deno.test('RegExp: S15.10.4.1_A8_T1.js', () => {
  /*---
info: let P be ToString(pattern) and let F be ToString(flags)
description: Pattern is "a|b" and flags is "i"
  ---*/

  const __re = createNewRegExpAtom('a|b', 'i');

  assert.sameValue(__re.ignoreCase, true, 'The value of __re.ignoreCase is expected to be true');
  assert.sameValue(__re.multiline, false, 'The value of __re.multiline is expected to be false');
  assert.sameValue(__re.global, false, 'The value of __re.global is expected to be false');
  assert.sameValue(__re.lastIndex, 0, 'The value of __re.lastIndex is expected to be 0');
  assert.notSameValue(typeof __re.source, 'undefined', 'The value of typeof __re.source is not "undefined"');
});
// file S15.10.4.1_A8_T2.js
Deno.test('RegExp: S15.10.4.1_A8_T2.js', () => {
  /*---
info: let P be ToString(pattern) and let F be ToString(flags)
description: Pattern is function(){return "a|b|[]";}() and flags is "ig"
  ---*/

  const __re = createNewRegExpAtom(
    function () {
      return 'a|b|[]';
    }(),
    'ig',
  );

  assert.sameValue(__re.ignoreCase, true, 'The value of __re.ignoreCase is expected to be true');
  assert.sameValue(__re.multiline, false, 'The value of __re.multiline is expected to be false');
  assert.sameValue(__re.global, true, 'The value of __re.global is expected to be true');
  assert.sameValue(__re.lastIndex, 0, 'The value of __re.lastIndex is expected to be 0');
  assert.notSameValue(typeof __re.source, 'undefined', 'The value of typeof __re.source is not "undefined"');
});
// file S15.10.4.1_A8_T3.js
Deno.test('RegExp: S15.10.4.1_A8_T3.js', () => {
  /*---
info: let P be ToString(pattern) and let F be ToString(flags)
    Pattern is {toString:function(){return "[0-9]";}} and flags is
    (function(){return "m";})()
  ---*/

  const __re = createNewRegExpAtom(
    {
      toString: function () {
        return '[0-9]';
      },
    },
    (function () {
      return 'm';
    })(),
  );

  assert.sameValue(__re.ignoreCase, false, 'The value of __re.ignoreCase is expected to be false');
  assert.sameValue(__re.multiline, true, 'The value of __re.multiline is expected to be true');
  assert.sameValue(__re.global, false, 'The value of __re.global is expected to be false');
  assert.sameValue(__re.lastIndex, 0, 'The value of __re.lastIndex is expected to be 0');
  assert.notSameValue(typeof __re.source, 'undefined', 'The value of typeof __re.source is not "undefined"');
});
// file S15.10.4.1_A8_T4.js
Deno.test('RegExp: S15.10.4.1_A8_T4.js', () => {
  /*---
info: let P be ToString(pattern) and let F be ToString(flags)
    Pattern is {toString:void 0,valueOf:function(){return "[z-z]";}}
    and flags is {toString:void 0,valueOf:function(){return "mig";}}
  ---*/

  const __re = createNewRegExpAtom({
    toString: void 0,
    valueOf: function () {
      return '[z-z]';
    },
  }, {
    toString: void 0,
    valueOf: function () {
      return 'mig';
    },
  });

  assert.sameValue(__re.ignoreCase, true, 'The value of __re.ignoreCase is expected to be true');
  assert.sameValue(__re.multiline, true, 'The value of __re.multiline is expected to be true');
  assert.sameValue(__re.global, true, 'The value of __re.global is expected to be true');
  assert.sameValue(__re.lastIndex, 0, 'The value of __re.lastIndex is expected to be 0');
  assert.notSameValue(typeof __re.source, 'undefined', 'The value of typeof __re.source is not "undefined"');
});
// file S15.10.4.1_A8_T5.js
Deno.test('RegExp: S15.10.4.1_A8_T5.js', () => {
  /*---
info: let P be ToString(pattern) and let F be ToString(flags)
    Pattern is new Object("abc{1}") and flags is
    {toString:function(){return "";}}
  ---*/

  const __re = createNewRegExpAtom(new Object('abc{1}'), {
    toString: function () {
      return '';
    },
  });

  assert.sameValue(__re.ignoreCase, false, 'The value of __re.ignoreCase is expected to be false');
  assert.sameValue(__re.multiline, false, 'The value of __re.multiline is expected to be false');
  assert.sameValue(__re.global, false, 'The value of __re.global is expected to be false');
  assert.sameValue(__re.lastIndex, 0, 'The value of __re.lastIndex is expected to be 0');
  assert.notSameValue(typeof __re.source, 'undefined', 'The value of typeof __re.source is not "undefined"');
});
// file S15.10.4.1_A8_T6.js
Deno.test('RegExp: S15.10.4.1_A8_T6.js', () => {
  /*---
info: let P be ToString(pattern) and let F be ToString(flags)
    Pattern is {toString:function(){throw "intostr";} } and flags is
    "i"
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom({toString:function(){throw "intostr";}}, "i") throw "intostr". Actual: ' +
        (createNewRegExpAtom({
          toString: function () {
            throw 'intostr';
          },
        }, 'i')),
    );
  } catch (e) {
    assert.sameValue(e, 'intostr', 'The value of e is expected to be "intostr"');
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.4.1_A8_T7.js
Deno.test('RegExp: S15.10.4.1_A8_T7.js', () => {
  /*---
info: let P be ToString(pattern) and let F be ToString(flags)
    Pattern is {toString:void 0, valueOf:function(){throw "invalof";}
    } and flags is "i"
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom({toString:void 0, valueOf:function(){throw "invalof";}}) throw "invalof". Actual: ' +
        (createNewRegExpAtom({
          toString: void 0,
          valueOf: function () {
            throw 'invalof';
          },
        })),
    );
  } catch (e) {
    assert.sameValue(e, 'invalof', 'The value of e is expected to be "invalof"');
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.4.1_A8_T8.js
Deno.test('RegExp: S15.10.4.1_A8_T8.js', () => {
  /*---
info: let P be ToString(pattern) and let F be ToString(flags)
    Pattern is {toString:function(){throw "intostr";} } and flags is
    "error"
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom({toString:function(){throw "intostr";}}, "error") throw "intostr". Actual: ' +
        (createNewRegExpAtom({
          toString: function () {
            throw 'intostr';
          },
        }, 'error')),
    );
  } catch (e) {
    assert.sameValue(e, 'intostr', 'The value of e is expected to be "intostr"');
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.4.1_A8_T9.js
Deno.test('RegExp: S15.10.4.1_A8_T9.js', () => {
  /*---
info: let P be ToString(pattern) and let F be ToString(flags)
description: Pattern is 1 and flags is new Object("gi")
  ---*/

  const __re = createNewRegExpAtom(1, new Object('gi'));

  assert.sameValue(__re.ignoreCase, true, 'The value of __re.ignoreCase is expected to be true');
  assert.sameValue(__re.multiline, false, 'The value of __re.multiline is expected to be false');
  assert.sameValue(__re.global, true, 'The value of __re.global is expected to be true');
  assert.sameValue(__re.lastIndex, 0, 'The value of __re.lastIndex is expected to be 0');
  assert.notSameValue(typeof __re.source, 'undefined', 'The value of typeof __re.source is not "undefined"');
});
// file S15.10.4.1_A9_T1.js
Deno.test('RegExp: S15.10.4.1_A9_T1.js', () => {
  /*---
info: |
    If P's characters do not have the form Pattern, then throw a SyntaxError
    exception
description: Pattern is "??"
  ---*/

  try {
    throw new Test262Error('#1.1: createNewRegExpAtom("??") throw SyntaxError. Actual: ' + (createNewRegExpAtom('??')));
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.4.1_A9_T2.js
Deno.test('RegExp: S15.10.4.1_A9_T2.js', () => {
  /*---
info: |
    If P's characters do not have the form Pattern, then throw a SyntaxError
    exception
description: Pattern is "[{-z]"
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom("[{-z]") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[{-z]')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.4.1_A9_T3.js
Deno.test('RegExp: S15.10.4.1_A9_T3.js', () => {
  /*---
info: |
    If P's characters do not have the form Pattern, then throw a SyntaxError
    exception
description: Pattern is "[a--z]"
  ---*/

  try {
    throw new Test262Error(
      '#1.1: createNewRegExpAtom("[a--z]") throw SyntaxError. Actual: ' + (createNewRegExpAtom('[a--z]')),
    );
  } catch (e) {
    assert.sameValue(
      e instanceof SyntaxError,
      true,
      'The result of evaluating (e instanceof SyntaxError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.5_A1.js
Deno.test('RegExp: S15.10.5_A1.js', () => {
  /*---
info: RegExp constructor has length property whose value is 2
description: Checking RegExp.length property
  ---*/
  assert.sameValue(RegExp.length, 2, 'The value of RegExp.length is expected to be 2');
});
// file S15.10.5_A2_T1.js
Deno.test('RegExp: S15.10.5_A2_T1.js', () => {
  /*---
info: |
    The value of the internal [[Prototype]] property of the RegExp
    constructor is the Function prototype object
description: Checking Function.prototype.isPrototypeOf(RegExp)
  ---*/
  assert.sameValue(
    Function.prototype.isPrototypeOf(RegExp),
    true,
    'Function.prototype.isPrototypeOf(RegExp) must return true',
  );
});
// file S15.10.5_A2_T2.js
Deno.test('RegExp: S15.10.5_A2_T2.js', () => {
  /*---
info: |
    The value of the internal [[Prototype]] property of the RegExp
    constructor is the Function prototype object
    Add new property to Function.prototype and then check this
    property of RegExp
  ---*/

  Function.prototype.indicator = 1;

  assert.sameValue(RegExp.indicator, 1, 'The value of RegExp.indicator is expected to be 1');
});
// file S15.10.7_A1_T1.js
Deno.test('RegExp: S15.10.7_A1_T1.js', () => {
  /*---
info: RegExp instance has no [[Call]] internal method
description: Checking if call of RegExp instance fails
  ---*/

  try {
    throw new Test262Error('#1.1: /[^a]*/() throw TypeError. Actual: ' + (/[^a]*/()));
  } catch (e) {
    assert.sameValue(
      e instanceof TypeError,
      true,
      'The result of evaluating (e instanceof TypeError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.7_A1_T2.js
Deno.test('RegExp: S15.10.7_A1_T2.js', () => {
  /*---
info: RegExp instance has no [[Call]] internal method
description: Checking if call of RegExp("a|b","g")() fails
  ---*/

  try {
    throw new Test262Error('#1.1: RegExp("a|b","g")() throw TypeError. Actual: ' + (RegExp('a|b', 'g')()));
  } catch (e) {
    assert.sameValue(
      e instanceof TypeError,
      true,
      'The result of evaluating (e instanceof TypeError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.7_A2_T1.js
Deno.test('RegExp: S15.10.7_A2_T1.js', () => {
  /*---
info: RegExp instance has no [[Construct]] internal method
description: Checking if creating createNewRegExpAtom instance fails
  ---*/

  try {
    throw new Test262Error('#1.1: new /z/() throw TypeError. Actual: ' + (new /z/()));
  } catch (e) {
    assert.sameValue(
      e instanceof TypeError,
      true,
      'The result of evaluating (e instanceof TypeError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.7_A2_T2.js
Deno.test('RegExp: S15.10.7_A2_T2.js', () => {
  /*---
info: RegExp instance has no [[Construct]] internal method
description: Checking if creating "createNewRegExpAtom" instance fails
  ---*/

  try {
    throw new Test262Error('#1.1: new createNewRegExpAtom throw TypeError. Actual: ' + (new createNewRegExpAtom()()));
  } catch (e) {
    assert.sameValue(
      e instanceof TypeError,
      true,
      'The result of evaluating (e instanceof TypeError) is expected to be true',
    );
  }

  // TODO: Convert to assert.throws() format.
});
// file S15.10.7_A3_T1.js
Deno.test('RegExp: S15.10.7_A3_T1.js', () => {
  /*---
info: RegExp instance type is RegExp
    Checking type of RegExp instance with operators typeof, instanceof
    and check it constructor.  RegExp instance is /[^a]* /
  ---*/

  const __re = /[^a]*/;

  assert.sameValue(typeof __re, 'object', 'The value of `typeof __re` is expected to be "object"');
  assert.sameValue(__re.constructor, RegExp, 'The value of __re.constructor is expected to equal the value of RegExp');

  assert.sameValue(
    __re instanceof RegExp,
    true,
    'The result of evaluating (__re instanceof RegExp) is expected to be true',
  );
});
// file S15.10.7_A3_T2.js
Deno.test('RegExp: S15.10.7_A3_T2.js', () => {
  /*---
info: RegExp instance type is RegExp
    Checking type of RegExp instance with operators typeof, instanceof
    and check it constructor.  RegExp instance is createNewRegExpAtom
  ---*/

  const __re = createNewRegExpAtom();

  assert.sameValue(typeof __re, 'object', 'The value of `typeof __re` is expected to be "object"');
  assert.sameValue(__re.constructor, RegExp, 'The value of __re.constructor is expected to equal the value of RegExp');

  assert.sameValue(
    __re instanceof RegExp,
    true,
    'The result of evaluating (__re instanceof RegExp) is expected to be true',
  );
});
// file syntax-err-arithmetic-modifiers-add-remove-i.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-add-remove-i.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the any code point in the source text matched by the first RegularExpressionFlags is also contained in the source text matched by the second RegularExpressionFlags. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?i-i:a)', '');
  }, 'RegExp("(?i-i:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-add-remove-m.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-add-remove-m.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the any code point in the source text matched by the first RegularExpressionFlags is also contained in the source text matched by the second RegularExpressionFlags. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?m-m:a)', '');
  }, 'RegExp("(?m-m:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-add-remove-multi-duplicate.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-add-remove-multi-duplicate.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the any code point in the source text matched by the first RegularExpressionFlags is also contained in the source text matched by the second RegularExpressionFlags. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?ims-m:a)', '');
  }, 'RegExp("(?ims-m:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-add-remove-s-escape.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-add-remove-s-escape.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the any code point in the source text matched by the first RegularExpressionFlags is also contained in the source text matched by the second RegularExpressionFlags. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?\u{0073}-s:a)', '');
  }, 'RegExp("(?\u{0073}-s:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-add-remove-s.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-add-remove-s.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the any code point in the source text matched by the first RegularExpressionFlags is also contained in the source text matched by the second RegularExpressionFlags. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?s-s:a)', '');
  }, 'RegExp("(?s-s:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-both-empty.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-both-empty.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by the first RegularExpressionFlags and the source text matched by the second RegularExpressionFlags are both empty. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?-:a)', '');
  }, 'RegExp("(?-:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-code-point-repeat-i-1.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-code-point-repeat-i-1.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?-ii:a)', '');
  }, 'RegExp("(?-ii:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-code-point-repeat-i-2.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-code-point-repeat-i-2.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?-imsi:a)', '');
  }, 'RegExp("(?-imsi:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-other-code-point-arbitrary.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-other-code-point-arbitrary.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?-1:a)', '');
  }, 'RegExp("(?-1:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-other-code-point-combining-i.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-other-code-point-combining-i.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?-iͥ:a)', '');
  }, 'RegExp("(?-iͥ:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-other-code-point-combining-m.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-other-code-point-combining-m.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?-mͫ:a)', '');
  }, 'RegExp("(?-mͫ:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-other-code-point-combining-s.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-other-code-point-combining-s.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?-s̀:a)', '');
  }, 'RegExp("(?-s̀:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-other-code-point-d.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-other-code-point-d.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?-d:a)', '');
  }, 'RegExp("(?-d:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-other-code-point-g.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-other-code-point-g.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?-g:a)', '');
  }, 'RegExp("(?-g:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-other-code-point-non-display-1.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-other-code-point-non-display-1.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?-s :a)', '');
  }, 'RegExp("(?-s :a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-other-code-point-non-display-2.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-other-code-point-non-display-2.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?-s‎:a)', '');
  }, 'RegExp("(?-s‎:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-other-code-point-non-flag.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-other-code-point-non-flag.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?-Q:a)', '');
  }, 'RegExp("(?-Q:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-other-code-point-u.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-other-code-point-u.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?-u:a)', '');
  }, 'RegExp("(?-u:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-other-code-point-uppercase-I.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-other-code-point-uppercase-I.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?-I:a)', '');
  }, 'RegExp("(?-I:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-other-code-point-y.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-other-code-point-y.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?-y:a)', '');
  }, 'RegExp("(?-y:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-other-code-point-zwj.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-other-code-point-zwj.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?-s‍:a)', '');
  }, 'RegExp("(?-s‍:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-other-code-point-zwnbsp.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-other-code-point-zwnbsp.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?-s﻿:a)', '');
  }, 'RegExp("(?-s﻿:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-other-code-point-zwnj.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-other-code-point-zwnj.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?-s‌:a)', '');
  }, 'RegExp("(?-s‌:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-reverse-add-remove-i.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-add-remove-i.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the any code point in the source text matched by the first RegularExpressionFlags is also contained in the source text matched by the second RegularExpressionFlags. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?i-i:a)', '');
  }, 'RegExp("(?i-i:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-reverse-add-remove-m.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-add-remove-m.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the any code point in the source text matched by the first RegularExpressionFlags is also contained in the source text matched by the second RegularExpressionFlags. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?m-m:a)', '');
  }, 'RegExp("(?m-m:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-reverse-add-remove-multi-duplicate.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-add-remove-multi-duplicate.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the any code point in the source text matched by the first RegularExpressionFlags is also contained in the source text matched by the second RegularExpressionFlags. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?m-ims:a)', '');
  }, 'RegExp("(?m-ims:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-reverse-add-remove-s-escape.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-add-remove-s-escape.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the any code point in the source text matched by the first RegularExpressionFlags is also contained in the source text matched by the second RegularExpressionFlags. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?s-\u{0073}:a)', '');
  }, 'RegExp("(?s-\u{0073}:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-reverse-add-remove-s.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-add-remove-s.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the any code point in the source text matched by the first RegularExpressionFlags is also contained in the source text matched by the second RegularExpressionFlags. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?s-s:a)', '');
  }, 'RegExp("(?s-s:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-reverse-code-point-repeat-i-1.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-code-point-repeat-i-1.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?ii-:a)', '');
  }, 'RegExp("(?ii-:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-reverse-code-point-repeat-i-2.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-code-point-repeat-i-2.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?imsi-:a)', '');
  }, 'RegExp("(?imsi-:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-reverse-other-code-point-arbitrary.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-other-code-point-arbitrary.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?1-:a)', '');
  }, 'RegExp("(?1-:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-reverse-other-code-point-combining-i.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-other-code-point-combining-i.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?iͥ-:a)', '');
  }, 'RegExp("(?iͥ-:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-reverse-other-code-point-combining-m.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-other-code-point-combining-m.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?mͫ-:a)', '');
  }, 'RegExp("(?mͫ-:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-reverse-other-code-point-combining-s.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-other-code-point-combining-s.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?s̀-:a)', '');
  }, 'RegExp("(?s̀-:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-reverse-other-code-point-d.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-other-code-point-d.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?d-:a)', '');
  }, 'RegExp("(?d-:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-reverse-other-code-point-g.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-other-code-point-g.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?g-:a)', '');
  }, 'RegExp("(?g-:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-reverse-other-code-point-non-display-1.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-other-code-point-non-display-1.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?s -:a)', '');
  }, 'RegExp("(?s -:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-reverse-other-code-point-non-display-2.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-other-code-point-non-display-2.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?s‎-:a)', '');
  }, 'RegExp("(?s‎-:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-reverse-other-code-point-non-flag.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-other-code-point-non-flag.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?Q-:a)', '');
  }, 'RegExp("(?Q-:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-reverse-other-code-point-u.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-other-code-point-u.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?u-:a)', '');
  }, 'RegExp("(?u-:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-reverse-other-code-point-uppercase-I.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-other-code-point-uppercase-I.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?I-:a)', '');
  }, 'RegExp("(?I-:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-reverse-other-code-point-y.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-other-code-point-y.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?y-:a)', '');
  }, 'RegExp("(?y-:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-reverse-other-code-point-zwj.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-other-code-point-zwj.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?s‍-:a)', '');
  }, 'RegExp("(?s‍-:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-reverse-other-code-point-zwnbsp.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-other-code-point-zwnbsp.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?s﻿-:a)', '');
  }, 'RegExp("(?s﻿-:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-reverse-other-code-point-zwnj.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-other-code-point-zwnj.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: It is a Syntax Error if the source text matched by RegularExpressionFlags contains any code point other than i, m, or s, or if it contains the same code point more than once. (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?s‌-:a)', '');
  }, 'RegExp("(?s‌-:a)", ""): ');
});
// file syntax-err-arithmetic-modifiers-reverse-should-not-case-fold-i.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-should-not-case-fold-i.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: Code points other than "i", "m", "s" should not be case folded to "i", "m", or "s" (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?I-:a)', 'i');
  }, 'RegExp("(?I-:a)", "i"): ');
});
// file syntax-err-arithmetic-modifiers-reverse-should-not-case-fold-m.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-should-not-case-fold-m.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: Code points other than "i", "m", "s" should not be case folded to "i", "m", or "s" (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?M-:a)', 'i');
  }, 'RegExp("(?M-:a)", "i"): ');
});
// file syntax-err-arithmetic-modifiers-reverse-should-not-case-fold-s.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-should-not-case-fold-s.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: Code points other than "i", "m", "s" should not be case folded to "i", "m", or "s" (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?S-:a)', 'i');
  }, 'RegExp("(?S-:a)", "i"): ');
});
// file syntax-err-arithmetic-modifiers-reverse-should-not-unicode-case-fold-i.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-should-not-unicode-case-fold-i.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: Code points other than "i", "m", "s" should not be case-folded to "i", "m", or "s" (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?İ-:a)', 'iu');
  }, 'RegExp("(?İ-:a)", "iu"): ');
});
// file syntax-err-arithmetic-modifiers-reverse-should-not-unicode-case-fold-s.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-reverse-should-not-unicode-case-fold-s.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: Code points other than "i", "m", "s" should not be case-folded to "i", "m", or "s" (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?ſ-:a)', 'u');
  }, 'RegExp("(?ſ-:a)", "u"): ');
});
// file syntax-err-arithmetic-modifiers-should-not-case-fold-i.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-should-not-case-fold-i.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: Code points other than "i", "m", "s" should not be case folded to "i", "m", or "s" (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?-I:a)', 'i');
  }, 'RegExp("(?-I:a)", "i"): ');
});
// file syntax-err-arithmetic-modifiers-should-not-case-fold-m.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-should-not-case-fold-m.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: Code points other than "i", "m", "s" should not be case folded to "i", "m", or "s" (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?-M:a)', 'i');
  }, 'RegExp("(?-M:a)", "i"): ');
});
// file syntax-err-arithmetic-modifiers-should-not-case-fold-s.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-should-not-case-fold-s.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: Code points other than "i", "m", "s" should not be case folded to "i", "m", or "s" (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?-S:a)', 'i');
  }, 'RegExp("(?-S:a)", "i"): ');
});
// file syntax-err-arithmetic-modifiers-should-not-unicode-case-fold-i.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-should-not-unicode-case-fold-i.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: Code points other than "i", "m", "s" should not be case-folded to "i", "m", or "s" (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?-İ:a)', 'iu');
  }, 'RegExp("(?-İ:a)", "iu"): ');
});
// file syntax-err-arithmetic-modifiers-should-not-unicode-case-fold-s.js
Deno.test('RegExp: syntax-err-arithmetic-modifiers-should-not-unicode-case-fold-s.js', () => {
  // Copyright (C) 2024 Igalia, S.L. All rights reserved.

  /*---
description: Code points other than "i", "m", "s" should not be case-folded to "i", "m", or "s" (arithmetic regular expression flags)
esid: sec-patterns-static-semantics-early-errors
features: [regexp-modifiers]
info: |
    Atom :: ( ? RegularExpressionFlags - RegularExpressionFlags : Disjunction )
    ...

  ---*/

  assert.throws(SyntaxError, function () {
    RegExp('(?-ſ:a)', 'u');
  }, 'RegExp("(?-ſ:a)", "u"): ');
});
// file u180e.js
Deno.test('RegExp: u180e.js', () => {
  // Copyright (C) 2017 Leonardo Balter. All rights reserved.

  /*---
esid: prod-CharacterClassEscape
  U+180E is no longer a Unicode `Space_Separator` symbol as of Unicode v6.3.0.
info: |
  21.2.2.12 CharacterClassEscape

  ...

  The production CharacterClassEscape::s evaluates as follows:

  Return the set of characters containing the characters that are on the
  right-hand side of the WhiteSpace or LineTerminator productions.

  The production CharacterClassEscape::S evaluates as follows:

  Return the set of all characters not included in the set returned by
  CharacterClassEscape::s .
features: [u180e]
  ---*/

  assert.sameValue('\u180E'.replace(/\s+/g, '42'), '\u180E', '\\s should not match U+180E');
  assert.sameValue('\u180E'.replace(/\S+/g, '42'), '42', '\\S matches U+180E');
});
// file unicode_character_class_backspace_escape.js
Deno.test('RegExp: unicode_character_class_backspace_escape.js', () => {
  // Copyright (C) 2020 Alexey Shvayka. All rights reserved.

  /*---
esid: prod-ClassEscapes
  \b escape inside CharacterClass is valid in Unicode patterns (unlike \B).
info: |
  ClassEscape[U] ::
    b

  Static Semantics: CharacterValue

  ClassEscape :: b

  1. Return the code point value of U+0008 (BACKSPACE).
  ---*/

  assert(/[\b]/u.test('\u0008'));
  assert(/[\b-A]/u.test('A'));
});
// file unicode_full_case_folding.js
Deno.test('RegExp: unicode_full_case_folding.js', () => {
  // Copyright (C) 2022 Igalia, S.L. All rights reserved.

  /*---
esid: sec-runtime-semantics-canonicalize-ch
  Case-insensitive Unicode RegExps should not apply full case folding mappings
info: |
  Canonicalize ( _rer_, _ch_ )
  1. If _rer_.[[Unicode]] is *true* and _rer_.[[IgnoreCase]] is *true*, then
    a. If the file `CaseFolding.txt` of the Unicode Character Database provides
      a simple or common case folding mapping for _ch_, return the result of
      applying that mapping to _ch_.
    b. Return _ch_.

  See https://unicode.org/Public/UCD/latest/ucd/CaseFolding.txt for the case
  folding mappings.
  ---*/

  assert(/[\u0390]/ui.test('\u1fd3'), '\\u0390 does not match \\u1fd3');
  assert(/[\u1fd3]/ui.test('\u0390'), '\\u1fd3 does not match \\u0390');
  assert(/[\u03b0]/ui.test('\u1fe3'), '\\u03b0 does not match \\u1fe3');
  assert(/[\u1fe3]/ui.test('\u03b0'), '\\u1fe3 does not match \\u03b0');
  assert(/[\ufb05]/ui.test('\ufb06'), '\\ufb05 does not match \\ufb06');
  assert(/[\ufb06]/ui.test('\ufb05'), '\\ufb06 does not match \\ufb05');
});
// file unicode_identity_escape.js
Deno.test('RegExp: unicode_identity_escape.js', () => {
  /*---
description: IdentityEscape for Unicode RegExp
info: |
    IdentityEscape for Unicode RegExps is restricted to SyntaxCharacter and U+002F (SOLIDUS)
  ---*/

  // 21.2.1 Patterns
  //
  // IdentityEscape[U] ::
  //   [+U] SyntaxCharacter
  //   [+U] /
  //
  // SyntaxCharacter :: one of
  //   ^ $ \ . * + ? ( ) [ ] { } |

  // IdentityEscape in AtomEscape
  assert(/\^/u.test('^'), 'IdentityEscape in AtomEscape: /\\^/');
  assert(/\$/u.test('$'), 'IdentityEscape in AtomEscape: /\\$/');
  assert(/\\/u.test('\\'), 'IdentityEscape in AtomEscape: /\\\\/');
  assert(/\./u.test('.'), 'IdentityEscape in AtomEscape: /\\./');
  assert(/\*/u.test('*'), 'IdentityEscape in AtomEscape: /\\*/');
  assert(/\+/u.test('+'), 'IdentityEscape in AtomEscape: /\\+/');
  assert(/\?/u.test('?'), 'IdentityEscape in AtomEscape: /\\?/');
  assert(/\(/u.test('('), 'IdentityEscape in AtomEscape: /\\(/');
  assert(/\)/u.test(')'), 'IdentityEscape in AtomEscape: /\\)/');
  assert(/\[/u.test('['), 'IdentityEscape in AtomEscape: /\\[/');
  assert(/\]/u.test(']'), 'IdentityEscape in AtomEscape: /\\]/');
  assert(/\{/u.test('{'), 'IdentityEscape in AtomEscape: /\\{/');
  assert(/\}/u.test('}'), 'IdentityEscape in AtomEscape: /\\}/');
  assert(/\|/u.test('|'), 'IdentityEscape in AtomEscape: /\\|/');
  assert(/\//u.test('/'), 'IdentityEscape in AtomEscape: /\\//');

  // IdentityEscape in ClassEscape
  assert(/[\^]/u.test('^'), 'IdentityEscape in ClassEscape: /[\\^]/');
  assert(/[\$]/u.test('$'), 'IdentityEscape in ClassEscape: /[\\$]/');
  assert(/[\\]/u.test('\\'), 'IdentityEscape in ClassEscape: /[\\\\]/');
  assert(/[\.]/u.test('.'), 'IdentityEscape in ClassEscape: /[\\.]/');
  assert(/[\*]/u.test('*'), 'IdentityEscape in ClassEscape: /[\\*]/');
  assert(/[\+]/u.test('+'), 'IdentityEscape in ClassEscape: /[\\+]/');
  assert(/[\?]/u.test('?'), 'IdentityEscape in ClassEscape: /[\\?]/');
  assert(/[\(]/u.test('('), 'IdentityEscape in ClassEscape: /[\\(]/');
  assert(/[\)]/u.test(')'), 'IdentityEscape in ClassEscape: /[\\)]/');
  assert(/[\[]/u.test('['), 'IdentityEscape in ClassEscape: /[\\[]/');
  assert(/[\]]/u.test(']'), 'IdentityEscape in ClassEscape: /[\\]]/');
  assert(/[\{]/u.test('{'), 'IdentityEscape in ClassEscape: /[\\{]/');
  assert(/[\}]/u.test('}'), 'IdentityEscape in ClassEscape: /[\\}]/');
  assert(/[\|]/u.test('|'), 'IdentityEscape in ClassEscape: /[\\|]/');
  assert(/[\/]/u.test('/'), 'IdentityEscape in ClassEscape: /[\\/]/');
});
// file unicode_restricted_brackets.js
Deno.test('RegExp: unicode_restricted_brackets.js', () => {
  /*---
description: B.1.4 is not applied for Unicode RegExp - Standalone brackets
info: |
    The compatibility extensions defined in B.1.4 Regular Expressions Patterns
    are not applied for Unicode RegExp.
    Tested extension: "Atom[U] :: PatternCharacter"
  ---*/

  // Single parentheses and brackets.
  assert.throws(SyntaxError, function () {
    RegExp('(', 'u');
  }, 'RegExp("(", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp(')', 'u');
  }, 'RegExp(")", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[', 'u');
  }, 'RegExp("[", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp(']', 'u');
  }, 'RegExp("]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('{', 'u');
  }, 'RegExp("{", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('}', 'u');
  }, 'RegExp("}", "u"): ');
});
// file unicode_restricted_character_class_escape.js
Deno.test('RegExp: unicode_restricted_character_class_escape.js', () => {
  /*---
description: B.1.4 is not applied for Unicode RegExp - ClassEscape in range expression
info: |
    The compatibility extensions defined in B.1.4 Regular Expressions Patterns
    are not applied for Unicode RegExp.
    Tested extension: "ClassAtomNoDashInRange :: \ ClassEscape but only if ClassEscape evaluates to a CharSet with exactly one character"
  ---*/

  // Leading CharacterClassEscape.
  assert.throws(SyntaxError, function () {
    RegExp('[\\d-a]', 'u');
  }, 'RegExp("[\\d-a]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\D-a]', 'u');
  }, 'RegExp("[\\D-a]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\s-a]', 'u');
  }, 'RegExp("[\\s-a]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\S-a]', 'u');
  }, 'RegExp("[\\S-a]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\w-a]', 'u');
  }, 'RegExp("[\\w-a]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\W-a]', 'u');
  }, 'RegExp("[\\W-a]", "u"): ');

  // Trailing CharacterClassEscape.
  assert.throws(SyntaxError, function () {
    RegExp('[a-\\d]', 'u');
  }, 'RegExp("[a-\\d]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[a-\\D]', 'u');
  }, 'RegExp("[a-\\D]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[a-\\s]', 'u');
  }, 'RegExp("[a-\\s]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[a-\\S]', 'u');
  }, 'RegExp("[a-\\S]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[a-\\w]', 'u');
  }, 'RegExp("[a-\\w]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[a-\\W]', 'u');
  }, 'RegExp("[a-\\W]", "u"): ');

  // Leading and trailing CharacterClassEscape.
  assert.throws(SyntaxError, function () {
    RegExp('[\\d-\\d]', 'u');
  }, 'RegExp("[\\d-\\d]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\D-\\D]', 'u');
  }, 'RegExp("[\\D-\\D]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\s-\\s]', 'u');
  }, 'RegExp("[\\s-\\s]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\S-\\S]', 'u');
  }, 'RegExp("[\\S-\\S]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\w-\\w]', 'u');
  }, 'RegExp("[\\w-\\w]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\W-\\W]', 'u');
  }, 'RegExp("[\\W-\\W]", "u"): ');
});
// file unicode_restricted_identity_escape_alpha.js
Deno.test('RegExp: unicode_restricted_identity_escape_alpha.js', () => {
  /*---
description: B.1.4 is not applied for Unicode RegExp - Identity escape with basic latin letters
info: |
    The compatibility extensions defined in B.1.4 Regular Expressions Patterns
    are not applied for Unicode RegExps.
    Tested extension: "IdentityEscape[U] :: [~U] SourceCharacter but not c"

    Forbidden extension (16.1):
    The RegExp pattern grammars in 21.2.1 and B.1.4 must not be extended to recognize any of the
    source characters A-Z or a-z as IdentityEscape[U] when the U grammar parameter is present.
  ---*/

  function isValidAlphaEscapeInAtom(s) {
    switch (s) {
      // Assertion [U] :: \b
      case 'b':
      // Assertion [U] :: \B
      case 'B':
      // ControlEscape :: one of f n r t v
      case 'f':
      case 'n':
      case 'r':
      case 't':
      case 'v':
      // CharacterClassEscape :: one of d D s S w W
      case 'd':
      case 'D':
      case 's':
      case 'S':
      case 'w':
      case 'W':
        return true;
      default:
        return false;
    }
  }

  function isValidAlphaEscapeInClass(s) {
    switch (s) {
      // ClassEscape[U] :: b
      case 'b':
      // ControlEscape :: one of f n r t v
      case 'f':
      case 'n':
      case 'r':
      case 't':
      case 'v':
      // CharacterClassEscape :: one of d D s S w W
      case 'd':
      case 'D':
      case 's':
      case 'S':
      case 'w':
      case 'W':
        return true;
      default:
        return false;
    }
  }

  // IdentityEscape in AtomEscape
  for (const cu = 0x41 /* A */; cu <= 0x5a /* Z */; ++cu) {
    const s = String.fromCharCode(cu);
    if (!isValidAlphaEscapeInAtom(s)) {
      assert.throws(SyntaxError, function () {
        RegExp('\\' + s, 'u');
      }, "IdentityEscape in AtomEscape: '" + s + "'");
    }
  }
  for (const cu = 0x61 /* a */; cu <= 0x7a /* z */; ++cu) {
    const s = String.fromCharCode(cu);
    if (!isValidAlphaEscapeInAtom(s)) {
      assert.throws(SyntaxError, function () {
        RegExp('\\' + s, 'u');
      }, "IdentityEscape in AtomEscape: '" + s + "'");
    }
  }

  // IdentityEscape in ClassEscape
  for (const cu = 0x41 /* A */; cu <= 0x5a /* Z */; ++cu) {
    const s = String.fromCharCode(cu);
    if (!isValidAlphaEscapeInClass(s)) {
      assert.throws(SyntaxError, function () {
        RegExp('[\\' + s + ']', 'u');
      }, "IdentityEscape in ClassEscape: '" + s + "'");
    }
  }
  for (const cu = 0x61 /* a */; cu <= 0x7a /* z */; ++cu) {
    const s = String.fromCharCode(cu);
    if (!isValidAlphaEscapeInClass(s)) {
      assert.throws(SyntaxError, function () {
        RegExp('[\\' + s + ']', 'u');
      }, "IdentityEscape in ClassEscape: '" + s + "'");
    }
  }
});
// file unicode_restricted_identity_escape_c.js
Deno.test('RegExp: unicode_restricted_identity_escape_c.js', () => {
  /*---
description: B.1.4 is not applied for Unicode RegExp - Invalid control escape sequences
info: |
    The compatibility extensions defined in B.1.4 Regular Expressions Patterns
    are not applied for Unicode RegExp.
    Tested extension: "IdentityEscape[U] :: [~U] SourceCharacter but not c"
  ---*/

  function isAlpha(c) {
    return ('A' <= c && c <= 'Z') || ('a' <= c && c <= 'z');
  }

  // "c ControlLetter" sequence in AtomEscape.
  //
  // AtomEscape[U] :: CharacterEscape[?U]
  // CharacterEscape[U] :: c ControlLetter
  assert.throws(SyntaxError, function () {
    RegExp('\\c', 'u');
  });
  for (const cu = 0x00; cu <= 0x7f; ++cu) {
    const s = String.fromCharCode(cu);
    if (!isAlpha(s)) {
      assert.throws(SyntaxError, function () {
        RegExp('\\c' + s, 'u');
      }, "ControlLetter escape in AtomEscape: '" + s + "'");
    }
  }

  // "c ControlLetter" sequence in ClassEscape.
  //
  // ClassEscape[U] :: CharacterEscape[?U]
  // CharacterEscape[U] :: c ControlLetter
  assert.throws(SyntaxError, function () {
    RegExp('[\\c]', 'u');
  });
  for (const cu = 0x00; cu <= 0x7f; ++cu) {
    const s = String.fromCharCode(cu);
    if (!isAlpha(s)) {
      assert.throws(SyntaxError, function () {
        RegExp('[\\c' + s + ']', 'u');
      }, "ControlLetter escape in ClassEscape: '" + s + "'");
    }
  }
});
// file unicode_restricted_identity_escape.js
Deno.test('RegExp: unicode_restricted_identity_escape.js', () => {
  /*---
description: B.1.4 is not applied for Unicode RegExp - Identity escape with basic latin characters
info: |
    The compatibility extensions defined in B.1.4 Regular Expressions Patterns
    are not applied for Unicode RegExps.
    Tested extension: "IdentityEscape[U] :: [~U] SourceCharacter but not c"
  ---*/

  function isSyntaxCharacter(c) {
    switch (c) {
      case '^':
      case '$':
      case '\\':
      case '.':
      case '*':
      case '+':
      case '?':
      case '(':
      case ')':
      case '[':
      case ']':
      case '{':
      case '}':
      case '|':
        return true;
      default:
        return false;
    }
  }

  function isAlphaDigit(c) {
    return ('0' <= c && c <= '9') || ('A' <= c && c <= 'Z') || ('a' <= c && c <= 'z');
  }

  // IdentityEscape in AtomEscape.
  //
  // AtomEscape[U] :: CharacterEscape[?U]
  // CharacterEscape[U] :: IdentityEscape[?U]
  for (const cu = 0x00; cu <= 0x7f; ++cu) {
    const s = String.fromCharCode(cu);
    if (!isAlphaDigit(s) && !isSyntaxCharacter(s) && s !== '/') {
      assert.throws(SyntaxError, function () {
        RegExp('\\' + s, 'u');
      }, "Invalid IdentityEscape in AtomEscape: '\\" + s + "'");
    }
  }

  // IdentityEscape in ClassEscape.
  //
  // ClassEscape[U] :: CharacterEscape[?U]
  // CharacterEscape[U] :: IdentityEscape[?U]
  for (const cu = 0x00; cu <= 0x7f; ++cu) {
    const s = String.fromCharCode(cu);
    if (!isAlphaDigit(s) && !isSyntaxCharacter(s) && s !== '/' && s !== '-') {
      assert.throws(SyntaxError, function () {
        RegExp('[\\' + s + ']', 'u');
      }, "Invalid IdentityEscape in ClassEscape: '\\" + s + "'");
    }
  }
});
// file unicode_restricted_identity_escape_u.js
Deno.test('RegExp: unicode_restricted_identity_escape_u.js', () => {
  /*---
description: B.1.4 is not applied for Unicode RegExp - Incomplete Unicode escape sequences
info: |
    The compatibility extensions defined in B.1.4 Regular Expressions Patterns
    are not applied for Unicode RegExp.
    Tested extension: "IdentityEscape[U] :: [~U] SourceCharacter but not c"
  ---*/

  // Incomplete RegExpUnicodeEscapeSequence in AtomEscape not parsed as IdentityEscape.
  //
  // AtomEscape[U] :: CharacterEscape[?U]
  // CharacterEscape[U] :: RegExpUnicodeEscapeSequence[?U]
  assert.throws(SyntaxError, function () {
    RegExp('\\u', 'u');
  }, 'RegExp("\\u", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('\\u1', 'u');
  }, 'RegExp("\\u1", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('\\u12', 'u');
  }, 'RegExp("\\u12", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('\\u123', 'u');
  }, 'RegExp("\\u123", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('\\u{', 'u');
  }, 'RegExp("\\u{", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('\\u{}', 'u');
  }, 'RegExp("\\u{}", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('\\u{1', 'u');
  }, 'RegExp("\\u{1", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('\\u{12', 'u');
  }, 'RegExp("\\u{12", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('\\u{123', 'u');
  }, 'RegExp("\\u{123", "u"): ');

  // Incomplete RegExpUnicodeEscapeSequence in ClassEscape not parsed as IdentityEscape.
  //
  // ClassEscape[U] :: CharacterEscape[?U]
  // CharacterEscape[U] :: RegExpUnicodeEscapeSequence[?U]
  assert.throws(SyntaxError, function () {
    RegExp('[\\u]', 'u');
  }, 'RegExp("[\\u]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\u1]', 'u');
  }, 'RegExp("[\\u1]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\u12]', 'u');
  }, 'RegExp("[\\u12]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\u123]', 'u');
  }, 'RegExp("[\\u123]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\u{]', 'u');
  }, 'RegExp("[\\u{]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\u{}]', 'u');
  }, 'RegExp("[\\u{}]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\u{1]', 'u');
  }, 'RegExp("[\\u{1]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\u{12]', 'u');
  }, 'RegExp("[\\u{12]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\u{123]', 'u');
  }, 'RegExp("[\\u{123]", "u"): ');
});
// file unicode_restricted_identity_escape_x.js
Deno.test('RegExp: unicode_restricted_identity_escape_x.js', () => {
  /*---
description: B.1.4 is not applied for Unicode RegExp - Incomplete hexadecimal escape sequences
info: |
    The compatibility extensions defined in B.1.4 Regular Expressions Patterns
    are not applied for Unicode RegExp.
    Tested extension: "IdentityEscape[U] :: [~U] SourceCharacter but not c"
  ---*/

  // Incomplete HexEscapeSequence in AtomEscape not parsed as IdentityEscape.
  //
  // AtomEscape[U] :: CharacterEscape[?U]
  // CharacterEscape[U] :: HexEscapeSequence
  assert.throws(SyntaxError, function () {
    RegExp('\\x', 'u');
  }, 'RegExp("\\x", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('\\x1', 'u');
  }, 'RegExp("\\x1", "u"): ');

  // Incomplete HexEscapeSequence in ClassEscape not parsed as IdentityEscape.
  //
  // ClassEscape[U] :: CharacterEscape[?U]
  // CharacterEscape[U] :: HexEscapeSequence
  assert.throws(SyntaxError, function () {
    RegExp('[\\x]', 'u');
  }, 'RegExp("[\\x]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\x1]', 'u');
  }, 'RegExp("[\\x1]", "u"): ');
});
// file unicode_restricted_incomplete_quantifier.js
Deno.test('RegExp: unicode_restricted_incomplete_quantifier.js', () => {
  /*---
description: B.1.4 is not applied for Unicode RegExp - Incomplete quantifiers
info: |
    The compatibility extensions defined in B.1.4 Regular Expressions Patterns
    are not applied for Unicode RegExp.
    Tested extension: "Atom[U] :: PatternCharacter"
  ---*/

  // Incomplete quantifier with atom.
  assert.throws(SyntaxError, function () {
    RegExp('a{', 'u');
  }, 'RegExp("a{", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('a{1', 'u');
  }, 'RegExp("a{1", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('a{1,', 'u');
  }, 'RegExp("a{1,", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('a{1,2', 'u');
  }, 'RegExp("a{1,2", "u"): ');

  // Incomplete quantifier without atom.
  assert.throws(SyntaxError, function () {
    RegExp('{', 'u');
  }, 'RegExp("{", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('{1', 'u');
  }, 'RegExp("{1", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('{1,', 'u');
  }, 'RegExp("{1,", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('{1,2', 'u');
  }, 'RegExp("{1,2", "u"): ');
});
// file unicode_restricted_octal_escape.js
Deno.test('RegExp: unicode_restricted_octal_escape.js', () => {
  /*---
description: B.1.4 is not applied for Unicode RegExp - Octal escape sequences
info: |
    The compatibility extensions defined in B.1.4 Regular Expressions Patterns
    are not applied for Unicode RegExp.
    Tested extension: "CharacterEscape[U] :: [~U] LegacyOctalEscapeSequence"
  ---*/

  // DecimalEscape without leading 0 in AtomEscape.
  //
  // AtomEscape[U] :: DecimalEscape
  // DecimalEscape :: DecimalIntegerLiteral [lookahead /= DecimalDigit]
  assert.throws(SyntaxError, function () {
    RegExp('\\1', 'u');
  }, 'RegExp("\\1", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('\\2', 'u');
  }, 'RegExp("\\2", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('\\3', 'u');
  }, 'RegExp("\\3", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('\\4', 'u');
  }, 'RegExp("\\4", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('\\5', 'u');
  }, 'RegExp("\\5", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('\\6', 'u');
  }, 'RegExp("\\6", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('\\7', 'u');
  }, 'RegExp("\\7", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('\\8', 'u');
  }, 'RegExp("\\8", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('\\9', 'u');
  }, 'RegExp("\\9", "u"): ');

  // DecimalEscape without leading 0 in ClassEscape.
  //
  // ClassEscape[U] :: DecimalEscape
  // DecimalEscape :: DecimalIntegerLiteral [lookahead /= DecimalDigit]
  assert.throws(SyntaxError, function () {
    RegExp('[\\1]', 'u');
  }, 'RegExp("[\\1]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\2]', 'u');
  }, 'RegExp("[\\2]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\3]', 'u');
  }, 'RegExp("[\\3]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\4]', 'u');
  }, 'RegExp("[\\4]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\5]', 'u');
  }, 'RegExp("[\\5]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\6]', 'u');
  }, 'RegExp("[\\6]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\7]', 'u');
  }, 'RegExp("[\\7]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\8]', 'u');
  }, 'RegExp("[\\8]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\9]', 'u');
  }, 'RegExp("[\\9]", "u"): ');

  // DecimalEscape with leading 0 in AtomEscape.
  //
  // Atom[U] :: DecimalEscape
  // DecimalEscape :: DecimalIntegerLiteral [lookahead /= DecimalDigit]
  assert.throws(SyntaxError, function () {
    RegExp('\\00', 'u');
  }, 'RegExp("\\00", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('\\01', 'u');
  }, 'RegExp("\\01", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('\\02', 'u');
  }, 'RegExp("\\02", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('\\03', 'u');
  }, 'RegExp("\\03", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('\\04', 'u');
  }, 'RegExp("\\04", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('\\05', 'u');
  }, 'RegExp("\\05", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('\\06', 'u');
  }, 'RegExp("\\06", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('\\07', 'u');
  }, 'RegExp("\\07", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('\\08', 'u');
  }, 'RegExp("\\08", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('\\09', 'u');
  }, 'RegExp("\\09", "u"): ');

  // DecimalEscape with leading 0 in ClassEscape.
  //
  // ClassEscape[U] :: DecimalEscape
  // DecimalEscape :: DecimalIntegerLiteral [lookahead /= DecimalDigit]
  assert.throws(SyntaxError, function () {
    RegExp('[\\00]', 'u');
  }, 'RegExp("[\\00]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\01]', 'u');
  }, 'RegExp("[\\01]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\02]', 'u');
  }, 'RegExp("[\\02]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\03]', 'u');
  }, 'RegExp("[\\03]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\04]', 'u');
  }, 'RegExp("[\\04]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\05]', 'u');
  }, 'RegExp("[\\05]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\06]', 'u');
  }, 'RegExp("[\\06]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\07]', 'u');
  }, 'RegExp("[\\07]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\08]', 'u');
  }, 'RegExp("[\\08]", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('[\\09]', 'u');
  }, 'RegExp("[\\09]", "u"): ');
});
// file unicode_restricted_quantifiable_assertion.js
Deno.test('RegExp: unicode_restricted_quantifiable_assertion.js', () => {
  /*---
description: B.1.4 is not applied for Unicode RegExp - Production 'QuantifiableAssertion Quantifier'
info: |
    The compatibility extensions defined in B.1.4 Regular Expressions Patterns
    are not applied for Unicode RegExps.
    Tested extension: "ExtendedTerm :: QuantifiableAssertion Quantifier"
  ---*/

  // Positive lookahead with quantifier.
  assert.throws(SyntaxError, function () {
    RegExp('(?=.)*', 'u');
  }, 'RegExp("(?=.)*", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('(?=.)+', 'u');
  }, 'RegExp("(?=.)+", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('(?=.)?', 'u');
  }, 'RegExp("(?=.)?", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('(?=.){1}', 'u');
  }, 'RegExp("(?=.){1}", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('(?=.){1,}', 'u');
  }, 'RegExp("(?=.){1,}", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('(?=.){1,2}', 'u');
  }, 'RegExp("(?=.){1,2}", "u"): ');

  // Positive lookahead with reluctant quantifier.
  assert.throws(SyntaxError, function () {
    RegExp('(?=.)*?', 'u');
  }, 'RegExp("(?=.)*?", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('(?=.)+?', 'u');
  }, 'RegExp("(?=.)+?", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('(?=.)??', 'u');
  }, 'RegExp("(?=.)??", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('(?=.){1}?', 'u');
  }, 'RegExp("(?=.){1}?", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('(?=.){1,}?', 'u');
  }, 'RegExp("(?=.){1,}?", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('(?=.){1,2}?', 'u');
  }, 'RegExp("(?=.){1,2}?", "u"): ');

  // Negative lookahead with quantifier.
  assert.throws(SyntaxError, function () {
    RegExp('(?!.)*', 'u');
  }, 'RegExp("(?!.)*", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('(?!.)+', 'u');
  }, 'RegExp("(?!.)+", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('(?!.)?', 'u');
  }, 'RegExp("(?!.)?", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('(?!.){1}', 'u');
  }, 'RegExp("(?!.){1}", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('(?!.){1,}', 'u');
  }, 'RegExp("(?!.){1,}", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('(?!.){1,2}', 'u');
  }, 'RegExp("(?!.){1,2}", "u"): ');

  // Negative lookahead with reluctant quantifier.
  assert.throws(SyntaxError, function () {
    RegExp('(?!.)*?', 'u');
  }, 'RegExp("(?!.)*?", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('(?!.)+?', 'u');
  }, 'RegExp("(?!.)+?", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('(?!.)??', 'u');
  }, 'RegExp("(?!.)??", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('(?!.){1}?', 'u');
  }, 'RegExp("(?!.){1}?", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('(?!.){1,}?', 'u');
  }, 'RegExp("(?!.){1,}?", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('(?!.){1,2}?', 'u');
  }, 'RegExp("(?!.){1,2}?", "u"): ');
});
// file unicode_restricted_quantifier_without_atom.js
Deno.test('RegExp: unicode_restricted_quantifier_without_atom.js', () => {
  /*---
description: B.1.4 is not applied for Unicode RegExp - Quantifier without matching Atom
info: |
    The compatibility extensions defined in B.1.4 Regular Expressions Patterns
    are not applied for Unicode RegExp.
    Tested extension: "Atom[U] :: PatternCharacter"
  ---*/

  // Quantifier without atom.
  assert.throws(SyntaxError, function () {
    RegExp('*', 'u');
  }, 'RegExp("*", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('+', 'u');
  }, 'RegExp("+", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('?', 'u');
  }, 'RegExp("?", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('{1}', 'u');
  }, 'RegExp("{1}", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('{1,}', 'u');
  }, 'RegExp("{1,}", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('{1,2}', 'u');
  }, 'RegExp("{1,2}", "u"): ');

  // Reluctant quantifier without atom.
  assert.throws(SyntaxError, function () {
    RegExp('*?', 'u');
  }, 'RegExp("*?", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('+?', 'u');
  }, 'RegExp("+?", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('??', 'u');
  }, 'RegExp("??", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('{1}?', 'u');
  }, 'RegExp("{1}?", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('{1,}?', 'u');
  }, 'RegExp("{1,}?", "u"): ');
  assert.throws(SyntaxError, function () {
    RegExp('{1,2}?', 'u');
  }, 'RegExp("{1,2}?", "u"): ');
});
// file valid-flags-y.js
Deno.test('RegExp: valid-flags-y.js', () => {
  // Copyright (C) 2015 the V8 project authors. All rights reserved.

  /*---
description: The `y` flag is accepted by the RegExp constructor
info: |
    [...]
    10. Return RegExpInitialize(O, P, F).

    21.2.3.2.2 Runtime Semantics: RegExpInitialize ( obj, pattern, flags )

    [...]
    7. If F contains any code unit other than "g", "i", "m", "u", or "y" or if
       it contains the same code unit more than once, throw a SyntaxError
       exception.
  ---*/

  createNewRegExpAtom('abc', 'y');
  createNewRegExpAtom('abc', 'gy');
  createNewRegExpAtom('abc', 'iy');
  createNewRegExpAtom('abc', 'my');
  createNewRegExpAtom('abc', 'uy');
  createNewRegExpAtom('abc', 'gimuy');
});
// cSPELL:ENABLE
