NPM ?= npm
HOST ?= $(or $(NETBOX_WEB_HOST),127.0.0.1)
PORT ?= $(or $(NETBOX_WEB_PORT),5176)

.PHONY: help install dev build preview typecheck manifest

.DEFAULT_GOAL := help

help:
	@printf "\n  Netbox marketing site\n\n"
	@printf "    make install    Install dependencies\n"
	@printf "    make dev        Start Vite dev server\n"
	@printf "    make build      Production build\n"
	@printf "    make preview    Preview production build\n"
	@printf "    make typecheck  vue-tsc\n"
	@printf "    make manifest   Regenerate downloads manifest\n\n"
	@printf "  Site  http://$(HOST):$(PORT)\n\n"

install:
	$(NPM) install

dev: install
	$(NPM) run dev

build: install
	$(NPM) run build

preview: build
	$(NPM) run preview

typecheck:
	$(NPM) run typecheck

manifest:
	@python3 scripts/generate-download-manifest.py
