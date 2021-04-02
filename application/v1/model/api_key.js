const { execute_query } = require('./sqlite3');

const TABLE_NAME = 'ApiKeys';

exports.get_api_key = async api_key => {
    // NOTE: prone to SQL injection, if time permits, go back and prevent.
    const get_query = `SELECT * FROM ${TABLE_NAME} WHERE api_key = '${api_key}'`;
    return execute_query(get_query);
}