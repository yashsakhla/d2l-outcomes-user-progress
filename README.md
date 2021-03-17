# d2l-outcomes-user-progress

[![CI][CI Badge]][CI Workflows]

Web components for Outcomes User Progress page.

## Prerequisites

- NPM (Installs with [NodeJS](https://nodejs.org))

## Setup

1. Run `npm i` in project root directory

## Version Bump

1. Run `npm version --no-git-tag-version [major | minor | patch]` in project
root directory, selecting the appropriate version increase type.

This will bump the version in both `package.json` and `package-lock.json` and
leave it in your working changes.

## Component Demos

To view component demos, run `npm start`. A page should be launched with links
to specific component demos.

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

## Lang Term Update

#### Adding an new lang term

 1. Add the new term to `/lang/en.json`
 2. Run `npm run lang:copy` (this will copy term to other files)
 3. Manually add french translations to `/lang/fr.json` (google translate. This is in case auto-translations don't run in time, if we don't have french, we can get fined)
 4. Run `npm run lang:build`
 5. Run `npm run lang:lint -- --fix`

#### Modifying a lang term

 1. Modify the term in `/lang/en.json`
 2. Run `npm run lang:copy -- term1 term2...` (where `term1,term2` are the terms you'd like to modify).
 3. Manually modify french translations to `/lang/fr.json`
 4. Run `npm run lang:build`
 5. Run `npm run lang:lint -- --fix`

<!-- links -->
[CI Badge]: https://github.com/Brightspace/d2l-outcomes-user-progress/workflows/CI/badge.svg?branch=master
[CI Workflows]: https://github.com/Brightspace/d2l-outcomes-user-progress/actions?query=workflow%3ACI+branch%3Amaster
