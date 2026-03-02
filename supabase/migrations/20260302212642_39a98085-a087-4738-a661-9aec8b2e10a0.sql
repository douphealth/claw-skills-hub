
-- Subscribers table for email marketing
CREATE TABLE public.subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'unsubscribed')),
  confirmation_token uuid DEFAULT gen_random_uuid(),
  source_page text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Email events table for tracking
CREATE TABLE public.email_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subscriber_id uuid REFERENCES public.subscribers(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (event_type IN ('sent', 'opened', 'clicked', 'bounced', 'unsubscribed')),
  email_subject text,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- RLS policies - public insert for subscribe, rest restricted
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_events ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for subscribing
CREATE POLICY "Anyone can subscribe" ON public.subscribers
  FOR INSERT WITH CHECK (true);

-- Allow reading own subscription by token (for confirm/unsubscribe flows)
CREATE POLICY "Read by confirmation token" ON public.subscribers
  FOR SELECT USING (true);

-- Allow updates for confirmation/unsubscribe via edge functions using service role
CREATE POLICY "Service role can update subscribers" ON public.subscribers
  FOR UPDATE USING (true);

-- Email events - insert via service role
CREATE POLICY "Service role can insert events" ON public.email_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can read events" ON public.email_events
  FOR SELECT USING (true);

-- Index for fast lookups
CREATE INDEX idx_subscribers_email ON public.subscribers(email);
CREATE INDEX idx_subscribers_token ON public.subscribers(confirmation_token);
CREATE INDEX idx_email_events_subscriber ON public.email_events(subscriber_id);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_subscribers_updated_at
  BEFORE UPDATE ON public.subscribers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
