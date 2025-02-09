declare module "qjs:os" {
	export function readdir(path: string): [string[], string];
	export function mkdir(path: string): void;
	export function remove(path: string): void;
}

declare module "qjs:std" {
	export function loadFile(path: string): string;
	export function open(path: string, mode: string): any;
	export function close(file: any): void;
	export function getline(): string | null;
	export const out: any;

	// Work around for the reserved `in` keyword
	declare const _in: any;
	export { _in as in };
}

// // Define the os module
// declare module "qjs:os" {
//   export interface OS {
//     readdir(path: string): [string[], string];
//     mkdir(path: string): void;
//     remove(path: string): void;
//   }
//   export const os: OS;
//   // export default os;
// }

// // Define the std module
// declare module "qjs:std" {
//   interface STD {
//     loadFile(path: string): string;
//     open(path: string, mode: string): any;
//     close(file: any): void;
//     getline(): string | null;
//     out: any;
//     in: any;
//   }
//   export const std: STD;
//   // export default std;
// }
