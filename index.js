const glob = require('globby');
const { simpleParser } = require('mailparser');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const fs = require('fs');
const path = require('path');

// Save our links in a `links.txt` file
const stream = fs.createWriteStream('links.txt', { flags: 'a' });

glob('./emails/*.eml').then(files => {
    console.log(`Found ${files.length} EML files. Enumerating them now...`);
    let index = 0;

    files.forEach(file => {
        let full_path = path.join(__dirname, file);
        let eml_buffer = fs.readFileSync(full_path);

        simpleParser(eml_buffer, (err, mail) => {
            if (err) {
                console.log('ERRRROR');
                console.log(err);
                process.exit(1);
            }

            // Use an index counter since this callback doesn't run synchronously
            console.log(`${++index} / ${files.length}: ${file}`);

            // Build a DOM from our email's HTML so we can query for `<a>` tags
            let dom = new JSDOM(mail.html);
            let links = dom.window.document.querySelectorAll('a');

            stream.write('\n' + '###### ' + file + ' ######' + '\n');
            for (let i = 0; i < links.length; i++) {
                // Write our links out to our file, 'links.txt'
                stream.write(links[i].href.toString() + '\n');
            }
        });
    });
});
