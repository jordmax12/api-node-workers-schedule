const path = require('path');
const fs = require('fs');
const sorter = require('./common/sorter');
const { execute_query } = require('./v1/model/sqlite3')

const MIGRATIONS_DIR = 'migrations';

function processSQLFile(fileName) {
    // Extract SQL queries from files. Assumes no ';' in the fileNames
    const queries = fs.readFileSync(fileName).toString()
      .replace(/(\r\n|\n|\r)/gm," ") // remove newlines
      .replace(/\s+/g, ' ') // excess white space
      .split(";") // split into all statements
      .map(Function.prototype.call, String.prototype.trim)
      .filter(function(el) {return el.length != 0}); // remove any empty ones

    return queries;
}

exports.migrate = async () => {
    const dir = path.join(process.cwd(), MIGRATIONS_DIR);
    const files = sorter.sortFiles(await fs.readdirSync(dir), '.sql');
    console.log('logging files', files);
    for(const file of files) {
        const queries = processSQLFile(`${dir}/${file}`);
        
        for(const _query of queries) {
            try {
                await execute_query(_query);
            } catch(e) {
                // okay to gracefully handle this error, likely a table existing. 
                console.info('logging migration error: ' + e);
            }
        }
    }
}

