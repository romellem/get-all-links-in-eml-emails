Every tried find that one link someone emailed you a long time ago
in Outlook for Mac?

Well now you can export all you EML files (select all your emails and
just drag them to the desktop), copy them to this **emails/** folder,
and spit out _every_ link contained in all the emails.

Once you have this list, you can sort / unique it, and see if you can
find the link you were looking for.

## Instructions

1. Copy all EML files to **emails/** folder.
2. Run `npm start`
3. Sit back and collect those links

## How it works

We [glob](https://www.npmjs.com/package/globby) through our EML files, read them,
and parse its contents using [mailparser](https://www.npmjs.com/package/mailparser)
to extract the HTML body from the actual email. Then we pass that HTML into
[JSDOM](https://www.npmjs.com/package/jsdom) so we can easily `querySelectorAll`
to het all `<a>` tags. Then, we simply write all of the href's of those links 
out to a file.
