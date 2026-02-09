# Add Newsletter Signup Integration

## Summary
Add a newsletter signup form to capture email subscribers interested in Mitchell's AI/product writing.

## Why
The site has great content but no way to capture interested readers:
- Build an owned audience list
- Notify subscribers of new articles
- Enable deeper engagement with readers

## Acceptance Criteria
- [ ] Add newsletter signup component to the site
- [ ] Place on homepage and article pages
- [ ] Integrate with email service (Resend, Buttondown, or ConvertKit)
- [ ] Show success/error states
- [ ] Ensure GDPR-compliant with proper consent text

## Technical Notes
- Check if Resend is already configured (see env vars)
- Could use Buttondown for simple setup
- Add API route to handle subscriptions
- Consider double opt-in for quality

## Priority
Medium - Audience building, straightforward implementation
