import { initEnv, rep } from "../lib.ts";
import runner from "./test_runner.ts";

// -----------------------------------------------------

runner.test("IF_FN_DO: Testing list creation with empty list", () => {
	const env = initEnv();
	runner.assert(rep("(list)", env), "()");
});

runner.test("IF_FN_DO: Testing if (list) is recognized as a list", () => {
	const env = initEnv();
	runner.assert(rep("(list? (list))", env), "true");
});

runner.test(
	"IF_FN_DO: Testing if (list) is recognized as an empty list",
	() => {
		const env = initEnv();
		runner.assert(rep("(empty? (list))", env), "true");
	},
);

runner.test("IF_FN_DO: Testing if (list 1) is not empty", () => {
	const env = initEnv();
	runner.assert(rep("(empty? (list 1))", env), "false");
});

runner.test("IF_FN_DO: Testing list creation with elements", () => {
	const env = initEnv();
	runner.assert(rep("(list 1 2 3)", env), "(1 2 3)");
});

runner.test("IF_FN_DO: Testing count of elements in non-empty list", () => {
	const env = initEnv();
	runner.assert(rep("(count (list 1 2 3))", env), "3");
});

runner.test("IF_FN_DO: Testing count of elements in empty list", () => {
	const env = initEnv();
	runner.assert(rep("(count (list))", env), "0");
});

runner.test("IF_FN_DO: Testing count of nil", () => {
	const env = initEnv();
	runner.assert(rep("(count nil)", env), "0");
});

runner.test(
	"IF_FN_DO: Testing conditional based on count greater than 3",
	() => {
		const env = initEnv();
		runner.assert(rep("(if (gt (count (list 1 2 3)) 3) 89 78)", env), "78");
	},
);

runner.test(
	"IF_FN_DO: Testing conditional based on count greater than or equal to 3",
	() => {
		const env = initEnv();
		runner.assert(rep("(if (gte (count (list 1 2 3)) 3) 89 78)", env), "89");
	},
);

// -----------------------------------------------------

runner.test("IF_FN_DO: Testing true condition in if form", () => {
	const env = initEnv();
	runner.assert(rep("(if true 7 8)", env), "7");
});

runner.test("IF_FN_DO: Testing false condition in if form", () => {
	const env = initEnv();
	runner.assert(rep("(if false 7 8)", env), "8");
});

runner.test(
	"IF_FN_DO: Testing false condition with false branch in if form",
	() => {
		const env = initEnv();
		runner.assert(rep("(if false 7 false)", env), "false");
	},
);

runner.test(
	"IF_FN_DO: Testing true condition with arithmetic in if form",
	() => {
		const env = initEnv();
		runner.assert(rep("(if true (add 1 7) (add 1 8))", env), "8");
	},
);

runner.test(
	"IF_FN_DO: Testing false condition with arithmetic in if form",
	() => {
		const env = initEnv();
		runner.assert(rep("(if false (add 1 7) (add 1 8))", env), "9");
	},
);

runner.test("IF_FN_DO: Testing nil condition in if form", () => {
	const env = initEnv();
	runner.assert(rep("(if nil 7 8)", env), "8");
});

runner.test("IF_FN_DO: Testing zero condition in if form", () => {
	const env = initEnv();
	runner.assert(rep("(if 0 7 8)", env), "7");
});

runner.test("IF_FN_DO: Testing empty list condition in if form", () => {
	const env = initEnv();
	runner.assert(rep("(if (list) 7 8)", env), "7");
});

runner.test("IF_FN_DO: Testing non-empty list condition in if form", () => {
	const env = initEnv();
	runner.assert(rep("(if (list 1 2 3) 7 8)", env), "7");
});

runner.test(
	"IF_FN_DO: Testing equality of empty list with nil in if form",
	() => {
		const env = initEnv();
		runner.assert(rep("(eq (list) nil)", env), "false");
	},
);

// -----------------------------------------------------

runner.test("IF_FN_DO: Testing 1-way if form with false condition", () => {
	const env = initEnv();
	runner.assert(rep("(if false (add 1 7))", env), "nil");
});

runner.test("IF_FN_DO: Testing 1-way if form with nil condition", () => {
	const env = initEnv();
	runner.assert(rep("(if nil 8)", env), "nil");
});

runner.test(
	"IF_FN_DO: Testing 1-way if form with nil condition and else branch",
	() => {
		const env = initEnv();
		runner.assert(rep("(if nil 8 7)", env), "7");
	},
);

runner.test(
	"IF_FN_DO: Testing 1-way if form with true condition and arithmetic",
	() => {
		const env = initEnv();
		runner.assert(rep("(if true (add 1 7))", env), "8");
	},
);

// -----------------------------------------------------

runner.test("IF_FN_DO: 2 and 1 are not equal", () => {
	const env = initEnv();
	runner.assert(rep("(eq 2 1)", env), "false");
});

runner.test("IF_FN_DO: 1 and 1 are equal", () => {
	const env = initEnv();
	runner.assert(rep("(eq 1 1)", env), "true");
});

runner.test("IF_FN_DO: 1 and 2 are equal", () => {
	const env = initEnv();
	runner.assert(rep("(eq 1 2)", env), "false");
});

runner.test("IF_FN_DO: Testing equality with 1 and (add 1 1)", () => {
	const env = initEnv();
	runner.assert(rep("(eq 1 (add 1 1))", env), "false");
});

runner.test("IF_FN_DO: Testing equality with 2 and (add 1 1)", () => {
	const env = initEnv();
	runner.assert(rep("(eq 2 (add 1 1))", env), "true");
});

runner.test("IF_FN_DO: Testing equality with nil and 1", () => {
	const env = initEnv();
	runner.assert(rep("(eq nil 1)", env), "false");
});

runner.test("IF_FN_DO: nil and nil are equal", () => {
	const env = initEnv();
	runner.assert(rep("(eq nil nil)", env), "true");
});

runner.test("IF_FN_DO: Testing greater than comparison with 2 and 1", () => {
	const env = initEnv();
	runner.assert(rep("(gt 2 1)", env), "true");
});

runner.test("IF_FN_DO: Testing greater than comparison with 1 and 1", () => {
	const env = initEnv();
	runner.assert(rep("(gt 1 1)", env), "false");
});

runner.test("IF_FN_DO: Testing greater than comparison with 1 and 2", () => {
	const env = initEnv();
	runner.assert(rep("(gt 1 2)", env), "false");
});

runner.test(
	"IF_FN_DO: Testing greater than or equal comparison with 2 and 1",
	() => {
		const env = initEnv();
		runner.assert(rep("(gte 2 1)", env), "true");
	},
);

runner.test(
	"IF_FN_DO: Testing greater than or equal comparison with 1 and 1",
	() => {
		const env = initEnv();
		runner.assert(rep("(gte 1 1)", env), "true");
	},
);

runner.test(
	"IF_FN_DO: Testing greater than or equal comparison with 1 and 2",
	() => {
		const env = initEnv();
		runner.assert(rep("(gte 1 2)", env), "false");
	},
);

runner.test("IF_FN_DO: Testing less than comparison with 2 and 1", () => {
	const env = initEnv();
	runner.assert(rep("(lt 2 1)", env), "false");
});

runner.test("IF_FN_DO: Testing less than comparison with 1 and 1", () => {
	const env = initEnv();
	runner.assert(rep("(lt 1 1)", env), "false");
});

runner.test("IF_FN_DO: Testing less than comparison with 1 and 2", () => {
	const env = initEnv();
	runner.assert(rep("(lt 1 2)", env), "true");
});

runner.test(
	"IF_FN_DO: Testing less than or equal comparison with 2 and 1",
	() => {
		const env = initEnv();
		runner.assert(rep("(lte 2 1)", env), "false");
	},
);

runner.test(
	"IF_FN_DO: Testing less than or equal comparison with 1 and 1",
	() => {
		const env = initEnv();
		runner.assert(rep("(lte 1 1)", env), "true");
	},
);

runner.test(
	"IF_FN_DO: Testing less than or equal comparison with 1 and 2",
	() => {
		const env = initEnv();
		runner.assert(rep("(lte 1 2)", env), "true");
	},
);

// -----------------------------------------------------

runner.test("IF_FN_DO: Testing equality with 1 and 1", () => {
	const env = initEnv();
	runner.assert(rep("(eq 1 1)", env), "true");
});

runner.test("IF_FN_DO: Testing equality with 0 and 0", () => {
	const env = initEnv();
	runner.assert(rep("(eq 0 0)", env), "true");
});

runner.test("IF_FN_DO: Testing inequality with 1 and 0", () => {
	const env = initEnv();
	runner.assert(rep("(eq 1 0)", env), "false");
});

runner.test("IF_FN_DO: Testing equality with true and true", () => {
	const env = initEnv();
	runner.assert(rep("(eq true true)", env), "true");
});

runner.test("IF_FN_DO: Testing equality with false and false", () => {
	const env = initEnv();
	runner.assert(rep("(eq false false)", env), "true");
});

runner.test("IF_FN_DO: Testing equality with nil and nil", () => {
	const env = initEnv();
	runner.assert(rep("(eq nil nil)", env), "true");
});

runner.test("IF_FN_DO: Testing equality of two empty lists", () => {
	const env = initEnv();
	runner.assert(rep("(eq (list) (list))", env), "true");
});

runner.test("IF_FN_DO: Testing equality of empty list and nil", () => {
	const env = initEnv();
	runner.assert(rep("(eq (list) ())", env), "true");
});

runner.test("IF_FN_DO: Testing equality of two lists with elements", () => {
	const env = initEnv();
	runner.assert(rep("(eq (list 1 2) (list 1 2))", env), "true");
});

runner.test("IF_FN_DO: Testing equality of two nested lists", () => {
	const env = initEnv();
	runner.assert(
		rep("(eq (list (list 1) (list 2)) (list (list 1) (list 2)))", env),
		"true",
	);
});

// -----------------------------------------------------

runner.test("IF_FN_DO: Testing (list? (list))", () => {
	const env = initEnv();
	runner.assert(rep("(list? (list))", env), "true");
});

runner.test("IF_FN_DO: Testing (empty? (list))", () => {
	const env = initEnv();
	runner.assert(rep("(empty? (list))", env), "true");
});

runner.test("IF_FN_DO: Testing (empty? (list 1))", () => {
	const env = initEnv();
	runner.assert(rep("(empty? (list 1))", env), "false");
});

runner.test("IF_FN_DO: Testing (empty? (list 1 2 3))", () => {
	const env = initEnv();
	runner.assert(rep("(empty? (list 1 2 3))", env), "false");
});

runner.test("IF_FN_DO: Testing (empty? (list 1 2 3 4))", () => {
	const env = initEnv();
	runner.assert(rep("(empty? (list 1 2 3 4))", env), "false");
});

runner.report();
