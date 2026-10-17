-- Security repair: public newsletter data is only accessed through server-side Edge Functions.
-- Follow with live RLS/API verification before declaring production safe.
BEGIN;

DROP POLICY IF EXISTS "Anyone can subscribe" ON public.subscribers;
DROP POLICY IF EXISTS "Read by confirmation token" ON public.subscribers;
DROP POLICY IF EXISTS "Service role can update subscribers" ON public.subscribers;
DROP POLICY IF EXISTS "Service role can insert events" ON public.email_events;
DROP POLICY IF EXISTS "Service role can read events" ON public.email_events;

ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_events ENABLE ROW LEVEL SECURITY;

REVOKE ALL PRIVILEGES ON TABLE public.subscribers FROM anon, authenticated;
REVOKE ALL PRIVILEGES ON TABLE public.email_events FROM anon, authenticated;

-- The original CHECK rejects actual event names emitted by subscribe,
-- confirm, and send-sequence, causing loss of deduplication tracking.
ALTER TABLE public.email_events
  DROP CONSTRAINT IF EXISTS email_events_event_type_check;

ALTER TABLE public.email_events
  ADD CONSTRAINT email_events_event_type_check
  CHECK (event_type IN (
    'sent', 'opened', 'clicked', 'bounced', 'unsubscribed',
    'confirmation_sent', 'confirmed',
    'sequence_step_0', 'sequence_step_1', 'sequence_step_2', 'sequence_step_3',
    'sequence_pending_1', 'sequence_pending_2', 'sequence_pending_3'
  ));

-- A sent sequence step should be recorded no more than once per subscriber.
CREATE UNIQUE INDEX IF NOT EXISTS email_events_unique_sequence_sends
  ON public.email_events (subscriber_id, event_type)
  WHERE event_type IN (
    'sequence_step_0', 'sequence_step_1',
    'sequence_step_2', 'sequence_step_3'
  );
COMMIT;
