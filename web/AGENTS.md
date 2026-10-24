<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- electricblaze:start -->
## Social feeds (ElectricBlaze)

The Instagram feed on this site comes from ElectricBlaze (TikTok and YouTube
are planned, not available yet). The feed shape is schema v1 (see the copied
`feed.d.ts`): a `Feed` with `origin` and `posts`; each `Post` has `type`
(image | video | carousel | text | link) for rendering and `format`
(post | reel | ...) for filtering.

- `npx electricblaze preview instagram --json` prints the current feed
  (demo data until an account is connected).
- `npx electricblaze doctor --json` checks the setup and explains what to do next.
- `npx electricblaze add instagram-feed --json` re-adds the component; it never
  overwrites edited files (use `--force` to replace them).
- All commands are non-interactive and support `--json`. An unknown flag is an
  error (exit 2), not a silent no-op.
- Real posts need a human. Today the site owner connects the account in the
  ElectricBlaze widget at https://electricblaze.com and pastes its embed
  snippet where the feed belongs. The JSON API for this component
  (`npx electricblaze connect instagram`) ships in 0.2.
- `npx electricblaze skill` installs the full skill (workflow, schema, platform
  facts) into `.claude/skills/` and `.agents/skills/` for Claude Code and Codex.
<!-- electricblaze:end -->
