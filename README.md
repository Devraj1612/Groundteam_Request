# Shadowfax Operations Request Portal

A browser-based portal for submitting and managing Shadowfax ground-operations
requests. The frontend is plain HTML, CSS, and JavaScript, and sends its
requests to a Google Apps Script web app.

## Project structure

```text
GT_Request/
├── README.md
├── netlify.toml
├── shadowfax-portal.HTML
└── assets/
    ├── css/
    │   └── shadowfax-portal.css
    └── js/
        └── shadowfax-portal.js
```

## Features

- Sign in users as a ground team member, administrator, or read-only admin
  viewer configured by the Apps Script backend.
- Submit Order Cancellation, Manual Mark Deliver, Manual Mark Undelivered,
  and Bulk Order requests.
- Select a city and store/hub for a request.
- Require the date, city, TL, store, order ID, request, reason, and proof
  attachment for every request. Bulk Order also requires the secondary rider ID
  and bag quantity. Proof attachments can be audio, photo, or video files under
  8 MB.
- View all-time request totals and city/store summaries in the administrator
  overview. The Report tab appears first and shows Today, D-1, last 1 week, or
  a custom date range, with request totals, city breakdowns, and charts by
  request type and city. Administrator data refreshes automatically every
  10 minutes.
- Filter the store-wise request summary by city.
- Filter and search requests, delete requests, and add cities or hubs.

## Requirements

- A modern browser with JavaScript enabled.
- Access to the Google Apps Script web app configured for this portal.
- A static web server or editor preview extension to serve the project files.

## Configuration

The Apps Script web app URL is configured near the top of
`assets/js/shadowfax-portal.js` in the `API_URL` constant. Set it to the
deployed web app URL ending in `/exec` when connecting this frontend to another
deployment.

The frontend calls the backend for login, hub retrieval, request submission,
administrator data, request deletion, and hub creation. The Apps Script
deployment must implement those operations and enforce authentication and
authorization on the server. Do not treat frontend role checks as a security
boundary.

For a read-only admin account, configure `VIEWER_LOGIN_ID` and
`VIEWER_LOGIN_PASSWORD` as Apps Script Script Properties, return the `viewer`
role from `login`, allow that role to call `adminData`, and reject viewer calls
to all write operations. The frontend hides add/delete controls for viewers,
but the backend must enforce the same restrictions.

## Run locally

1. Open the project folder in an editor that provides a local static web server,
   such as the VS Code Live Server extension.
2. Serve the project root (`GT_Request`).
3. Open `shadowfax-portal.HTML` through that server.
4. Sign in using an account configured by the Apps Script backend.

Opening the HTML directly as a `file://` URL may prevent browser requests to the
Apps Script endpoint from working as expected. The backend must also allow
requests from the origin used to serve the page.

## Deploy to Netlify

This is a static site and does not need `npm start`, a build command, or
dependency installation. The included `netlify.toml` publishes the project root
and serves `shadowfax-portal.HTML` when visitors open the site root.

### Deploy by uploading the project

1. Sign in to Netlify and open the manual deploy / Netlify Drop page.
2. Upload the project folder contents, including `netlify.toml` and the
   `assets` folder. Keep the directory structure intact.
3. Wait for the deploy to finish, then open the generated site URL.

### Deploy from a Git repository

1. Push this project folder to a GitHub, GitLab, or Bitbucket repository.
2. In Netlify, choose **Add new site** / **Import an existing project** and
   connect that repository.
3. Set the publish directory to `.` (the project root). Leave the build command
   empty.
4. Deploy the site. Subsequent pushes to the connected branch will trigger
   deployments.

Before sharing the site, verify that the Google Apps Script deployment is
available to the intended users and permits requests from the Netlify site
origin.

## Notes

- The portal does not include the Apps Script backend; it must be deployed and
  available separately.
- Default city and hub entries are bundled in the frontend and merged with
  hubs returned by the backend.
- No build step or package installation is required for the frontend.
