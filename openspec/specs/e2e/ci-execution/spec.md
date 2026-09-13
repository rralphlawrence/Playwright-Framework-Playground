# e2e/ci-execution Specification

## Purpose

Defines the contract for executing the E2E suite in CI: a containerized Linux runtime pinned to the official Playwright image, bundled chromium as the browser under test, credentials supplied exclusively through environment variables, and the report artifacts the pipeline must produce.

## Requirements

### Requirement: CI runs in a pinned Linux container
The test job SHALL execute inside the official Playwright Docker container image, pinned to the Playwright version in use by the project, on a Linux-hosted runner.

#### Scenario: Tests start inside the pinned container
- **WHEN** the CI pipeline triggers the test job
- **THEN** the job runs inside the pinned Playwright container on a Linux runner

#### Scenario: Browser builds match the package version
- **WHEN** the container image Playwright version differs from the project's locked package version
- **THEN** Playwright SHALL fail clearly when locating browser executables rather than running against an untested browser mix

### Requirement: Browser under test is bundled chromium
The suite SHALL run against Playwright's bundled chromium browser. Google Chrome SHALL NOT be required anywhere in the execution path.

#### Scenario: Tests launch bundled chromium
- **WHEN** a test starts a browser
- **THEN** it launches the bundled chromium build for the pinned Playwright version

#### Scenario: No Google Chrome present
- **WHEN** the suite runs in CI or locally without Google Chrome installed
- **THEN** the tests SHALL still run successfully using bundled chromium

### Requirement: Credentials are supplied via environment variables
Test credentials SHALL be provided to the test process exclusively through environment variables and SHALL NOT be committed to the repository or baked into a container image.

#### Scenario: CI supplies staging credentials
- **WHEN** STG_USERNAME and STG_PASSWORD are present in the job environment
- **THEN** login flows authenticate with those values

#### Scenario: No credentials inside the runtime
- **WHEN** the container image and repository contents are inspected
- **THEN** they SHALL contain no test credentials

### Requirement: Report artifacts are produced and uploaded
The pipeline SHALL produce the HTML report, Allure results, and JSON test results, and the workflow SHALL upload them as downloadable artifacts after every scheduled, manual, and push-triggered run.

#### Scenario: Artifacts are uploaded after the run
- **WHEN** the test job finishes
- **THEN** playwright-report, allure-results, and test-results are uploaded as GitHub Actions artifacts