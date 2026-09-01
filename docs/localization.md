# Media frontend localization

Scope: `sh-web` only. Indonesian remains the default with its existing URLs;
English uses `/en` and `/en/...`. This does not change `sht-web` (Tour).

## Routing and content

- `nuxt.config.ts` registers English routes using the existing page components.
- `shared/localization.ts` owns locale detection, internal links, UI translation,
  stable per-locale cache keys, dates, and canonical URL formatting.
- `shared/messages.ts` translates interface copy. Editorial fields are rendered
  as returned by the localized API, not translated using the UI dictionary.
- Every Media GET forwards `locale=id|en` through the same-origin Nuxt proxy.
  Category, city, feedback, and contribution enum values remain unchanged.
- Article switches use `localizedSlugs`, not IDs or a guessed prefixed ID slug.
  Route middleware resolves metadata before the navbar renders on the server.
  Pages consume the same preloaded result without a duplicate API request. Missing English content offers an explicit
  Indonesian link or an English listing notice; it never renders an ID body
  under an English detail URL. Missing details return 404/noindex; upstream
  failures retain a failure status rather than masquerading as missing content.
- Panduan retains its existing single page with hash-based topics. Opposite
  locale topics are matched by the shared guide ID. Old ID hashes on an English
  page resolve to the English slug after hydration. Unavailable topics show a
  notice. Hashes are not sent to SSR, so the first topic is initially rendered.
- Incomplete English Home overrides use English UI defaults and retain shared
  imagery. Lists rely on the admin API to exclude incomplete EN translations.
- `useLocaleSeo.ts` sets HTML language, self canonical, Open Graph locale/URL,
  ID/EN alternates and ID `x-default`. Article alternates include only available
  translations. Query strings and guide hashes are excluded from canonical URLs.
- About, Privacy Policy, and Terms have English copy in `shared/legal-en.ts`.
  The Indonesian text, section IDs, and existing policy date are preserved.

## Deployment prerequisites

1. Deploy the localization-enabled `sht-admin` backend, including its Article
   migrations and `0016_media_localization.sql`. This frontend task does not run
   database migrations or change production configuration.
2. Set private `NUXT_API_BASE_URL` to that admin deployment's origin. Do not use
   the removed `NUXT_PUBLIC_MEDIA_API_BASE_URL`. SSR and client navigation both
   use `/api/media`; upstream host/error details stay server-side.
3. Set `NUXT_PUBLIC_SITE_URL` to the public Media website origin for canonical
   URLs (default: `https://sudutharamain.id`). This is not the API origin.
4. Complete English content in admin. Empty EN lists are expected until those
   translations satisfy the backend readiness rules. This frontend does not
   automatically translate editorial content.

## Validation

Requires Node 22+ and `npm ci`. Uses Node's built-in test runner with the existing
TypeScript/Vue dependencies; no new test framework or runtime dependency.

```sh
npm test
npm run typecheck
npm run build
npm run test:ssr
```

Unit tests cover locale/path boundaries, cache isolation, date formatting,
fetch adapters, stable guide IDs, switcher transitions, and legal copy structure.
SSR tests launch the actual production build against a synthetic local Media API:
all 20 ID/EN routes, localized metadata/navigation/content, proxy queries, search,
missing translations, redirects, empty data, failures, feedback/contribution
payload forwarding, and reuse of middleware/page async data. They do not exercise
the actual admin database, external map tiles, or real submissions.

For browser QA against synthetic data after building:

```sh
node tests/helpers/fixture-app.mjs
```

Open `http://localhost:3103`. Stop with Ctrl+C. No requests reach a real admin API.

Before production release, smoke-test desktop/mobile in staging: switch ID↔EN
on home and article detail (including incomplete EN), switch a selected Panduan
topic, search, filters, gallery/lightbox, map/markers, form validation, feedback,
back/forward navigation, and console hydration errors. Test external submissions
only with dedicated staging records. Automated SSR checks do not replace these
browser and real-backend checks.
