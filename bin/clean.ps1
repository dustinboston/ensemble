param (
    [string]$EnsembleBuildDir = "./src/ensemble/build",
    [string]$EnsembleSrcDir = "./src/ensemble",
    [string]$EnsembleBundleFile = "./bin/ensemble.js",
    [string]$EnsembleBinaryFile = "./bin/ensemble"
)

if (Test-Path -Path $EnsembleBuildDir -PathType Container) {
    Set-Location -Path $EnsembleSrcDir
    tsc --build --clean
}

if (Test-Path -Path $EnsembleBundleFile -PathType Leaf) {
    Remove-Item -Path $EnsembleBundleFile
}

if (Test-Path -Path $EnsembleBinaryFile -PathType Leaf) {
    Remove-Item -Path $EnsembleBinaryFile
}
