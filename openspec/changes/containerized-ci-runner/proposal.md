## Why

Today the CI pipeline runs the suite on a Windows VM where the workflow installs
Playwright's chromium, but the test config actually launches Google Chrome
(`channel: 'chrome'`). It works only because GitHub's Windows-hosted runners
happen to ship Chrome preinstalled. This accidental dependency makes the CI
execution environment implicit rather than pinned, forces a full browser install
on every run, and diverges from how other machines run the suite. Running the
tests inside the official Playwright Docker image makes the CI environment
reproducible, self-contained, and version-pinned.

## What Changes

- Migrate `.github/workflows/playwright.yml` from a `windows-latest` bare-metal
  job to a containerized `ubuntu-latest` job:
  - Add `container: mcr.microsoft.com/playwright:v1.59.1-noble` to the test job.
  - Remove the `actions/setup-node@v4` step (the image ships Node 23, matching
    the Node version CI uses today).
  - Remove the `npx playwright install chromium` step (browsers and their system
    dependencies are pre-baked into the image).
- Switch the browser under test from Google Chrome to Playwright's bundled
  chromium by removing `channel: 'chrome'` from `playwright.config.ts`.
- Keep unchanged: workflow triggers and schedule, `npm ci`, the `STG_*`
  secret/env wiring, the test-summary step, and the report artifact uploads.

**BREAKING**: The browser under test changes from Google Chrome to chromium —
in CI and in local runs alike, since both share `playwright.config.ts`.

## Capabilities

### New Capabilities

- `e2e/ci-execution`: How the E2E suite is executed in CI — a containerized
  Linux runtime pinned to the official Playwright image, chromium as the browser
  under test, secrets supplied exclusively through environment variables, and
  the report artifacts the pipeline must produce.

### Modified Capabilities

- (none — this repo has no existing specs yet)

## Impact

- `.github/workflows/playwright.yml` — job runner and container change; two
  steps removed (`setup-node`, browser install).
- `playwright.config.ts` — drops `channel: 'chrome'`; the browser falls back to
  Playwright's bundled chromium.
- CI execution moves to GitHub's Linux-hosted runners inside the pinned Docker
  image.
- Browser engine under test: Google Chrome -> chromium (same engine lineage;
  behavior near-identical for the saucedemo flows covered).
- No credential-handling changes; secrets remain environment-variable-only.