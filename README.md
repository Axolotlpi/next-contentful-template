# My Next - Contentful Template

This is my template for a next js app using Contentful as the headless CMS.  
By no means is it a framework, just a starting point for something like a small blog.

## Currently...

**There is/are no:**

- SSR
- Service Worker
- UI components (that's up to you)
- Contentful previewing (yet)

**There is however...**

- SSG
- Dynamic paths (with slug instead of id)
- GQL setup
- Typescript setup
- Tailwind setup
- DotEnv setup (in next.config.js)
- Starter fonts and colors (in \_document and tailwind.config)
- Social Graph setup to receive props (from cms)
- rich-text to react PostBody setup and typed

## Installation

"Use this template" > "Create Repository" > clone

Then:

```bash
npm i
```

and develop

```bash
npm run dev
```

## Notes:

Currently very early in it's setup, but there are a few notes on the organization of this template:

In order to make use of the current state of the template the contentful model should be adaptable to the types defined so far in queries. Perhaps at least after a format()

In my current content model posts contain a PageSettings reference instead of inline with the rest of the post data, this seems to be cleaner so far. (eg. it makes overriding default PageSettings cleaner)

**GQL:**  
Using graphql with contentful. Can be tested here:

https://graphql.contentful.com/content/v1/spaces/{SPACE}/explore?access_token={KEY}

queries.ts contains query list and types that go along with them. (current extent of typing is within what is reasonably useful)  
You'll notice that query has a function in addition to just the gql query. This is to reshape the incoming object/array to make it cleaner/more immediately usefull and is ran in the getContent() function in helpers.

Also, parts of this template are copy paste from current projects, so expect huge ugly commits.
