const sqlite3 = require('sqlite3').verbose();

const get_database = () => {
    return new sqlite3.Database('./database/fightcamp');
}

const promise_query = (db, query) => new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
        if(err) reject(err);
        else resolve(rows);
    })
})

exports.execute_query = async (query) => {
    const db = get_database()
    try {
        db.run("PRAGMA foreign_keys = ON");
        const results = await promise_query(db, query);
        db.close();
        return results;
    } catch(e) {
        throw new Error('Query failed ' + e)
    }
}