const { execute_query } = require('./sqlite3');
const { convert_obj_to_set_statement } = require('./helpers/sqlite3')

const TABLE_NAME = 'Trainers';

exports.getTrainerById = async id => {
    // NOTE: prone to SQL injection, if time permits, go back and prevent.
    const get_query = `SELECT * FROM ${TABLE_NAME} WHERE id = '${id}'`;
    return execute_query(get_query);
}

exports.updateTrainer = async trainerObj => {
    const { id } = trainerObj;
    // NOTE: prone to SQL injection, if time permits, go back and prevent.
    const update_query = `UPDATE Trainers SET ${convert_obj_to_set_statement(trainerObj)} WHERE id = ${id}`;
    return execute_query(update_query);
}

exports.createTrainer = async trainerObj => {
    const { id, trainer_name, trainer_photo, created, modified } = trainerObj;
    // NOTE: prone to SQL injection, if time permits, go back and prevent.
    const create_query = `INSERT INTO Trainers (id, trainer_name, trainer_photo, created, modified ) VALUES ('${id}', '${trainer_name}', '${trainer_photo}', '${created}', '${modified}')`;
    return execute_query(create_query);
}