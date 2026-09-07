# Coffee Blog

A static coffee blog: brewing, beans, espresso experiments, and coffee knowledge ported from an older archive. The look, generator, and behavior follow [DreamingSaints/blog](https://github.com/DreamingSaints/blog), which is built with the [StCost/blog](https://github.com/StCost/blog) Markdown → HTML engine (Bun, no framework runtime).

Author / personal fields (name, photo, social links, bio) are **empty on purpose**. Fill them in `src/config.js`, `content/posts/000-pinned.md`, and `content/posts/100-about.md`.

## Run locally

Requires [Bun](https://bun.sh) 1.1+.

```bash
bun install
bun run dev
```

Then open `http://127.0.0.1:4173/`.

Other commands:

```bash
bun run build    # writes static HTML to dist/
bun run clean    # removes dist/
```

On GitHub Pages, pushes to `main` build and deploy `dist/` via `.github/workflows/deploy.yml`. Enable **Settings → Pages → Source: GitHub Actions**.

## Content

Posts live in `content/posts/` as Markdown. Coffee articles (Ukrainian and Russian) come from [StCost/tailwind-blog `data/blog/stgrikus`](https://github.com/StCost/tailwind-blog/tree/main/data/blog/stgrikus). Dates are kept as HTML comments at the top of each file. Images that still existed in `public/static/images` were copied next to the posts; missing images keep alt text and an HTML comment.

The UA twin of `2-ru-making-coffee` was not in the archive.

## Color tokens

Same palette as the source blog (amber/orange on GitHub-dark). Tokens are also documented in `src/assets/theme.css`.

| Token | Value | Where it is used |
| --- | --- | --- |
| `--color-primary` | `#ff8c42` | Links, site title, accents, card hover border |
| `--color-primary-hover` | `#ffab70` | Link and title hover |
| `--color-primary-glow` | `rgba(255, 140, 66, 0.3)` | Title glow |
| `--color-bg-primary` | `#0d1117` | Page background |
| `--color-bg-secondary` | `#161b22` | Cards / panels |
| `--color-bg-code` | `#262c36` | Code blocks |
| `--color-text-primary` | `#c9d1d9` | Body text |
| `--color-text-muted` | `#8b949e` | Tagline, excerpts, muted labels |
| `--color-text-bright` | `#f0f6fc` | Emphasized text |
| `--color-text-code` | `#e6edf3` | Code text |
| `--color-border` | `#30363d` | Borders |
| background grid | `rgba(255, 140, 66, 0.2)` dots, `0.05` lines | Page grid overlay |
| scrollbar | `rgba(255, 140, 66, 0.4)` | Scrollbar thumb border |
| `--link` / `--accent` | alias of `--color-primary` | Compatibility aliases |
| `--bg` / `--panel` / `--text` / `--muted` / `--border` | aliases of the tokens above | Templates and older CSS |

To retheme later, edit `src/assets/theme.css` (and the matching rgba values in `src/assets/styles.css` if you change the orange).

## Empty personal fields

Left blank for you to fill later:

- Site company / footer name (`src/config.js` → `site.companyName`)
- Pinned “Find Us” social links (`content/posts/000-pinned.md`)
- About page name, photo, occupation, bio, social URLs (`content/posts/100-about.md`)
- Favicon is a coffee cup on the original orange, not a personal portrait
