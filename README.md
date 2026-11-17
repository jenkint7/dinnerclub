# Dinner Club Calendar (Netlify version)

A shared board where every couple taps their own colors. Nobody needs an account to view or update it.

## Put it online

Option A: GitHub
1. Create a new GitHub repository and upload everything in this folder.
2. In Netlify, choose Add new site > Import an existing project, pick the repository, and keep the default settings.
3. Netlify builds it and gives you a link. Send that link to the other couples.

Option B: Netlify command line
1. Install Node.js, then run `npm install` in this folder.
2. Run `npx netlify-cli deploy --prod` and follow the prompts to log in and create a site.

## Changing hosts or months
The board runs November 2026 through September 2027. Every month has a host. To change one, edit the `host` name in the `MONTHS` list near the bottom of `index.html`, then redeploy. A month with `host:null` shows as open. Answers are stored separately and are not lost.

## Good to know
- Anyone with the link can change any couple's answers. That is fine for a friend group, but do not post the link publicly.
- Answers are stored per couple in Netlify Blobs, and the page refreshes every 15 seconds.
