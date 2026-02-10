# Self-Healing CI System

## Overview

The self-healing CI system automatically creates GitHub issues when CI fails on the `main` branch and assigns them to GitHub Copilot's coding agent. Copilot then autonomously analyzes the failure, fixes the code, and opens a pull request.

## Prerequisites

Before the workflow can function properly:

1. **GitHub Copilot Access**: Ensure the `copilot` user has access to your repository
   - Add `copilot` as a collaborator with write permissions
   - Or configure GitHub Copilot for your organization

2. **Repository Permissions**: The `GITHUB_TOKEN` must have the required permissions (already configured in the workflow)

**Note**: If the `copilot` user doesn't exist or lacks access, issue creation will fail. You can modify line 194 of the workflow to assign to a different user or remove the assignee if needed.

## How It Works

### Trigger

The workflow triggers when the main CI workflow completes with a failure status on the `main` branch only. Feature branch failures are not processed—developers are responsible for fixing those.

### Process

1. **Check for existing issues**: Looks for open issues with both `ci-fix` and `automated` labels
2. **Fetch failure logs**: Downloads logs from all failed jobs in the workflow run
3. **Create or update issue**:
   - If no existing issue: Creates a new issue with failure logs
   - If issue exists: Adds a comment with new failure logs
   - If 3+ comments exist: Adds `needs-human` label and stops

### Issue Structure

Issues created by the workflow include:

- **Title**: `[CI Fix] Build failure on \`main\` (<short SHA>)`
- **Labels**: `ci-fix`, `automated`
- **Assignee**: `copilot`
- **Body**:
  - Link to failed workflow run
  - Branch and commit SHA
  - Clear instructions for Copilot
  - Truncated failure logs (last 200 lines per job)

### Rate Limiting

The workflow includes safety mechanisms:

- **Duplicate detection**: Never creates multiple issues for the same failure
- **Retry limit**: Stops after 3 automated fix attempts
- **Escalation**: Adds `needs-human` label when human intervention is required
- **Self-protection**: Does not create issues for failures in the self-healing workflow itself

## Labels

The workflow automatically creates these labels if they don't exist:

| Label | Color | Description |
|-------|-------|-------------|
| `ci-fix` | `#d73a4a` (red) | Automated CI failure fix request |
| `automated` | `#0e8a16` (green) | Created by automation |
| `needs-human` | `#e99695` (pink) | Requires human intervention |

## Permissions

The workflow requires minimal permissions:

```yaml
permissions:
  issues: write  # Create and update issues
  actions: read  # Read workflow run data
  checks: read   # Read check run status
```

## Testing

To test the workflow:

1. **Test issue creation**:
   - Intentionally break a test on a feature branch
   - Merge to `main`
   - Verify an issue is created with correct logs and Copilot assignment

2. **Test duplicate detection**:
   - Push a second failing commit before Copilot fixes the first
   - Verify a comment is added instead of creating a new issue

3. **Test escalation**:
   - Let the workflow add 3 comments to an issue
   - Verify the `needs-human` label is added on the 4th failure

## What It Does NOT Do

- ❌ Does not run on feature branches
- ❌ Does not create issues for cancelled workflows
- ❌ Does not bypass branch protection or deploy safety
- ❌ Does not auto-merge without CI passing
- ❌ Does not create issues for failures in other workflows (including itself)

## Future Enhancements

### Auto-merge Copilot's fixes (optional)

To achieve true self-healing, you could add a second workflow that:

1. Triggers on PRs from `copilot/**` branches
2. Waits for CI to pass
3. Auto-approves and enables auto-merge if CI passes

**Important**: This requires a GitHub App or bot account for approval, as workflows using `GITHUB_TOKEN` cannot approve their own PRs.

**Options**:
- Create a GitHub App with approval permissions
- Use a bot account with reviewer access
- Skip auto-merge and rely on manual review (current approach)

**Tradeoffs**:
- GitHub App: Most secure, requires setup and maintenance
- Bot account: Simpler, but requires managing credentials
- Manual review: Safest, but requires human attention

## Troubleshooting

### Issue not created

Check:
- Was the failure on the `main` branch?
- Was it the CI workflow that failed?
- Does the workflow have proper permissions?

### Multiple issues created

This indicates a bug in the duplicate detection logic. The workflow should always check for existing open issues with `ci-fix` and `automated` labels before creating a new one.

### Copilot not assigned

Verify:
- The user `copilot` exists and has access to the repository
- The workflow has `issues: write` permission

## Security Considerations

- The workflow only has minimal required permissions
- Failure logs are truncated to prevent information leakage
- No secrets or sensitive data are included in issue bodies
- The workflow cannot bypass branch protection rules
