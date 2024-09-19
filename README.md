# Volto Solr (@kitconcept/volto-solr)

Volto add-on front-end component of Solr support

[![npm](https://img.shields.io/npm/v/@kitconcept/volto-solr)](https://www.npmjs.com/package/@kitconcept/volto-solr)
[![](https://img.shields.io/badge/-Storybook-ff4785?logo=Storybook&logoColor=white&style=flat-square)](https://kitconcept.github.io/volto-solr/)
[![Code analysis checks](https://github.com/kitconcept/volto-solr/actions/workflows/code.yml/badge.svg)](https://github.com/kitconcept/volto-solr/actions/workflows/code.yml)
[![Unit tests](https://github.com/kitconcept/volto-solr/actions/workflows/unit.yml/badge.svg)](https://github.com/kitconcept/volto-solr/actions/workflows/unit.yml)

## Features

This add-on enhances Plone (Volto) with a Solr-based full-text search.

This package has to be used together with the [`kitconcept.solr`](https://github.com/kitconcept/kitconcept.solr) back-end package.

## Installation

To install your project, you must choose the method appropriate to your version of Volto.

### Volto 17 and earlier

Create a new Volto project (you can skip this step if you already have one):

```
npm install -g yo @plone/generator-volto
yo @plone/volto my-volto-project --addon @kitconcept/volto-solr
cd my-volto-project
```

Add `@kitconcept/volto-solr` to your package.json:

```JSON
"addons": [
    "@kitconcept/volto-solr"
],

"dependencies": {
    "@kitconcept/volto-solr": "*"
}
```

Download and install the new add-on by running:

```
yarn install
```

Start volto with:

```
yarn start
```

### Volto 18 and later

Add `@kitconcept/volto-solr` to your `package.json`:

```json
"dependencies": {
    "@kitconcept/volto-solr": "*"
}
```

Add `@kitconcept/volto-solr` to your `volto.config.js`:

```javascript
const addons = ['@kitconcept/volto-solr'];
```

If this package provides a Volto theme, and you want to activate it, then add the following to your `volto.config.js`:

```javascript
const theme = '@kitconcept/volto-solr';
```

## Configuration

The configuration is provided by default and can be overwritten from any package.


### Result type templates

The search results are rendered by default components, which are customizable.

The `config.views.contentTypeSearchResultViews` object contains a mapping from type name to the component that renders them. These can be overridden, and renderer components for new types can be added as well.

Additionally. the `config.views.contentTypeSearchResultDefaultView` defines the component that is used as a default renderer for all the result types not specified in `config.views.contentTypeSearchResultViews`.

```js
  // View mapper can be specified here. with the desired type rendererers.
  // The default view applies for all content types not in the array.
  // Or just use the built in mapper.
  config.views.contentTypeSearchResultViews = {
    Event: searchResultItems.EventResultItem,
    Image: searchResultItems.ImageResultItem,
    'News Item': searchResultItems.NewsItemResultItem,
  };
  config.views.contentTypeSearchResultDefaultView =
    searchResultItems.DefaultResultItem;
```

### Result type icons

In addition to the result type templates, it's also possible to use which icon to use to represent any specific result icon.

`config.settings.contentTypeSearchResultIcons` is a mapping from content type name to the icon to use for the content type. In addition, `config.settings.contentTypeSearchResultDefaultIcon` specifies a fallback to be used for any content type not found in the mapping (and functions as a default).

config.settings.contentTypeSearchResultIcons is by default populated from `config.settings.contentIcons` which is usually the right thing to do. The following example uses these settings, but also defines specific icons for some specific content types.

All supported content type templates respect these settings, so an icon for a content type can be redefined without the need to redefine the entire template, if otherwise no other changes are needed.

```js
  // Icon types. This will be in effect with all supported
  // content type templates.
  config.settings.contentTypeSearchResultIcons = {
    ...config.settings.contentIcons,
    Event: calendarSVG,
    Image: imageSVG,
    'News Item': newsSVG,
  };
  config.settings.contentTypeSearchResultDefaultIcon = fileSVG;
```

### Other options

The rest of the options provide the baselines for the package and the `Search` compoment to work. You can override various components via these options, including the `Search` component and the underlying reducers and actions that it uses. There is currently no supported use case for this, so please refer to the source code if you wish to do this. You most likely won't need to do this.

## Test installation

Visit http://localhost:3000/ in a browser, login, and check the awesome new features.


## Development

The development of this add-on is done in isolation using a new approach using pnpm workspaces and latest `mrs-developer` and other Volto core improvements.
For this reason, it only works with pnpm and Volto 18 (currently in alpha).


### Pre-requisites

-   [Node.js](https://6.docs.plone.org/install/create-project.html#node-js)
-   [Make](https://6.docs.plone.org/install/create-project.html#make)
-   [Docker](https://6.docs.plone.org/install/create-project.html#docker)


### Make convenience commands

Run `make help` to list the available commands.

```text
help                             Show this help
install                          Installs the add-on in a development environment
start                            Starts Volto, allowing reloading of the add-on during development
build                            Build a production bundle for distribution of the project with the add-on
i18n                             Sync i18n
ci-i18n                          Check if i18n is not synced
format                           Format codebase
lint                             Lint, or catch and remove problems, in code base
release                          Release the add-on on npmjs.org
release-dry-run                  Dry-run the release of the add-on on npmjs.org
test                             Run unit tests
ci-test                          Run unit tests in CI
backend-docker-start             Starts a Docker-based backend for development
storybook-start                  Start Storybook server on port 6006
storybook-build                  Build Storybook
acceptance-frontend-dev-start    Start acceptance frontend in development mode
acceptance-frontend-prod-start   Start acceptance frontend in production mode
acceptance-backend-start         Start backend acceptance server
ci-acceptance-backend-start      Start backend acceptance server in headless mode for CI
acceptance-test                  Start Cypress in interactive mode
ci-acceptance-test               Run cypress tests in headless mode for CI
```

### Development environment set up

Install package requirements.

```shell
make install
```

### Start developing

Start the backend.

```shell
make backend-docker-start
```

In a separate terminal session, start the frontend.

```shell
make start
```

### Lint code

Run ESlint, Prettier, and Stylelint in analyze mode.

```shell
make lint
```

### Format code

Run ESlint, Prettier, and Stylelint in fix mode.

```shell
make format
```

### i18n

Extract the i18n messages to locales.

```shell
make i18n
```

### Unit tests

Run unit tests.

```shell
make test
```

### Run Cypress tests

Run each of these steps in separate terminal sessions.

In the first session, start the frontend in development mode.

```shell
make acceptance-frontend-dev-start
```

In the second session, start the backend acceptance server.

```shell
make acceptance-backend-start
```

In the third session, start the Cypress interactive test runner.

```shell
make acceptance-test
```

## License

The project is licensed under the MIT license.

## Credits and Acknowledgements 🙏

Crafted with care by **Generated using [Cookieplone (0.7.1)](https://github.com/plone/cookieplone) and [cookiecutter-plone (aee0d59)](https://github.com/plone/cookiecutter-plone/commit/aee0d59c18bd0dd8af1da9c961014ff87a66ccfa) on 2024-07-09 13:20:11.244410**. A special thanks to all contributors and supporters!
