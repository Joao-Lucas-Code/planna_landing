-- ==========================================
-- RLS para a tabela cadastros_lp (waitlist da landing)
-- ==========================================
-- O LeadForm.js faz INSERT direto do browser usando a anon key.
-- Por isso o RLS precisa:
--   - permitir INSERT anonimo (qualquer visitante entra na lista)
--   - BLOQUEAR SELECT/UPDATE/DELETE anonimo (ninguem le/apaga os leads)
--
-- Verificado empiricamente em 2026-07-23 via API REST com a anon key:
--   INSERT -> 201 | SELECT -> [] | DELETE -> 0 linhas afetadas
--
-- Como aplicar: cole no SQL Editor do dashboard do Supabase
-- (Database > SQL Editor) ou rode via `supabase db execute`.

-- 1. Garante que o RLS esta ligado
ALTER TABLE public.cadastros_lp ENABLE ROW LEVEL SECURITY;

-- 2. Remove policies antigas conflitantes, se existirem
DROP POLICY IF EXISTS "allow_anon_insert" ON public.cadastros_lp;
DROP POLICY IF EXISTS "deny_anon_select" ON public.cadastros_lp;

-- 3. Permite INSERT para anon e authenticated
--    (WITH CHECK true = qualquer linha pode ser inserida)
CREATE POLICY "allow_anon_insert"
  ON public.cadastros_lp
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 4. NAO crie policy de SELECT/UPDATE/DELETE para anon.
--    Sem policy explicita, o RLS bloqueia tudo por padrao.
--    A leitura dos leads deve ser feita apenas:
--      - pelo dashboard do Supabase (usuario logado), ou
--      - por backend usando a service_role key (que ignora RLS).

-- 5. (Opcional, recomendado) Impede emails duplicados.
--    O LeadForm trata o erro 23505 e mostra "Voce ja esta na lista!".
--    Descomente se ainda nao existir constraint unique:
-- ALTER TABLE public.cadastros_lp
--   ADD CONSTRAINT cadastros_lp_email_unique UNIQUE (email);
