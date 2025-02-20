# Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

$BinDir = "./bin"
$EnsembleSrcDir = "./src/ensemble"
$EnsembleBuildDir = "$EnsembleSrcDir/build"
$EnsembleBundleFile = "$BinDir/ensemble.js"
$EnsembleBinaryFile = "$BinDir/ensemble"
$QjsBinaryFile = "$BinDir/qjs.exe"
$Node = "npx -y"

# Bundle Typescript into a single file
& $Node esbuild "$EnsembleSrcDir/cli.ts" --outfile="$EnsembleBundleFile" --bundle --format=esm --minify --platform=neutral --target=esnext --external:qjs:* --main-fields=main,module

# Compile the ensemble.js interpreter into a standalone binary
& $QjsBinaryFile --std --module --out "$EnsembleBinaryFile" --compile "$EnsembleBundleFile"

# Compile all of the Typescript files to JavaScript in the build directory
Set-Location -Path $EnsembleSrcDir
& $Node tsc --build
