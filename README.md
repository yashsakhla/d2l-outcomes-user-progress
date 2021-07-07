# d2l-outcomes-user-progress

[![CI][CI Badge]][CI Workflows]

Web components for Outcomes User Progress page.

## Components

- [Outcomes List](#outcomes-list)
- [Outcome Details](#outcome-details)
- [Outcomes User Progress](#outcomes-user-progress)

### Outcomes List<a name="outcomes-list"></a>

Displays a list of outcomes that a user has made progress towards demonstrating. A trend of the user's recent performance of each outcome is shown in the list.

#### Usage

```html
<d2l-outcomes-list href="" token="" outcomeTerm="" instructor></d2l-outcomes-list>
```

#### Attributes

- `href` - Hypermedia URL for user progress outcomes data; of the form `{tenant}.user-progress.api.{domain}/org-unit/{orgUnitId}/user/{userId}/outcomes`
- `token` - Auth token
- `outcomeTerm` - **[Optional]** The preferred term to use when referring to outcomes. Accepted values are: `competencies`, `expectations`, `objectives`, `outcomes` and `standards`. Default value is `standards`
- `instructor` - **[Optional]** Boolean attribute should be set when requesting user is an instructor. Used to display language better suited to the user's role.

#### Events

- `onOutcomeClick` - Fired when one of the outcome items in the list is clicked. The event contains a `details` property with the following values:
    - `id` - The `ObjectiveId` of the outcome

### Outcome Details<a name="outcome-details"></a>

> TODO: Finish me

### Outcomes User Progress<a name="outcomes-user-progress"></a>

A wrapper component which combines the `d2l-outcomes-list` with the `d2l-outcome-progress-details` to act as the entire Outcomes User Progress page.

#### Usage

```html
<d2l-outcomes-user-progress href="" token="" outcomeTerm="" instructor></d2l-outcomes-user-progress>
```

#### Attributes

- `href` - Hypermedia URL for user progress outcomes data; of the form `{tenant}.user-progress.api.{domain}/org-unit/{orgUnitId}/user/{userId}/outcomes`
- `token` - Auth token
- `outcomeTerm` - **[Optional]** The preferred term to use when referring to outcomes. Accepted values are: `competencies`, `expectations`, `objectives`, `outcomes` and `standards`. Default value is `standards`
- `instructor` - **[Optional]** Boolean attribute should be set when requesting user is an instructor. Used to display language better suited to the user's role.

## Developing

After cloning the repo, run `npm install` to install dependencies.

### Running the Demos

Start local dev server that hosts the demo pages.

```sh
npm start
```

### Linting

```sh
# eslint, lit-analyzer, stylelint and messageformat-validator
npm run lint

# eslint only
npm run lint:eslint

# lit-analyzer only
npm run lint:lit

# stylelint only
npm run lint:style

# messageformat-validator only
npm run lint:lang
```

### Formatting

```sh
# eslint, stylelint and messageformat-validator
npm run format

# eslint only
npm run format:eslint

# stylelint only
npm run format:style

# messageformat-validator only
npm run format:lang

```

### Testing

```sh
# lint and unit tests
npm test

# unit tests
npm run test:headless

# debug or run a subset of local unit tests
# then navigate to `http://localhost:9876/debug.html`
npm run test:headless:watch
```

### Versioning & Releasing

Run `npm version --no-git-tag-version [major | minor | patch]` in project
root directory, selecting the appropriate version increase type. This will bump
the version in both `package.json` and `package-lock.json` and leave it in your
working changes. Once checking this in and it being merged to `master` create
a GitHub release matching the version in the `package.json`.

<!-- links -->
[CI Badge]: https://github.com/Brightspace/d2l-outcomes-user-progress/workflows/CI/badge.svg?branch=master
[CI Workflows]: https://github.com/Brightspace/d2l-outcomes-user-progress/actions?query=workflow%3ACI+branch%3Amaster
