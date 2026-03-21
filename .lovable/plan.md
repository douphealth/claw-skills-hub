

## Diagnosis

The **chat-assistant Edge Function was never deployed** to Supabase. The widget code exists in the frontend, but every request to `/functions/v1/chat-assistant` was failing silently because the function didn't exist on the server.

I just deployed it — the function is now live.

## What Still Needs to Happen

### 1. Verify the frontend is published
The chat widget code (`ChatWidget.tsx`, `EmailCaptureCard.tsx`, etc.) is in the codebase but needs to be published to your Lovable preview domain. Click **"Update"** in the publish dialog to push the latest frontend.

### 2. Confirm LOVABLE_API_KEY secret exists
The Edge Function requires a `LOVABLE_API_KEY` secret for the AI gateway. Without it, chat responses will fail with a 500 error.

**Action:** Check Supabase Dashboard → Settings → Edge Functions → Secrets and confirm `LOVABLE_API_KEY` is set.

### 3. Hard refresh the preview
After publishing, do a hard refresh (Ctrl+Shift+R / Cmd+Shift+R) to bypass any cached assets.

---

## Technical Summary

| Component | Status |
|-----------|--------|
| `chat-assistant` Edge Function | ✅ Just deployed |
| `subscribe` Edge Function | Needs verification |
| Frontend widget code | Exists — needs publish |
| `LOVABLE_API_KEY` secret | Needs verification |

## Implementation Steps

1. **Deploy the `subscribe` function** too (used by email capture card)
2. **Verify secrets** — `LOVABLE_API_KEY` and `RESEND_API_KEY` must be set in Supabase Edge Function secrets
3. **Publish frontend** — click Update in the publish dialog
4. **Test end-to-end** — open widget, send a message, trigger email capture, submit email

