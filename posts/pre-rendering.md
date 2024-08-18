---
title: 'Two forms of pre-rendering in Next.js'
date: '2024-01-01'
tags:
 - pre-rendering
 - static-generation
 - server-side rendering
---

Next.js has two forms of pre-rendering: **Static Generation** and **Server-Side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML for a page at **build-time**. The pre-rendered HTML pages is then _reused_ on each request.
- **Server-Side Rendering** is the pre-rendering method that generates the HTML for page on **each request**.

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.