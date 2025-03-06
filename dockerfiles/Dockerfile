# syntax=docker/dockerfile:1
ARG VOLTO_VERSION
FROM plone/frontend-builder:${VOLTO_VERSION} as builder

ARG ADDON_NAME
ARG ADDON_PATH

COPY --chown=node:node ./ /app/src/addons/${ADDON_PATH}/

RUN <<EOT
    /setupAddon
    npm install -g corepack@latest
    corepack enable
    pnpm install --fetch-timeout 1000000
    pnpm build
    rm -rf cache omelette `pnpm store path --silent`
EOT

FROM plone/frontend-prod-config:${VOLTO_VERSION}

LABEL maintainer="Plone Community <dev@plone.org>" \
    org.label-schema.name="volto-solr" \
    org.label-schema.description="Solr front-end support for Volto" \
    org.label-schema.vendor="Plone Foundation"

COPY --from=builder /app/ /app/
