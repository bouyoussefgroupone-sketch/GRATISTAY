# GRATISTAY

Plateforme internationale de recherche, composition et reservation de sejours avec moteur "Bonus Stay" masquant les couts hoteliers internes tout en laissant l'admin piloter les regles de marge et de progression.

## Stack retenue

- `Next.js 16` avec App Router et TypeScript
- `React 19`
- `Tailwind CSS 4`
- `Prisma` + `PostgreSQL`
- `Zod` pour la validation serveur
- `lucide-react` pour l'iconographie

## Ce qui est livre dans cette premiere base

- Front client multi-pages: accueil, recherche, fiche hotel, page Puzzle / Bonus Stay, panier, compte, support.
- Back-office admin: dashboard, destinations, hotels, activites, reservations, support, campagnes, reglages Puzzle.
- Moteur de progression `src/lib/puzzle-engine.ts` separant les indicateurs visibles client et les indicateurs internes.
- Matrice de roles et permissions `src/lib/permissions.ts`.
- Schema Prisma complet pour les entites coeur du produit.
- API routes d'exemple pour le calcul Puzzle et la creation de tickets support.
- Middleware de securite ajoutant des headers de protection de base.

## Structure

```text
prisma/
  schema.prisma
  seed.ts
src/
  app/
    admin/
    api/
    hotels/[slug]/
    bonus-stay/
    search/
  components/
  data/
  lib/
  types/
```

## Lancer le projet

1. Copier `.env.example` vers `.env`.
2. Installer les dependances: `npm install`
3. Generer Prisma: `npm run prisma:generate`
4. Pousser le schema en local: `npm run db:push`
5. Alimenter la base de demo si necessaire: `npm run db:seed`
6. Demarrer: `npm run dev`

## Decisions d'architecture

- Les couts hoteliers, couts fournisseurs, marges et poids exacts de contribution restent dans la couche serveur et admin.
- La page client Bonus Stay ne voit que la progression, les categories validees et le statut de debloquage.
- Le schema est prepare pour le multilingue, le multidevise, les campagnes, le support, les vouchers et la traçabilite.
- Les donnees de demonstration dans `src/data/demo-data.ts` permettent de faire tourner un MVP UX sans attendre le branchement complet de la base.

## Prochaines integrations recommandees

- Brancher `Auth.js` ou `Clerk` sur le schema `User / Role / Permission`.
- Remplacer les donnees de demo par Prisma sur les pages admin et client.
- Connecter Stripe, Resend et le generateur PDF.
- Ajouter des uploads securises S3/R2 pour les vouchers, assets hoteliers et pieces jointes support.
