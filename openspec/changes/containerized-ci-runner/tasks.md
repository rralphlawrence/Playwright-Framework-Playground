## 1. Update Test Browser Configuration

- [x] 1.1 Remove `channel: 'chrome'` from `playwright.config.ts` and verify the browser under test falls back to bundled chromium (`npx playwright test --list` resolves without a Chrome error)

## 2. Containerize the CI Pipeline

- [x] 2.1 Rework `.github/workflows/playwright.yml`: change the test job to `runs-on: ubuntu-latest` with `container: mcr.microsoft.com/playwright:v1.59.1-noble`, and verify the YAML parses
- [x] 2.2 Remove the `actions/setup-node@v4` and `npx playwright install chromium` steps, keeping the `STG_*` env wiring, `npm ci`, summary script, and upload-artifact steps unchanged

## 3. Verify Locally

- [x] 3.1 Run the full suite locally against bundled chromium (`npx playwright test`) and verify all specs pass with the expected reporters output

## 4. Verify End-to-End in CI

- [ ] 4.1 Push the branch, trigger the workflow on the pull request, and verify the job runs on ubuntu-latest inside the pinned container
- [ ] 4.2 Confirm the run is green and all three artifacts (`playwright-report`, `allure-results`, `test-results`) are uploaded
- [ ] 4.3 Confirm the scheduled and `workflow_dispatch` triggers still work unchanged

> **Deferred by user**: 4.1-4.3 require a GitHub push/PR and are left for the
> repository owner to verify manually. Implementation (tasks 1.1, 2.1, 2.2, 3.1)
> is complete and locally verified.