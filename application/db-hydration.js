const path = require('path');
const fs = require('fs');
const sorter = require('./common/sorter');
const { execute_query } = require('./v1/model/sqlite3');

let completed = require('../migrations/completed.json').completed;

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

const valide_sql_file = file_name => {
    const completed_migration = completed.indexOf(file_name) === -1;
    const is_sql = file_name.indexOf('.sql') > -1;
    return completed_migration && is_sql;
}

const update_completed = file_name => {
    completed.push(file_name);
    const new_completed = {
        completed
    }
    completed = new_completed.completed;
    return fs.writeFileSync(`${process.cwd()}/migrations/completed.json`, JSON.stringify(new_completed, null, 4));
}

exports.hydrate = async () => {
    const dir = path.join(process.cwd(), MIGRATIONS_DIR);
    const files = sorter.sortFiles(await fs.readdirSync(dir), '.sql');
    console.info('Logging files to be hydrated: ', files);
    for(const file of files) {
        if(valide_sql_file(file)) {
            const queries = processSQLFile(`${dir}/${file}`);
        
            for(const _query of queries) {
                try {
                    await execute_query(_query);
                    update_completed(file);
                } catch(e) {
                    // okay to gracefully handle this error, likely a table existing. 
                    console.info('logging migration error: ' + e);
                }
            }
        }
    }
}

