import http from "node:http";
import fs from "node:fs";
import {dsl} from "../jsldsl.js";
import {$} from "../core.js";

const s = Symbol.for;

/**
 * Mock the document while in the node environment.
 * @type {*}
 */
const document = globalThis.document || {
	forms: {
		inputForm: {
			/**
			 * @param {*} _a
			 * @param {*} _b
			 */
			addEventListener(_a, _b) {},
		},
	},
};

dsl([
	$.do,
	[$.global, s("renderedPage"), [$.toString, [$.html, {lang: "en"}, [
		[$.head, [
			[$.meta, {charset: "utf8"}],
			[$.title, "Fibonacci Sequence"],
			[$.style, [
				$.stylesheet, [
					["*", "*::before", "*::after", [
						[$.boxSizing, "border-box"],
					]],
					["body", [
						[$.backgroundColor, "black"],
						[$.color, "ghostwhite"],
						[$.font, "1em/160% sans-serif"],
						[$.margin, "3em auto"],
						[$.maxWidth, "450px"],
					]],
					["a:link, a:visited", [
						[$.color, "skyblue"],
						[$.fontWeight, 700],
					]],
					["a:hover", "a:focus", "a:active", [
						[$.color, "aliceblue"],
					]],
					["a:focus", [
						[$.outline, "2px solid deepskyblue"],
						[$.outlineOffset, "2px"],
						[$.borderRadius, "1px"],
					]],
					["input", "button", "output", [
						[$.background, "#111"],
						[$.borderRadius, "5px"],
						[$.color, "inherit"],
						[$.font, "inherit"],
						[$.lineHeight, "120%"],
						[$.padding, "0.75em"],
					]],
					["input", "button", [
						[$.border, "2px solid dimgray"],
						[$.marginRight, "1em"],
						["&:focus", [
							[$.outline, 0],
							[$.borderColor, "deepskyblue"],
						]],
						["&:hover", "&:active", [
							[$.borderColor, "lightgray"],
						]],
					]],
					["output", [
						[$.height, "250px"],
						[$.resize, "none"],
						[$.display, "block"],
						[$.marginTop, "2rem"],
						[$.overflowY, "auto"],
					]],
				],
			]],
		]],
		[$.body, {class: "container"}, [
			[$.h1, "Fibonacci Sequence"],

			[$.p, [
				"Display the given number of terms in the ",
				[$.a, {href: "https://en.wikipedia.org/wiki/Fibonacci_sequence"}, "Fibonacci Sequence"],
				".",
			]],

			[$.form, {id: "inputForm"}, [
				[$.label, [
					"Number",
					[$.br],
					[$.input, {
						name: "n", type: "number", required: true, max: 21, min: 1, value: 1,
					}],
				]],

				[$.button, {type: "submit"}, "Calculate"],
				[$.output, {name: "output"}],
			]],

			[$.script, {type: "module"}, [
				// TODO: Defer evaluation with quoting
				$.toString,
				"import {dsl} from \"/jsldsl.js\";\n",
				"import {$} from \"/core.js\";\n",
				"const s = Symbol.for;\n",
				[$.global,
					s("fib"),
					[$.function,
						[s("n")],
						[$.if,
							[$.lessThanOrEqual, s("n"), 1],
							[s("n")],
							[$.add,
								[s("fib"), [$.subtract, s("n"), 1]],
								[s("fib"), [$.subtract, s("n"), 2]]]]]],

				[[$.getIn, document.forms, "inputForm", "addEventListener"], // Should resolve to a function
					null, // `this` doesn't matter?
					["submit", [$.function, // Pass the arguments
						[s("ev")],
						[$.do,
							[$.debug, "made it to the do"],
							[Reflect.apply, s("ev"), Event.prototype.preventDefault, []],
							[$.const, [
								s("output"),
								[$.getIn, s("ev"), "target", "elements", "output"],
								s("data"),
								[Reflect.apply,
									[Object.create, FormData.prototype],
									null,
									[[$.getIn, s("ev"), "target"]]],
								s("n"),
								[Math.min,
									[Math.max,
										[Number.parseInt,
											[$.or,
												[Reflect.apply,
													[$.getIn,
														s("data"),
														"get"],
													"n"],
												1]],
										1],
									21],
							], [Reflect.set, s("output"), "innerHTML", [Array.join,
								[Array.from, [{length: s("n")}, [$.function, [s("_"), s("i")], [
									$.toString, [s("fib"), s("i")], [$.br],
								]]]],
								""]]]]]]],
			]],
		]],
	]]]],
]);

// Ensemble server
dsl([
	[$.global, s("server"), [http.createServer, [$.function, [s("request"), s("response")], [
		[$.global, s("requestUrl"), [Reflect.apply, String.prototype.trim, [$.getIn, s("request"), "url"], []]],
		[$.logString, "[GET]:", s("requestUrl")],

		// Get the requested file
		[$.global,
			s("filePath"),
			[$.if,
				[$.equals, s("requestUrl"), "/jsldsl.js"],
				"jsldsl.js",
				[$.if,
					[$.equals, s("requestUrl"), "/core.js"],
					"core.js",
					[$.if,
						[$.equals, s("requestUrl"), "/env.js"],
						"env.js",
						""]]]],

		[$.logString, "  Filesystem Path:", s("filePath")],

		// Read the file from the filesystem if one was requested, else render the main content
		[$.if, [$.equals, s("requestUrl"), "/"], [
			[$.logString, "Getting index page."],
			[Reflect.apply, [$.getIn, s("response"), "writeHead"], s("response"), [200, {"Content-Type": "text/html"}]],
			[Reflect.apply, [$.getIn, s("response"), "end"], s("response"), [s("renderedPage")]],
		], [
			[$.if, s("filePath"), [
				[Reflect.apply, fs.readFile, null, [s("filePath"), "utf8", [$.function, [s("err"), s("data")], [
					[$.if, [$.not, s("err")], [
						[Reflect.apply, [$.getIn, s("response"), "writeHead"], s("response"), [200, {"Content-Type": "text/javascript"}]],
						[Reflect.apply, [$.getIn, s("response"), "end"], s("response"), [s("data")]],
					], [
						[Reflect.apply, [$.getIn, s("response"), "writeHead"], s("response"), [500, {"Content-Type": "text/plain"}]],
						[Reflect.apply, [$.getIn, s("response"), "end"], s("response"), ["Internal Serve Error"]],
					]],
				]]]],
			], [
				[Reflect.apply, [$.getIn, s("response"), "writeHead"], s("response"), [400, {"Content-Type": "text/plain"}]],
				[Reflect.apply, [$.getIn, s("response"), "end"], s("response"), ["Invalid Request"]],
			]],
		]],
	]]]],
	[Reflect.apply, [$.getIn, s("server"), "listen"], s("server"), [3000, [$.function, [], [
		$.logString, "Server running at http://127.0.0.1:3000/",
	]]]],
]);
