-- Phase 3b : date d'ouverture des candidatures (cahier §6 — statut "à venir" /
-- "prochainement", maquette liste concours "Ouverture : …").
-- Permet de dériver le statut d'affichage ouvert/prochainement/clôturé.

alter table public.contests add column opening_date date;
