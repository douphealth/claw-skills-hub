
Goal: make the latest changes reliably appear on the website and remove the “stale deploy” loop.

What I found (from code + live fetch):
1) Current code includes `ChatWidget` in `src/App.tsx` (line ~89), so the floating assistant should appear.
2) Live site snapshot (`openclaw-skillshub.com`) does not show that widget, which indicates the live frontend bundle is older than current code.
3) Your current preview route is `/index`, but the app only defines `/` (not `/index`). That can show the wrong page/state and make it feel like updates didn’t apply.
4) Production deploy is separate (GitHub Actions → Cloudflare Pages) from Lovable publish flow, so either publish path can be “up” while the other is stale.

Implementation plan:
1) Fix routing ambiguity
- Add a redirect route from `/index` → `/` so opening `/index` never shows stale/incorrect state.

2) Add build fingerprint visibility
- Inject a small build/version marker (commit hash + build time) in the UI footer and in console startup logs.
- This makes it instantly obvious whether the page is running the new build.

3) Harden deploy verification
- Ensure both deployment paths expose the same version marker:
  - Lovable published URL (`claw-compass.lovable.app`)
  - Production domain (`openclaw-skillshub.com`)
- If versions differ, we know immediately it is a CI/CD sync issue, not caching.

4) Add deployment guardrails
- Update CI workflow to emit deployed commit SHA in logs/artifact.
- Add a quick post-deploy check script that fetches homepage and validates the expected build marker exists.

5) Validation checklist after rollout
- Open `/` (not `/index`) on both domains.
- Confirm same build marker on both.
- Confirm ChatWidget FAB is visible at bottom-right.
- Confirm assistant request reaches `/functions/v1/chat-assistant`.

Technical details:
- Root issue is most likely stale frontend artifact in one deployment path, not runtime widget logic.
- `/index` is a concrete routing bug and should be normalized.
- Build fingerprinting is the fastest long-term fix for “I updated but don’t see it” incidents.
