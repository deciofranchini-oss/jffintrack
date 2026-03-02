-- Family Fintrack - DB Updates (Transfers, Card Payment, Initial Balance)
-- Execute in Supabase SQL Editor

-- 1) Accounts: store initial balance separately (keeps current balance as cache)
ALTER TABLE public.accounts
  ADD COLUMN IF NOT EXISTS initial_balance numeric NOT NULL DEFAULT 0;

-- If you already used accounts.balance as "saldo inicial", migrate it:
UPDATE public.accounts
SET initial_balance = COALESCE(initial_balance, balance, 0)
WHERE initial_balance IS NULL OR initial_balance = 0;

-- 2) Transactions: distinguish transfer types (regular transfer vs credit-card payment)
ALTER TABLE public.transactions
  ADD COLUMN IF NOT EXISTS transfer_kind text;

-- Default existing transfer rows to 'transfer'
UPDATE public.transactions
SET transfer_kind = 'transfer'
WHERE is_transfer = true AND (transfer_kind IS NULL OR transfer_kind = '');

-- 3) Scheduled transactions: enable transfers + card payments
ALTER TABLE public.scheduled_transactions
  ADD COLUMN IF NOT EXISTS transfer_to_account_id uuid,
  ADD COLUMN IF NOT EXISTS transfer_kind text;

-- Optional: set defaults for existing rows
UPDATE public.scheduled_transactions
SET transfer_kind = NULL
WHERE transfer_kind = '';

-- Notes:
-- • For scheduled transfers / card payments, we will use:
--   type IN ('transfer','cc_payment')
--   transfer_to_account_id populated
--   transfer_kind = 'transfer' or 'cc_payment'
