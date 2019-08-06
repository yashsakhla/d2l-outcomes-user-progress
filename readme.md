# d2l-outcomes-user-progress

Web components for Outcomes User Progress page.

## Prerequisites

- NPM (Installs with [NodeJS](https://nodejs.org))
- polymer-cli npm package (`npm i -g polymer-cli`)

## Setup

1. Run `npm i` in project root directory

## Component Demos

To view component demos, run `polymer serve` then navigate to the URL provided in console output. The root demo page will contain links to the individual component demos.

## Components

- [Mini Trend](#mini-trend)
- [Big Trend](#big-trend)
- [Outcomes List](#outcomes-list)
- [Outcome Details](#outcome-details)
- [Outcomes User Progress](#outcomes-user-progress)

### Mini Trend<a name="mini-trend"></a>

A visual display of the 6 most recent demonstrations of an outcome for a user in a course.

#### Usage

```html
<d2l-mini-trend href="" token=""></d2l-mini-trend>
```

#### Attributes

- `href` - Hypermedia URL for trend activity data; of the form `{tenant}.user-progress.api.{domain}/org-unit/{orgUnitId}/user/{userId}/outcomes/{outcomeId}/activities`
- `token` - Auth token

### Big Trend<a name="big-trend"></a>

An interactive display of all demonstrations of an outcome for a user in a course.

#### Usage

```html
<d2l-big-trend href="" token="" outcomeTerm="" instructor></d2l-big-trend>
```

#### Attributes

- `href` - Hypermedia URL for trend activity data; of the form `{tenant}.user-progress.api.{domain}/org-unit/{orgUnitId}/user/{userId}/outcomes/{outcomeId}/activities`
- `token` - Auth token
- `outcomeTerm` - **[Optional]** The preferred term to use when referring to outcomes. Accepted values are: `competencies`, `expectations`, `objectives`, `outcomes` and `standards`. Default value is `standards`
- `instructor` - **[Optional]** Boolean attribute should be set when requesting user is an instructor. Used to display language better suited to the user's role.

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
