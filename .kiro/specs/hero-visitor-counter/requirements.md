# Requirements Document

## Introduction

This feature adds a visitor counter to the homepage Hero component (`src/components/Hero/index.tsx`). When the homepage loads, the Hero component calls the existing visitor-counter REST API to increment the visit count and then displays the returned total as a subtle line beneath the intro paragraph (for example, "You are visitor #1,234"). While the request is in flight, a placeholder is shown. If the API call fails, the counter is hidden silently with no error message. The API base URL is read from a build-time environment variable exposed to the client bundle, and the component is built with the site's existing stack (TypeScript, React functional components, Tailwind CSS, clsx, CSS modules).

## Glossary

- **Hero_Component**: The React functional component defined at `src/components/Hero/index.tsx`, rendered by `src/pages/index.tsx` inside `<Layout>`.
- **Visitor_Counter**: The user-visible display element rendered by the Hero_Component beneath the intro paragraph that presents the visitor total, a loading placeholder, or nothing.
- **Visitor_Counter_API**: The existing backend service (AWS Lambda + DynamoDB + API Gateway HTTP API v2). A POST request increments and returns the count; a GET request reads without incrementing. Requests are keyed by an optional `pageId`, with a server-side `DEFAULT_PAGE_ID` fallback.
- **API_Response**: The JSON payload returned by the Visitor_Counter_API, containing a numeric `count` field and an `updatedAt` field.
- **Count**: The numeric total returned in the `count` field of the API_Response after an increment.
- **API_Base_URL**: The base URL of the Visitor_Counter_API, supplied through a build-time environment variable and exposed to the client bundle (via Docusaurus `customFields`, DefinePlugin, or an inlined `process.env` value).
- **Intro_Paragraph**: The introductory `<p>` element inside `<div className="max-w-4xl mx-auto px-4 text-center">` in the Hero_Component.
- **Loading_Placeholder**: A subtle visual element shown by the Visitor_Counter while the increment request is in progress.

## Requirements

### Requirement 1: Increment visit count on homepage load

**User Story:** As the site owner, I want each homepage load to increment the visit count, so that I can track how many times the homepage has been visited.

#### Acceptance Criteria

1. WHEN the Hero_Component mounts, THE Hero_Component SHALL send a POST request to the Visitor_Counter_API to increment the Count.
2. WHEN the Hero_Component sends the increment request, THE Hero_Component SHALL construct the request URL from the API_Base_URL.
3. THE Hero_Component SHALL send exactly one increment request per mount of the Hero_Component.

### Requirement 2: Display the returned visitor total

**User Story:** As a homepage visitor, I want to see my visitor number, so that I get a sense of the site's traffic.

#### Acceptance Criteria

1. WHEN the Visitor_Counter_API returns an API_Response with a numeric Count, THE Visitor_Counter SHALL display the Count as a line beneath the Intro_Paragraph.
2. WHEN the Visitor_Counter displays the Count, THE Visitor_Counter SHALL format the Count with thousands separators (for example, "1,234").
3. WHEN the Visitor_Counter displays the Count, THE Visitor_Counter SHALL present the Count within a phrase that identifies it as the visitor number (for example, "You are visitor #1,234").
4. THE Visitor_Counter SHALL render beneath the Intro_Paragraph within the `<div className="max-w-4xl mx-auto px-4 text-center">` container of the Hero_Component.

### Requirement 3: Loading state

**User Story:** As a homepage visitor, I want a subtle indication while the count loads, so that the layout does not appear broken before the number arrives.

#### Acceptance Criteria

1. WHILE the increment request is in progress, THE Visitor_Counter SHALL display the Loading_Placeholder beneath the Intro_Paragraph.
2. WHEN the Visitor_Counter_API returns an API_Response with a numeric Count, THE Visitor_Counter SHALL replace the Loading_Placeholder with the formatted Count.

### Requirement 4: Silent failure handling

**User Story:** As a homepage visitor, I want the page to look normal even if the counter fails, so that a backend problem does not disrupt my experience.

#### Acceptance Criteria

1. IF the increment request fails, THEN THE Visitor_Counter SHALL hide itself without displaying an error message.
2. IF the API_Response does not contain a numeric Count, THEN THE Visitor_Counter SHALL hide itself without displaying an error message.
3. IF the API_Base_URL is not available in the client bundle, THEN THE Hero_Component SHALL skip the increment request and hide the Visitor_Counter.

### Requirement 5: Configuration of the API base URL

**User Story:** As the site maintainer, I want the API base URL to come from a build-time environment variable, so that I can point the counter at different backends without changing code.

#### Acceptance Criteria

1. THE Hero_Component SHALL read the API_Base_URL from a build-time environment variable that is exposed to the client bundle.
2. WHERE the build injects the API_Base_URL through Docusaurus configuration, THE Hero_Component SHALL access the API_Base_URL through the client-accessible value provided by that configuration.

### Requirement 6: Visual styling consistency

**User Story:** As a homepage visitor, I want the counter to blend into the Hero design, so that it reads as a subtle detail rather than a prominent element.

#### Acceptance Criteria

1. THE Visitor_Counter SHALL render as a single subtle text line that is visually less prominent than the Intro_Paragraph.
2. THE Visitor_Counter SHALL apply styling using the site's existing styling approach (Tailwind CSS, clsx, and CSS modules) as used elsewhere in the Hero_Component.
