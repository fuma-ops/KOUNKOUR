// Configuration Supabase — source unique.
//
// L'URL du projet et la clé "publishable" (anon) sont PUBLIQUES par conception :
// elles sont livrées dans le bundle navigateur et c'est la RLS (activée sur
// toutes les tables) qui protège les données. Les committer est le pattern
// standard Supabase et n'expose aucun secret.
//
// On lit d'abord les variables d'environnement (permet de changer de projet
// sans toucher au code, ex. staging/prod) ; à défaut, on retombe sur les
// valeurs publiques du projet KounKour pour que le déploiement fonctionne même
// sans configuration d'environnement.
//
// ⚠️ La clé service_role (secret réel) n'apparaît JAMAIS ici ni dans Git :
// elle reste exclusivement en variable d'environnement serveur (cahier §19).

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zcxkxqsqzwtdnrupxlah.supabase.co";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_YfuzhtBBjs7CM1YxjphZzQ__r3Q3VZM";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://kounkour-adaj72sjf-fuma-ops-projects.vercel.app";
