import { initEnv, rep } from "../lib.ts";
import runner from "./test_runner.ts";

runner.test("EVAL: Should add", () => {
	const env = initEnv();
	runner.assert(rep("(add 1 2)", env), "3");
});

runner.test("EVAL: Should multiply", () => {
	const env = initEnv();
	runner.assert(rep("(add 5 (multiply 2 3))", env), "11");
});

runner.test("EVAL: Should subtract", () => {
	const env = initEnv();
	runner.assert(rep("(subtract (add 5 (multiply 2 3)) 3)", env), "8");
});

runner.test("EVAL: Should divide", () => {
	const env = initEnv();
	runner.assert(rep("(divide (subtract (add 5 (multiply 2 3)) 3) 4)", env), "2");
});

runner.test("EVAL: Should evaluate bigger numbers", () => {
	const env = initEnv();
	runner.assert(rep("(divide (subtract (add 515 (multiply 87 311)) 302) 27)", env), "1010");
});

runner.test("EVAL: Should throw an error with no return value", () => {
	const env = initEnv();
	let threw = false;
	try {
		rep("(abc 1 2 3)", env);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("EVAL: Should return an empty array", () => {
	const env = initEnv();
	runner.assert(rep("()", env), "()");
});

runner.test("EVAL: Should evaluate arrays", () => {
	const env = initEnv();
	runner.assert(rep("[1 2 (add 1 2)]", env), "[1 2 3]");
});

runner.test("EVAL: Should evaluate object literals", () => {
	const env = initEnv();
	runner.assert(rep("{ a: (add 7 8) }", env), "{a: 15}");
});

runner.test("EVAL: Should return an empty object literal", () => {
	const env = initEnv();
	runner.assert(rep("{}", env), "{}");
});

runner.report();
