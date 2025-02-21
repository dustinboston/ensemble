import { initEnv, rep } from "../lib.ts";
import runner from "./test_runner.ts";

const testEnv = initEnv();

runner.test("ENV: Should add", () => {
	runner.assert(rep("(+ 1 2)", testEnv), "3");
});

runner.test("ENV: Should divide", () => {
	runner.assert(rep("(/ (- (+ 5 (* 2 3)) 3) 4)", testEnv), "2");
});

runner.test("ENV: Should define x and retrieve its value", () => {
	runner.assert(rep("(def! x 3)", testEnv), "3");
	runner.assert(rep("x", testEnv), "3");
});

runner.test("ENV: Should redefine x and retrieve the new value", () => {
	runner.assert(rep("(def! x 4)", testEnv), "4");
	runner.assert(rep("x", testEnv), "4");
});

runner.test("ENV: Should define and retrieve y", () => {
	runner.assert(rep("(def! y (+ 1 7))", testEnv), "8");
	runner.assert(rep("y", testEnv), "8");
});

runner.test("ENV: Should define and retrieve mynum", () => {
	runner.assert(rep("(def! mynum 111)", testEnv), "111");
	runner.assert(rep("mynum", testEnv), "111");
});

runner.test("ENV: Should define and retrieve MYNUM", () => {
	runner.assert(rep("(def! MYNUM 222)", testEnv), "222");
	runner.assert(rep("MYNUM", testEnv), "222");
});

runner.test("ENV: Should handle undefined symbol", () => {
	let threw = false;
	try {
		rep("(abc 1 2 3)", testEnv);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("ENV: Check that error aborts def!", () => {
	runner.assert(rep("(def! w 123)", testEnv), "123");
	let threw = false;
	try {
		rep("(def! w (abc))", testEnv);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
	runner.assert(rep("w", testEnv), "123");
});

runner.test("ENV: Should define and retrieve z", () => {
	runner.assert(rep("(let* (z 9) z)", testEnv), "9");
});

runner.test("ENV: Should define and retrieve x", () => {
	runner.assert(rep("(let* (x 9) x)", testEnv), "9");
});

runner.test("ENV: Should retrieve previous value of x", () => {
	runner.assert(rep("x", testEnv), "4");
});

runner.test("ENV: Should compute expression with z", () => {
	runner.assert(rep("(let* (z (+ 2 3)) (+ 1 z))", testEnv), "6");
});

runner.test("ENV: Should compute expression with p and q", () => {
	runner.assert(rep("(let* (p (+ 2 3) q (+ 2 p)) (+ p q))", testEnv), "12");
});

runner.test("ENV: Should define y with let* and retrieve its value", () => {
	runner.assert(rep("(def! y (let* (z 7) z))", testEnv), "7");
	runner.assert(rep("y", testEnv), "7");
});

runner.test("ENV: Should define and retrieve a", () => {
	runner.assert(rep("(def! a 4)", testEnv), "4");
});

runner.test("ENV: Should retrieve value of q", () => {
	runner.assert(rep("(let* (q 9) q)", testEnv), "9");
});

runner.test("ENV: Should retrieve outer environment value of a", () => {
	runner.assert(rep("(let* (q 9) a)", testEnv), "4");
});

runner.test(
	"ENV: Should retrieve outer environment value of a with nested let*",
	() => {
		runner.assert(rep("(let* (z 2) (let* (q 9) a))", testEnv), "4");
	},
);

runner.test("ENV: Vector bindings should work", () => {
	runner.assert(rep("(let* [z 9] z)", testEnv), "9");
});

runner.test("ENV: Should compute expression with vector bindings", () => {
	runner.assert(rep("(let* [p (+ 2 3) q (+ 2 p)] (+ p q))", testEnv), "12");
});

runner.test("ENV: Should evaluate vector with bindings", () => {
	runner.assert(
		rep("(let* (a 5 b 6) [3 4 a [b 7] 8])", testEnv),
		"[3 4 5 [6 7] 8]",
	);
});

runner.test("ENV: Last assignment takes priority", () => {
	runner.assert(rep("(let* (x 2 x 3) x)", testEnv), "3");
});

runner.report();
