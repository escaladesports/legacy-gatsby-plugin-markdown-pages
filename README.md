# gatsby-plugin-markdown-pages

A Gatsby plugin for turning markdown files into templated pages.

## Install

With Yarn:

```bash
yarn add gatsby-plugin-markdown-pages
```

Or with npm:

```bash
npm install --save gatsby-plugin-markdown-pages
```

## Usage

In your `gatsby-config.js`:

```javascript
plugins: [
  'gatsby-plugin-markdown-pages',
]
```

Example markdown page in `./src/pages/about-us.md`:

```markdown
---
title: About Us
template: some-template
---

About us copy...
```

This would create a page at `/about-us/` and use the `./src/templates/some-template.js` file as a template.

You can also supply a default template in case you don't want to specify in your markdown files as well as new default markdown and template paths:

```javascript
plugins: [
   {
      resolve: 'gatsby-plugin-markdown-pages',
      options: {
         path: './src/pages', // Path to markdown files to be converted to pages
         templatePath: './src/templates', // Path to page templates
         template: 'default', // Default template to use if none is supplied
         slugPath: 'content/posts', // This would make all pages be located at /content/posts/...
      }
   }
]