# lil

## Development

While lil runs on Deno, it uses the XO linter and formatter. Eslint and Deno
don't play nice so Deno has to be effectively disabled during development,
except to run the application. This has several implications:

- There is a tsconfig.json, a package.json, AND a deno.jsonc file.
  - All three of these need to be kept in sync.
  - tsconfig.json disables libs and maps types from the compat folder.
  - package.json stands in for deno.jsonc when in development.
- There is a compat folder which contains types and code to shim NodeJS for XO.
  - The dts sub-folder contains *.d.ts files from the main Deno repository
  - The deno_std sub-folder contains the code from the deno_std repository

It aint perfect, but it works.

- First run `npm install` from the root. 
- Clone or download the [deno source][1] to your local computer.
- Copy `cli/tsc/dts` from deno into `impls/lil/compat`.
- Clone or download the [deno_std source][2] into `impls/lil/compat`.
- Delete the `deno_std/.git` subfolder.

Now you should be good to go.

### Commands

- `make REGRESSION=1 "test^lil"` from the root to run functional tests.
- `deno test -A` from impls/lil to run unit tests.
- `npx xo --fix` from impls/lil to lint-fix the project.

### VSCode

This section applies to VSCode/Codium only. 

The development configuration outlined above works best if the Deno extension
is disabled and the XO extension is installed. Refer to the .vscode/settings
file for the preferred configuration. Given the configuration it isn't really
necessary to even install it.

However, the XO plugin is useful for automatically formatting and linting
while editing. The preferred configuration is also in the .vscode/settings.

[1]: https://github.com/denoland/deno.git
[2]: https://github.com/denoland/deno_std.git
