# Next.js Blog Template with Pages Router
This is a starter template for [Learn Next.js](https://nextjs.org/learn-pages-router/basics/create-nextjs-app) with some additional features added.

## Features
- Client-side Rendering on Profile page using SWR for data fetching from the GitHub API
- Examples of both pre-rendering methods in Next.js: Static Generation and Server-side Rendering
- Data Fetching via getStaticProps (Static Generation with data at build-time) and getServerSideProps (SSR at request-time)
- Theme Switcher using useContext hook for passing theme through the component tree (Light & Dark mode)
- Basic text search and tag filtering for blog posts
- Blog posts written in Markdown in the `posts` folder
- Dynamic Routes
- API Route example
- Basic metadata populated for SEO

## Local Setup
1. Clone this repo: `git clone https://github.com/tannerdolby/nextjs-blog-pages-router.git`
2. Navigate to your local copy of the project: `cd nextjs-blog-pages-router`
3. Install dependencies: `npm install`
4. Build: `npm run build`
5. Serve locally: `npm run dev`
6. Serve production build: `npm run start`
