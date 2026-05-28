# AGENTS.md

## Objective
This repo hosts small public apps for personal use. Each app must live in its own folder, be linked from the root apps dashboard, and be kept as simple as possible. Prefer a single `index.html` per app unless a larger structure is clearly needed.

## App Structure
- Root dashboard: `index.html`.
- App folders: `{app-name}/index.html`, for example `rice-cook/index.html`.
- Every app needs its own dashboard card, simple logo, and page icon/favicon.
- Keep app-specific constants near the top of the app HTML so values are easy to tune.

## Style
- Use a clean, modern, mostly white aesthetic as OpenAI's or Stripe's aesthetic: black text, soft gray borders, subtle shadows, and restrained accent color.
- Favor mobile-first layouts, generous spacing, large touch targets, and readable numeric outputs.
- Dashboard app cards should be square grid tiles with an icon, short title, and compact description.
- App pages should feel utilitarian and calm: concise copy, clear sections, no dense explanations.
- When creating a new app or making aesthetic changes, first imagine and generate images for three possible visual directions, then discuss them with the user to confirm the expected result before implementing.

## Development
- Before edits, inspect current files and preserve existing simple static patterns.
- For each new app or update, validate core calculations/interactions locally where possible.
- After finishing, run `git status --short`.
- Before committing, pushing, or deploying, verify the changes locally with the user and ask for their approval.
- After user approval, commit, push, and deploy every completed change.

## Deployment
Use the Vercel-linked repo workflow:
1. `git add ...`
2. `git commit -m "type(app-name) - short message"`
3. `git push`
4. `npx vercel --prod --yes`
5. If needed, point `ang-small-apps.vercel.app` at the latest deployment with `npx vercel alias set <deployment-url> ang-small-apps.vercel.app`.

Commit examples:
- `feat(rice-cook) - add seasoning toggle`
- `fix(rice-cook) - handle small metric values`
- `style(dashboard) - tighten app card layout`
