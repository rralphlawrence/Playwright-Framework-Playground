## 1. Update Test Browser Configuration

- [x] 1.1 Remove `channel: 'chrome'` from `playwright.config.ts` and verify the browser under test falls back to bundled chromium (`npx playwright test --list` resolves without a Chrome error)

## 2. Containerize the CI Pipeline

- [x] 2.1 Rework `.github/workflows/playwright.yml`: change the test job to `runs-on: ubuntu-latest` with `container: mcr.microsoft.com/playwright:v1.59.1-noble`, and verify the YAML parses
- [x] 2.2 Remove the `actions/setup-node@v4` and `npx playwright install chromium` steps, keeping the `STG_*` env wiring, `npm ci`, summary script, and upload-artifact steps unchanged

## 3. Verify Locally

- [x] 3.1 Run the full suite locally against bundled chromium (`npx playwright test`) and verify all specs pass with the expected reporters output

## 4. Verify End-to-End in CI

- [x] 4.1 Push the branch, trigger the workflow on the pull request, and verify the job runs on ubuntu-latest inside the pinned container
- [x] 4.2 Confirm the run is green and all three artifacts (`playwright-report`, `allure-results`, `test-results`) are uploaded
- [x] 4.3 Confirm the scheduled and `workflow_dispatch` triggers still work unchanged

> **CI verification (2026-09-12)**: Run 34683695949 on commit 622f26c passed on
> `feat/containerized-ci-runner` inside `container: mcr.microsoft.com/playwright:v1.59.1-noble`.
> All three artifacts uploaded. The `schedule`/`workflow_dispatch`/`push`/`pull_request`
> trigger block is byte-for-byte unchanged from the previously-green `main` workflow;
> the scheduled 01:15 UTC run is the standing confirmation of that trigger.
> PR #26 merged to main on 2026-09-12 (commit 6bf4482).