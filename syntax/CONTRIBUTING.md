# Contributing

* [Visual Studio Code Syntax Highlight Guide](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)

## What's in the folder

* This folder contains all of the files necessary for your extension.
* `package.json` - this is the manifest file in which you declare your language support and define the location of the grammar file that has been copied into your extension.
* `syntaxes/ensemble.tmLanguage.json` - this is the Text mate grammar file that is used for tokenization.
* `language-configuration.json` - this is the language configuration, defining the tokens that are used for comments and brackets.

## Get up and running straight away

* Make sure the language configuration settings in `language-configuration.json` are accurate.
* Press `F5` to open a new window with your extension loaded.
* Create a new file with a file name suffix matching your language.
* Verify that syntax highlighting works and that the language configuration settings are working.

## Make changes

* You can relaunch the extension from the debug toolbar after making changes to the files listed above.
* You can also reload (`Ctrl+R` or `Cmd+R` on Mac) the VS Code window with your extension to load your changes.

## Add more language features

* To add features such as IntelliSense, hovers and validators check out the VS Code extenders documentation at <https://code.visualstudio.com/docs>

## Install your extension

### Step 1. Packaging

Creating a VSIX file, the distribution format for VS Code extensions, from your syntax highlighting extension generally involves using the vsce (VS Code Extensions) command-line tool.

First, ensure you have vsce installed globally using npm:

```bash
npm install -g vsce
```

Once installed, navigate to the root directory of your extension project (where your package.json resides). Then, use the following command to package your extension:

```bash
vsce package
```

This will create a .vsix file in your extension's directory. If you have a README.md or CHANGELOG.md in the root, those will automatically be included in the package. You can also customize the package creation process further. For example, to include specific assets or use a custom icon, consult the VS Code extension documentation on publishing extensions. The package.json file plays a critical role, containing metadata about your extension. Ensure it is properly configured.

If you encounter any errors during the packaging process, carefully review the output messages. They often provide clues about missing dependencies or configuration issues. A common issue is missing or incorrect information in the package.json, like the extension's name, publisher, or version. Make sure these are correctly defined.

### Step 2. Local Installation

You can install your VS Code extension locally in a few ways, primarily using the code command-line interface or directly through the VS Code UI.

#### Using the Command Line

If you have the code command available in your terminal (added during VS Code installation, typically), navigate to the directory containing your VS Code extension (the folder with the package.json file). Then, execute the following command:

```bash
code --install-extension ./
```

This command tells VS Code to install the extension located in the current directory. The `.` refers to the current directory. If your extension is packaged as a `.vsix` file, you can install it similarly:

```bash
code --install-extension ensemble-syntax-0.0.1.vsix
```

#### Using the VS Code UI

1. **From the Extensions View:** Open the Extensions view in VS Code (View -> Extensions or Ctrl+Shift+X). Click the "..." icon at the top of the Extensions view and select "Install from VSIX...". Navigate to the `.vsix` file of your extension and select it.

2. **Dragging and Dropping:** You can also drag and drop the `.vsix` file directly onto the Extensions view in VS Code. This will initiate the installation process.

These methods allow you to quickly install and test your VS Code extension locally during development. Remember to reload or restart VS Code after installation for the changes to take effect.
