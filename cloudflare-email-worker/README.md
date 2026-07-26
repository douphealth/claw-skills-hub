# OpenClaw email Worker

Dedicated email backend for `openclaw-skillshub.com`.

## Scope and isolation

- Route: `openclaw-skillshub.com/api/email/*`
- Sender: `hello@openclaw-skillshub.com`
- Brevo list: `9` (`OpenClaw Skills Hub Subscribers`)
- Storage: dedicated `SubscriberStore` Durable Object
- Trigger: hourly sequence processor
- No Brevo delete operations
- No global email blacklist writes
- Unsubscribe only unlinks the contact from list `9`
- Runtime guards reject non-OpenClaw sender/list mutations

## Required secret

Set `BREVO_API_KEY` to the Brevo account that contains all three exact OpenClaw resources: authenticated domain, active sender, and list `9`. Never select a key merely because it authenticates.

## Verification

1. `GET /api/email/health` returns `ok: true`.
2. Invalid `POST /api/email/subscribe` returns HTTP 400 without creating a contact.
3. Controlled test submission receives confirmation.
4. Confirmation redirects to the canonical site and sends onboarding step 0.
5. The contact is present only in list `9` unless it already belonged to other lists.
6. Unsubscribe removes only list `9`; global blacklist remains unchanged.
7. Compare protected Brevo sender/domain/list IDs against the pre-change baseline.
