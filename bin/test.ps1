# Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

$EnsembleBuildDir = "./src/ensemble/build"
$QjsBinaryFile = "./bin/qjs.exe"

# Find all *_test.js files in the build directory and execute them with QuickJS
Get-ChildItem -Path $EnsembleBuildDir -Recurse -Filter '*_test.js' | ForEach-Object {
    & $QjsBinaryFile $_.FullName
}
