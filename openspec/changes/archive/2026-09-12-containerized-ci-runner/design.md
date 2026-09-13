## Context

See proposal.md for the motivation. The current CI job runs on a
`windows-latest` VM where the workflow installs Playwright's chromium but
`playwright.config.ts` launches real Google Chrome via `channel: 'chrome'`.
That combination only works because GitHub's Windows runners preinstall Chrome.
The official Playwright Docker image ships bundled browsers and their system
dependencies but NOT Google Chrome. The image's Node version (23) matches the
Node version the current workflow installs (23), and the project pins Playwright
1.59.1, which has a matching published image tag (`v1.59.1-noble`, verified in
the MCR registry).

## Goals / Non-Goals

**Goals:**
- Run the E2E suite inside the official Playwright container image in CI.
- Keep the workflow diff minimal and the pipeline no harder to operate than today.
- Preserve the existing report artifacts and secret handling.

**Non-Goals:**
- Local containerized development (`docker compose` on a dev machine) - explicitly out of scope for this change.
- A custom Dockerfile / image build pipeline.
- Multi-browser matrix (the suite is chromium-only today).
- Migrating the cmd-syntax `package.json` scripts (e.g. `allure:clean`) - local-only conveniences, not used in CI.

## Decisions

### D1: Use the official image at the GitHub Actions job level
The test job gets `container: mcr.microsoft.com/playwright:v1.59.1-noble` and
`runs-on: ubuntu-latest`. Every step then executes inside the container.
- Alternative: a custom Dockerfile built in CI. Rejected: bundled chromium is
  already in the official image, nothing project-specific needs baking in, and a
  custom image adds a build/publish pipeline for no gain.
- Alternative: `docker run` steps on bare ubuntu. Rejected: the `container:`
  job key is simpler and keeps checkout + artifact upload working through the
  automatic workspace mount.

### D2: Drop `channel: 'chrome'`, use bundled chromium
`channel: 'chrome'` is removed from `playwright.config.ts`; Playwright falls
back to its bundled chromium. Verified facts behind this:
- The official image contains chromium but not Google Chrome.
- Bundled chromium runs as root without `--no-sandbox` (the image's default root
  user is fine for trusted E2E per Playwright docs); real Chrome-as-root would
  abort without `--no-sandbox`.
- Alternative considered: keep `channel: 'chrome'` and run
  `npx playwright install chrome` in CI, adding `--no-sandbox`. Preserves
  literal Chrome parity but slows every run (install ~1-2 min) or forces a
  custom image to cache it. The chosen direction is bundled chromium.
- Consequence: local runs also switch to chromium, keeping local and CI in
  lockstep (both read the same config).

### D3: Pin the image tag to the project's Playwright version
`v1.59.1-noble` matches `package-lock.json`'s `@playwright/test` 1.59.1. The
image contains the browser builds for that exact version, so no browser install
step is needed. Node 23 in the image matches today's `setup-node@v4` with
`node-version: 23`.

### D4: Keep secret wiring and artifact uploads unchanged
`STG_*` job-level env vars still flow into the container's environment and
through `dataobjects/config.ts` unchanged. GitHub Actions mounts the workspace
into the container automatically, so all `actions/upload-artifact@v4` steps
keep working as-is.

## Risks / Trade-offs

- [Browser engine changes Google Chrome -> chromium] -> Near-identical engine;
  the saucedemo assertions are DOM-based and unaffected. Revisit if a future
  feature depends on Chrome-specific behavior.
- [Node version drift: local dev (22) vs container (23)] -> Both satisfy
  @playwright/test's Node >=18 requirement; the pin matches the current CI Node.
- [Chrome-specific launch args] -> The remaining args (`--start-maximized`,
  `--disable-blink-features=AutomationControlled`) are chromium-compatible and
  kept.
- [Image tag drift / removal] -> Tag is pinned; upgrades become intentional,
  coordinated with the Playwright version bump.
- [Windows-specific script syntax in package.json is not portable] -> Not used
  in CI; local Windows users are unaffected. A future "local Docker" effort
  would need portable scripts.

## Migration Plan

1. Edit `playwright.config.ts` to remove `channel: 'chrome'`.
2. Rework `.github/workflows/playwright.yml` to the containerized job.
3. Verify locally (Windows): run `npx playwright test` with bundled chromium to
   confirm the suite passes without Google Chrome.
4. Push the branch; the workflow runs on the pull request; confirm green,
   including all three artifact uploads.
5. Rollback: revert the two files; the workflow returns to windows-latest.

## Open Questions

None.