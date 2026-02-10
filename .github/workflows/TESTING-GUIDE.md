# Self-Healing CI Testing Guide

## Overview

This guide provides step-by-step instructions for testing the self-healing CI workflow.

## Prerequisites

Before testing:

1. ✅ The workflow file `.github/workflows/self-healing-ci.yml` is merged to `main`
2. ✅ The `copilot` user has access to the repository (or error handling will create issues without assignee)
3. ✅ You have permission to push to `main` or merge PRs
4. ✅ You understand that this testing will intentionally break CI on `main`

## Test Plan

### Test 1: Basic Issue Creation

**Objective**: Verify that a CI failure on `main` creates an issue with correct structure.

**Steps**:

1. Create a feature branch:
   ```bash
   git checkout -b test/break-ci-1
   ```

2. Intentionally break a test or build. For example, add a syntax error to a file:
   ```bash
   echo "syntax error here!!!" >> src/app/page.jsx
   ```

3. Commit and push:
   ```bash
   git add .
   git commit -m "Test: intentionally break CI"
   git push origin test/break-ci-1
   ```

4. Create a PR and merge it to `main` (or push directly to `main` if you have permission)

5. Wait for CI to fail (should take 1-2 minutes)

6. Wait for self-healing workflow to run (triggers after CI completes)

7. Check the Issues tab

**Expected Result**:
- ✅ A new issue is created with title: `[CI Fix] Build failure on \`main\` (<SHA>)`
- ✅ Issue has labels: `ci-fix`, `automated`
- ✅ Issue is assigned to `copilot` (or unassigned if error handling kicked in)
- ✅ Issue body contains:
  - Link to failed workflow run
  - Branch name (`main`)
  - Commit SHA
  - Clear instructions
  - Failure logs in code blocks

### Test 2: Duplicate Detection

**Objective**: Verify that a second failure adds a comment instead of creating a new issue.

**Steps**:

1. **Before fixing the issue from Test 1**, push another breaking change to `main`:
   ```bash
   git checkout main
   git pull
   echo "another error" >> src/app/layout.jsx
   git add .
   git commit -m "Test: second CI failure"
   git push origin main
   ```

2. Wait for CI to fail again

3. Wait for self-healing workflow to run

4. Check the Issues tab

**Expected Result**:
- ✅ NO new issue is created
- ✅ A comment is added to the existing issue
- ✅ Comment has title: `## New CI Failure`
- ✅ Comment contains new failure logs

### Test 3: Escalation After 3 Attempts

**Objective**: Verify that after 3 comments, the workflow adds `needs-human` label.

**Steps**:

1. Push a third breaking change to `main`:
   ```bash
   git checkout main
   git pull
   echo "third error" >> src/lib/articles.js
   git add .
   git commit -m "Test: third CI failure"
   git push origin main
   ```

2. Wait for CI to fail and self-healing workflow to run

3. Check that a 3rd comment was added

4. Push a fourth breaking change:
   ```bash
   echo "fourth error" >> README.md
   git add .
   git commit -m "Test: fourth CI failure"
   git push origin main
   ```

5. Wait for CI to fail and self-healing workflow to run

**Expected Result**:
- ✅ After 3rd failure: Comment is added (3 comments total)
- ✅ After 4th failure:
  - `needs-human` label is added to the issue
  - A warning comment is added: "⚠️ This issue has failed to resolve after 3 automated attempts..."
  - No more failure logs are added

### Test 4: Feature Branch Failures (Should NOT Trigger)

**Objective**: Verify that CI failures on feature branches don't create issues.

**Steps**:

1. Create a feature branch:
   ```bash
   git checkout -b test/feature-branch
   ```

2. Break something:
   ```bash
   echo "error" >> src/app/page.jsx
   git add .
   git commit -m "Test: break feature branch"
   git push origin test/feature-branch
   ```

3. Create a PR (but don't merge it)

4. Wait for CI to fail on the PR

**Expected Result**:
- ✅ CI fails on the feature branch
- ✅ Self-healing workflow does NOT run
- ✅ No issue is created

### Test 5: Cleanup and Restore

**Objective**: Fix the intentional breakages and verify the system works normally.

**Steps**:

1. Close the test issue manually

2. Revert all the breaking changes:
   ```bash
   git checkout main
   git pull
   git revert HEAD~4..HEAD  # Revert the last 4 commits
   git push origin main
   ```

3. Wait for CI to pass

4. Verify no new issues are created

**Expected Result**:
- ✅ CI passes successfully
- ✅ No new issues are created
- ✅ System is back to normal state

## Troubleshooting

### Issue Not Created

**Check**:
- Was the failure on the `main` branch? (Use `git log` to verify)
- Did the CI workflow fail? (Check Actions tab)
- Did the self-healing workflow run? (Check Actions → Self-Healing CI)
- Are there any error messages in the workflow logs?

**Common Causes**:
- Workflow hasn't been merged to `main` yet
- Permissions issue with `GITHUB_TOKEN`
- The `copilot` user doesn't exist and error handling failed

### Multiple Issues Created

**This indicates a bug in duplicate detection.**

**Check**:
- Are both issues labeled with `ci-fix` and `automated`?
- Check the "Check for existing issue" step logs in the workflow

### Copilot Not Fixing the Issue

**Note**: Testing Copilot's actual fix requires Copilot access and is outside the scope of this workflow test.

If Copilot doesn't respond:
- Verify `copilot` user has access to the repo
- Verify the issue is properly assigned
- Check if Copilot is enabled for your organization

## Test Checklist

Use this checklist when testing:

- [ ] Test 1: Basic issue creation works
- [ ] Test 2: Duplicate detection works
- [ ] Test 3: Escalation after 3 attempts works
- [ ] Test 4: Feature branches don't trigger workflow
- [ ] Test 5: Cleanup completed successfully
- [ ] Labels are created correctly
- [ ] Issue structure matches template
- [ ] Logs are truncated appropriately
- [ ] Permissions are minimal
- [ ] No security issues detected

## Post-Test Validation

After completing all tests:

1. Review the workflow run logs in Actions
2. Verify no sensitive information was leaked in issues
3. Confirm all test issues are closed
4. Confirm `main` branch is clean and CI is passing
5. Document any issues or improvements needed

## Notes

- Testing on `main` is inherently risky. Consider using a dedicated test repository if available.
- Always communicate with your team before intentionally breaking `main`.
- Keep test periods short to minimize disruption.
- Have a rollback plan ready.
