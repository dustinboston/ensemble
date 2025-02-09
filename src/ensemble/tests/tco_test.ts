/**
 * Test Tail Call Optimization.
 * Imported from `step5_tco.mal` tests.
 * @file
 */
import { initEnv, rep } from "../lib.ts";
import { assertEquals, test } from "./test_runner.ts";

const tcoEnv = initEnv();

test("TCO: Testing recursive tail-call function", () => {
	rep(
		"(def! sum2 (fn* (n acc) (if (= n 0) acc (sum2 (- n 1) (+ n acc)))))",
		tcoEnv,
	);
	// Make sure sum2 works
	assertEquals(rep("(sum2 10 0)", tcoEnv), "55");

	// Define the result variable
	assertEquals(rep("(def! res2 nil)", tcoEnv), "nil");

	// Make sure that sum2 doesn't cause stack overflow
	rep("(def! res2 (sum2 10000 0))", tcoEnv);

	assertEquals(rep("res2", tcoEnv), "50005000");
});

test("TCO: Test mutually recursive tail-call functions", () => {
	rep("(def! foo (fn* (n) (if (= n 0) 0 (bar (- n 1)))))", tcoEnv);
	rep("(def! bar (fn* (n) (if (= n 0) 0 (foo (- n 1)))))", tcoEnv);

	assertEquals(rep("(foo 10000)", tcoEnv), "0");
});

test("TCO: Testing that (do (do)) not broken by TCO", () => {
	assertEquals(rep("(do (do 1 2))", tcoEnv), "2");
});
