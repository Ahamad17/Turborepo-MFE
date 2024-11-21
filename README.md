# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

# Setting Up a POC for Microfrontends Using Turborepo, Next.js, and Express.js  

This document outlines the process followed to successfully set up and build Next.js microfrontend applications in parallel using Turborepo and serve them with an Express.js server. The setup focuses on simplicity and serves as a proof of concept (POC) for managing and deploying microfrontends efficiently.

---

## Steps Taken for the POC

### 1. **Set Up Turborepo Workspace**
- Followed the [Turborepo installation guide](https://turbo.build/repo/docs/getting-started/installation) to create a workspace for managing multiple apps.
- Initialized the project with Turborepo to enable efficient parallel builds and centralized project management.

### 2. **Created Simple Next.js Applications**
- Developed two minimal Next.js applications within the Turborepo workspace.
- These applications were intentionally kept simple to focus on demonstrating the setup and build process.

### 3. **Built Next.js Apps as Static for Simplicity**
- Configured each Next.js app to export static assets using the `output: 'export'` option in `next.config.js`.  
- This approach avoids runtime dependencies, simplifies deployment, and ensures the POC focuses solely on the build and serve pipeline.

Example `next.config.js` file:
```javascript
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Export as static files
  distDir: '../../dist/my-app', // Specify output directory
  images: {
    unoptimized: true, // Disable image optimization for simplicity
  },
};
module.exports = nextConfig;
```

### 4. **Configured Output Directory for Centralized Builds**
- Modified the configuration to output all built files into a common `dist` folder.
- This structure simplifies serving multiple microfrontends from a single server.

### 5. **Added Express Server to Serve Microfrontends**
- Created an Express.js server to serve the static builds of the Next.js applications as microfrontends.  
- Configured routes to serve each microfrontend separately, making them accessible at `/microfrontend1` and `/microfrontend2`.

### 6. **Focus on Simplicity**
- The POC prioritizes simplicity by:
- Using static builds to eliminate runtime complexity.
- Creating basic Next.js apps to focus on setting up Turborepo with parallel builds.
- Serving microfrontends with a straightforward Express.js server to validate the concept.


