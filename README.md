# Photo Sharing Labs

This project runs with the sample data in `backend/modelData/models.js`. The API does not need MongoDB or a `DB_URL` environment variable.

## Run on StackBlitz

Open this repository in StackBlitz. The root `start` script starts the API and React app together. The React development server proxies `/user`, `/photosOfUser`, and `/test/info` requests to the API on port `8081`.

## Run locally

From the repository root, install dependencies and start both apps:

```sh
pnpm install
pnpm start
```

Open `http://localhost:3000`. The API listens on port `8081`.

The sample API endpoints are `/test/info`, `/user/list`, `/user/:id`, and `/photosOfUser/:id`.
