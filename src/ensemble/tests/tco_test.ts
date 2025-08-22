/**
 * Test Tail Call Optimization.
 * @file
 */
import { initEnv, rep } from "../lib.ts";
import runner from "./test_runner.ts";

const tcoEnv = initEnv();

runner.test("TCO: Testing recursive tail-call function", () => {
	rep(
		"(var sum2 (fn* (n acc) (if (eq n 0) acc (sum2 (subtract n 1) (add n acc)))))",
		tcoEnv,
	);
	// Make sure sum2 works
	runner.assert(rep("(sum2 10 0)", tcoEnv), "55");

	// Define the result variable
	runner.assert(rep("(var res2 nil)", tcoEnv), "nil");

	// Make sure that sum2 doesn't cause stack overflow
	rep("(var res2 (sum2 10000 0))", tcoEnv);

	runner.assert(rep("res2", tcoEnv), "50005000");
});

runner.test("TCO: Test mutually recursive tail-call functions", () => {
	rep("(var foo (fn* (n) (if (eq n 0) 0 (bar (subtract n 1)))))", tcoEnv);
	rep("(var bar (fn* (n) (if (eq n 0) 0 (foo (subtract n 1)))))", tcoEnv);

	runner.assert(rep("(foo 10000)", tcoEnv), "0");
});

runner.test("TCO: Testing that (do (do)) not broken by TCO", () => {
	runner.assert(rep("(do (do 1 2))", tcoEnv), "2");
});

runner.report();
