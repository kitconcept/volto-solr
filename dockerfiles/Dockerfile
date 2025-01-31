# syntax=docker/dockerfile:1
ARG VOLTO_VERSION
FROM plone/frontend-builder:${VOLTO_VERSION} as builder

LABEL maintainer="kitconcept, GmbH <info@kitconcept.com>" \
    org.label-schema.name="volto-solr" \
    org.label-schema.description="Solr front-end support for Volto" \
    org.label-schema.vendor="kitconcept, GmbH"

ARG ADDON_NAME
ARG ADDON_PATH

COPY --chown=node:node ./ /app/src/addons/${ADDON_PATH}/

RUN <<EOT
    /setupAddon
    pnpm install --network-timeout 1000000
    pnpm build
    rm -rf cache omelette .yarn/cache
EOT

FROM plone/frontend-prod-config:${VOLTO_VERSION}

COPY --from=builder /app/ /app/
