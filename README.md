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
# eslint and stylelint
npm run format

# stylelint only
npm run format:style

# eslint only
npm run format:eslint
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

## Versioning & Releasing

> TL;DR: Commits prefixed with `fix:` and `feat:` will trigger patch and minor releases when merged to `master`. Read on for more details...
The [sematic-release GitHub Action](https://github.com/BrightspaceUI/actions/tree/master/semantic-release) is called from the `release.yml` GitHub Action workflow to handle version changes and releasing.

### Version Changes

All version changes should obey [semantic versioning](https://semver.org/) rules:

1. **MAJOR** version when you make incompatible API changes,
2. **MINOR** version when you add functionality in a backwards compatible manner, and
3. **PATCH** version when you make backwards compatible bug fixes.

The next version number will be determined from the commit messages since the previous release. Our semantic-release configuration uses the [Angular convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) when analyzing commits:

- Commits which are prefixed with `fix:` or `perf:` will trigger a `patch` release. Example: `fix: validate input before using`
- Commits which are prefixed with `feat:` will trigger a `minor` release. Example: `feat: add toggle() method`
- To trigger a MAJOR release, include `BREAKING CHANGE:` with a space or two newlines in the footer of the commit message
- Other suggested prefixes which will **NOT** trigger a release: `build:`, `ci:`, `docs:`, `style:`, `refactor:` and `test:`. Example: `docs: adding README for new component`

To revert a change, add the `revert:` prefix to the original commit message. This will cause the reverted change to be omitted from the release notes. Example: `revert: fix: validate input before using`.

### Releases

When a release is triggered, it will:

- Update the version in `package.json`
- Tag the commit
- Create a GitHub release (including release notes)

### Releasing from Maintenance Branches

Occasionally you'll want to backport a feature or bug fix to an older release. `semantic-release` refers to these as [maintenance branches](https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration#maintenance-branches).

Maintenance branch names should be of the form: `+([0-9])?(.{+([0-9]),x}).x`.

Regular expressions are complicated, but this essentially means branch names should look like:

- `1.15.x` for patch releases on top of the `1.15` release (after version `1.16` exists)
- `2.x` for feature releases on top of the `2` release (after version `3` exists)

<!-- links -->
[CI Badge]: https://github.com/Brightspace/d2l-outcomes-user-progress/workflows/CI/badge.svg?branch=master
[CI Workflows]: https://github.com/Brightspace/d2l-outcomes-user-progress/actions?query=workflow%3ACI+branch%3Amaster
