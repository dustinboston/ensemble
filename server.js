import * as os from "os";
import * as std from "std";

/**
 * @typedef {{method: string, path: string, headers: string[], body: string}} Request
 * @typedef {(_request: Request) => string} RequestHandler
 * @typedef {{[method: string]: {[path: string]: RequestHandler}}} Routes
 */

/**
 * A simple HTTP server class for QuickJS.
 */
class WebServer {
	/**
	 * Creates an instance of SimpleHTTPServer.
	 * @param {number} port - The port on which the server will listen.
	 */
	constructor(port) {
		this.port = port;
		/** @type {Routes} */
		this.routes = { GET: {}, POST: {} };
		this.staticDir = "./public";
	}

	/**
	 * Handles incoming requests and routes them to the appropriate handler.
	 * @param {string} request - The raw HTTP request.
	 * @returns {string} The HTTP response.
	 */
	handleRequest(request) {
		const [requestLine, ...headers] = request.split("\r\n");
		const [method, path] = requestLine.split(" ");
		const handler = this.routes[method][path] || this.serveStatic(path) || this.defaultHandler;
		return handler({
			method, path, headers, body: this.parseBody(request),
		});
	}

	/**
	 * Parses the body of the HTTP request.
	 * @param {string} request - The raw HTTP request.
	 * @returns {string} The request body.
	 */
	parseBody(request) {
		const [_headers, body] = request.split("\r\n\r\n");
		return body || "";
	}

	/**
	 * Serves static files from the specified directory.
	 * @param {string} path - The requested path.
	 * @returns {(() => string)|null} A function that returns the HTTP response, or null if the file is not found.
	 */
	serveStatic(path) {
		const filePath = this.staticDir + (path === "/" ? "/index.html" : path);
		try {
			const content = std.loadFile(filePath);
			const extension = filePath.split(".").pop();
			const contentType = this.getContentType(extension);

			return () => `HTTP/1.1 200 OK\r\nContent-Type: ${contentType}\r\n\r\n${content}`;
		} catch {
			return null;
		}
	}

	/**
	 * Returns the content type for a given file extension.
	 * @param {string|undefined} extension - The file extension.
	 * @returns {string} The content type.
	 */
	getContentType(extension) {
		/**
		 * @type {Record<string, string>}
		 */
		const types = {
			html: "text/html",
			css: "text/css",
			js: "application/javascript",
			jpg: "image/jpeg",
			jpeg: "image/jpeg",
			png: "image/png",
			gif: "image/gif",
			svg: "image/svg+xml",
			json: "application/json",
		};
		return (extension && types[extension] !== undefined) ? types[extension] : "application/octet-stream";
	}

	/**
	 * The default handler for unrecognized routes.
	 * @returns {string} The HTTP response for 404 Not Found.
	 */
	defaultHandler() {
		return "HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\n\r\n404 Not Found\r\n";
	}


	/**
	 * Starts the HTTP server.
	 */
	start() {
		const pipeResult = os.pipe();
		if (!pipeResult) {
			std.out.puts('Failed to create pipe\n');
			return;
		}
		const [readFd, writeFd] = pipeResult;

		os.setReadHandler(readFd, () => {
			const buffer = new ArrayBuffer(4096);
			const bytesRead = os.read(readFd, buffer, 0, 4096);
			if (bytesRead > 0) {
				const uint8Array = new Uint8Array(buffer, 0, bytesRead);
				const req = String.fromCharCode(...Array.from(uint8Array));
				const response = this.handleRequest(req);

				// Convert response string to ArrayBuffer
				const responseBuffer = new TextEncoder().encode(response);
				os.write(writeFd, responseBuffer.buffer, 0, responseBuffer.length);
			}
		});

		std.out.puts(`Server started on port ${this.port}\n`);
	}

	/**
	 * Registers a handler for GET requests to a specific path.
	 * @param {string} path - The path for the GET request.
	 * @param {RequestHandler} handler - The handler function for the GET request.
	 */
	get(path, handler) {
		this.routes.GET[path] = handler;
	}

	/**
	 * Registers a handler for POST requests to a specific path.
	 * @param {string} path - The path for the POST request.
	 * @param {RequestHandler} handler - The handler function for the POST request.
	 */
	post(path, handler) {
		this.routes.POST[path] = handler;
	}

	/**
	 * Sets the directory for serving static files.
	 * @param {string} directory - The directory path.
	 */
	setStaticDir(directory) {
		this.staticDir = directory;
	}
}

/**
 * @typedef {Object} RouteDefinition
 * @property {string} content - Content body, e.g.`<html><body><h1>Hello, QuickJS!</h1></body></html>`
 * @property {string} method - Either "get" or "post"
 * @property {string} mime - A valid mime type, e.g. text/html
 * @property {string} status - The status code and text, e.g. "200 OK"
 * @property {string} url - Absolute path of the page url, e.g. /about
 */

/**
 * Creates an instance of the SimpleHTTPServer.
 * @param {number} port
 * @param {string} staticPath - Path to static files
 * @param {RouteDefinition[]} routes
 */
export function createServer(port = 8080, staticPath = "./", routes = []) {
	const server = new WebServer(port);

	for (const route of routes) {
		const content = route.content ?? "<h1>It's alive</h1>";
		const status = route.status ?? "200 OK";
		const mime = route.mime ?? "text/html";

		/** @type {RequestHandler} */
		const response = _request => `HTTP/1.1 ${status}\r\nContent-Type: ${mime}\r\n\r\n${content}\r\n`;
		if (route.method === "post") {
			server.post(route.url ?? "/", response);
		} else {
			server.get(route.url ?? "/", response);
		}
	}

	server.setStaticDir(staticPath);
	server.start();
}

export { WebServer };
