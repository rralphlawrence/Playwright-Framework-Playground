const fs = require('fs');
const path = require('path');

/**
 * Reads Playwright JSON test results and generates a GitHub Actions summary.
 */
function generateSummary() {
  const resultsPath = path.join(__dirname, '..', 'test-results', 'results.json');

  if (!fs.existsSync(resultsPath)) {
    console.log('No test results found at:', resultsPath);
    process.exit(1);
  }

  const raw = fs.readFileSync(resultsPath, 'utf-8');
  const report = JSON.parse(raw);

  const suites = report.suites || [];
  const totalTests = report.stats?.expected || 0;
  const totalFailed = report.stats?.unexpected || 0;
  const totalSkipped = report.stats?.skipped || 0;
  const totalPassed = totalTests - totalFailed;
  const totalDuration = report.stats?.duration || 0;

  // Collect all test results
  const results = [];
  function walkSuite(suite) {
    if (suite.specs) {
      for (const spec of suite.specs) {
        for (const test of spec.tests) {
          results.push({
            title: spec.title,
            file: spec.file || suite.title,
            status: test.status,
            duration: test.duration || 0,
            error: test.errors?.[0]?.message,
          });
        }
      }
    }
    if (suite.suites) {
      for (const s of suite.suites) {
        walkSuite(s);
      }
    }
  }

  for (const suite of suites) {
    walkSuite(suite);
  }

  // Build summary
  const lines = [];

  // Overall status badge
  if (totalFailed === 0) {
    lines.push(`# ✅ All Tests Passed`);
  } else {
    lines.push(`# ❌ ${totalFailed} Test(s) Failed`);
  }

  lines.push('');
  lines.push('## Test Summary');
  lines.push('');
  lines.push('| Metric | Value |');
  lines.push('|--------|-------|');
  lines.push(`| **Total** | ${results.length} |`);
  lines.push(`| **Passed** | ${totalPassed} |`);
  lines.push(`| **Failed** | ${totalFailed} |`);
  lines.push(`| **Skipped** | ${totalSkipped} |`);
  lines.push(`| **Duration** | ${formatDuration(totalDuration)} |`);
  lines.push('');

  // Results table
  lines.push('## Test Results');
  lines.push('');
  lines.push('| Status | Test | Duration |');
  lines.push('|--------|------|----------|');

  for (const r of results) {
    const icon = r.status === 'expected' ? '✅' : r.status === 'unexpected' ? '❌' : '⏭️';
    const testName = r.title.length > 80 ? r.title.substring(0, 77) + '...' : r.title;
    lines.push(`| ${icon} | ${testName} | ${formatDuration(r.duration)} |`);
  }

  lines.push('');

  // Artifact download links
  lines.push('## Artifacts');
  lines.push('');
  lines.push('- 📊 [Download HTML Report](./playwright-report/index.html)');
  lines.push('- 📈 [Download Allure Report](./allure-report/index.html)');
  lines.push('');

  // Error details if any
  const failures = results.filter(r => r.status === 'unexpected');
  if (failures.length > 0) {
    lines.push('## Failure Details');
    lines.push('');
    lines.push('<details>');
    lines.push('<summary>Click to expand failure details</summary>');
    lines.push('');
    for (const f of failures) {
      lines.push(`### ❌ ${f.title}`);
      lines.push('');
      lines.push('```');
      lines.push(f.error || 'No error message');
      lines.push('```');
      lines.push('');
    }
    lines.push('</details>');
    lines.push('');
  }

  const summary = lines.join('\n');

  // Write to GITHUB_STEP_SUMMARY if in CI, otherwise print to console
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;
  if (summaryPath) {
    fs.writeFileSync(summaryPath, summary, 'utf-8');
    console.log('Summary written to GITHUB_STEP_SUMMARY');
  } else {
    console.log('=== GITHUB ACTIONS SUMMARY ===');
    console.log(summary);
    console.log('=== END SUMMARY ===');
  }
}

function formatDuration(ms) {
  if (!ms) return '0s';
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }
  return `${remainingSeconds}s`;
}

generateSummary();