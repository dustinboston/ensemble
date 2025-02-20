$Python = "python"
$BinDir = "./bin"
$EnsembleTestsDir = "./src/ensemble/tests"
$RunTestScript = Join-Path -Path $BinDir -ChildPath "runtest.py"
$StepAMalFile = Join-Path -Path $EnsembleTestsDir -ChildPath "stepA_mal.mal"
$RunBinary = Join-Path -Path $BinDir -ChildPath "run"

# Execute the command
& $Python $RunTestScript --deferrable --optional $StepAMalFile -- $RunBinary
