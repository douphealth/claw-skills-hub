
-- Fix: Drop the overly permissive public policy on mc_credentials
DROP POLICY IF EXISTS "allow_all_mc" ON public.mc_credentials;

-- Create restrictive policies that only allow service_role access
-- (service_role bypasses RLS entirely, so no explicit policy needed;
--  with RLS enabled and no permissive policies, anon/authenticated get zero access)
