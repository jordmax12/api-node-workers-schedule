const sqlite3 = require('sqlite3').verbose();

const get_database = () => {
    return new sqlite3.Database('fightcamp');
}

const promise_query = (db, query) => new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
        if(err) reject(err);
        else {
            console.log('logging rows', rows)
            return rows;
        }
    })
})

exports.execute_query = async (query) => {
    const db = get_database()
    try {
        const results = await promise_query(db, query);
        db.close();
        return results;
    } catch(e) {
        throw new Error('Query failed ' + e)
    }
}