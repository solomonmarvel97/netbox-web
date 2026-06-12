# Netbox Web

Marketing site for [Netbox Pro](https://github.com/solomonmarvel97/netbox-commercial): landing page, roadmap, and desktop downloads.

## Development

```bash
make install
make dev
```

Site runs at `http://127.0.0.1:5176` by default. Settings live in `config/web.json`.

## Desktop downloads

Installers are copied here from the desktop repo after packaging:

```bash
# In netbox-v2 (commercial)
NETBOX_WEB_ROOT=/path/to/netbox-web make package
```

That publishes artifacts to `public/downloads/` and refreshes `manifest.json`. The `/download` page reads that manifest.

## Build

```bash
make build
```

Output goes to `dist/`.
