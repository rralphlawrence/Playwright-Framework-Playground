param(
    [string]$ReportPath = "test-results/junit.xml"
)

if (-not (Test-Path $ReportPath)) {
    Add-Content -Path $env:GITHUB_STEP_SUMMARY -Value "## Test Run Summary`n`nNo test results found. Tests may have failed to run."
    exit 0
}

[xml]$xml = Get-Content $ReportPath

$total = 0
$failures = 0
$skipped = 0

foreach ($suite in $xml.testsuites.testsuite) {
    $total += [int]$suite.tests
    $failures += [int]$suite.failures
    $skipped += [int]$suite.skipped
}
$passed = $total - $failures - $skipped

$summaryLines = @()
$summaryLines += "## Test Run Summary"
$summaryLines += ""
$summaryLines += "| Status | Count |"
$summaryLines += "|--------|-------|"
$summaryLines += "| :white_check_mark: Passed | $passed |"
$summaryLines += "| :x: Failed | $failures |"
$summaryLines += "| :next_track_button: Skipped | $skipped |"
$summaryLines += "| **Total** | **$total** |"
$summaryLines += ""

Add-Content -Path $env:GITHUB_STEP_SUMMARY -Value ($summaryLines -join "`n")

# Collect all failed testcases across all suites
$failedTests = @()
foreach ($suite in $xml.testsuites.testsuite) {
    foreach ($test in $suite.testcase) {
        if ($test.failure -or $test.error) {
            $failedTests += @{
                Name = $test.name
                Suite = $suite.name
                Message = ($test.failure.message -replace '\|', '\|' -replace '\n', ' ').Substring(0, [Math]::Min(100, $test.failure.message.Length))
            }
        }
    }
    if ($suite.testsuite) {
        foreach ($nestedSuite in $suite.testsuite) {
            foreach ($test in $nestedSuite.testcase) {
                if ($test.failure -or $test.error) {
                    $failedTests += @{
                        Name = $test.name
                        Suite = $nestedSuite.name
                        Message = ($test.failure.message -replace '\|', '\|' -replace '\n', ' ').Substring(0, [Math]::Min(100, $test.failure.message.Length))
                    }
                }
            }
        }
    }
}

if ($failedTests.Count -gt 0) {
    $failureLines = @()
    $failureLines += ""
    $failureLines += "## :x: Failed Tests"
    $failureLines += ""
    $failureLines += "| Test | Suite | Error |"
    $failureLines += "|------|-------|-------|"
    foreach ($ft in $failedTests) {
        $failureLines += "| $($ft.Name) | $($ft.Suite) | $($ft.Message) |"
    }
    Add-Content -Path $env:GITHUB_STEP_SUMMARY -Value ($failureLines -join "`n")
}