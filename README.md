# Xinu Mail Documentation

Build-free static documentation for deploying and operating Xinu Mail on Cloudflare Workers.

## Structure

- `index.html` is the landing page.
- `guide/`, `system/`, `preview/`, and `api/` preserve clean documentation routes.
- `style.css` contains the visual system.
- `app.js` contains shared navigation, search, and page content.
- `docs/public/assets/` contains the existing instructional screenshots.

No framework, package manager, or build command is required. Serve the repository root with any static file server.

```sh
python3 -m http.server 4173
```

**Documentation:** [doc.xinu.my.id](https://doc.xinu.my.id)
