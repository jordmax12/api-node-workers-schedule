const { execute_query } = require('./sqlite3');
const { convert_obj_to_set_statement, generate_where_with_pagination } = require('./helpers/sqlite3');

const TABLE_NAME = 'Workouts';

exports.getWorkoutById = async id => {
    // NOTE: prone to SQL injection, if time permits, go back and prevent.
    const get_query = `SELECT * FROM ${TABLE_NAME} WHERE id = '${id}'`;
    return execute_query(get_query);
}

exports.getWorkoutsByName = async (name, last_created = null) => {
    // NOTE: prone to SQL injection, if time permits, go back and prevent.
    const _where = generate_where_with_pagination([{ key: 'workout_name', value: name }], last_created, 'filming_datetime');
    const get_query = `SELECT * FROM ${TABLE_NAME} ${_where} ORDER BY created LIMIT 10`;
    return execute_query(get_query);
}

exports.getWorkoutsByStatus = async (status, last_created = null) => {
    // NOTE: prone to SQL injection, if time permits, go back and prevent.
    const _where = generate_where_with_pagination([{ key: 'workout_status', value: status }], last_created, 'filming_datetime');
    const get_query = `SELECT * FROM ${TABLE_NAME} ${_where} ORDER BY created LIMIT 10`;
    return execute_query(get_query);
}

exports.getWorkoutsByLevel = async (level, last_created = null) => {
    // NOTE: prone to SQL injection, if time permits, go back and prevent.
    const _where = generate_where_with_pagination([{ key: 'workout_level', value: level }], last_created, 'filming_datetime');
    const get_query = `SELECT * FROM ${TABLE_NAME} ${_where} ORDER BY created LIMIT 10`;
    return execute_query(get_query);  
}

exports.getWorkoutsByDateTime = async (filming_datetime, last_created = null) => {
    // NOTE: prone to SQL injection, if time permits, go back and prevent.
    const _where = generate_where_with_pagination([{ key: 'filming_datetime', value: filming_datetime }], last_created, 'filming_datetime');
    const get_query = `SELECT * FROM ${TABLE_NAME} ${_where} ORDER BY created LIMIT 10`;
    return execute_query(get_query);
}

exports.getWorkoutsByDuration = async (duration, last_created = null) => {
    // NOTE: prone to SQL injection, if time permits, go back and prevent.
    const _where = generate_where_with_pagination([{ key: 'filming_duration', value: duration }], last_created, 'filming_datetime');
    const get_query = `SELECT * FROM ${TABLE_NAME} ${_where} ORDER BY created LIMIT 10`;
    return execute_query(get_query);
}

exports.getWorkoutsByTrainerId = async (trainer_id, last_created = null) => {
    // NOTE: prone to SQL injection, if time permits, go back and prevent.
    const _where = generate_where_with_pagination([{ key: 'trainer_id', value: trainer_id }], last_created, 'filming_datetime');
    const get_query = `SELECT * FROM ${TABLE_NAME} ${_where} ORDER BY created LIMIT 10`;
    return execute_query(get_query);
}

exports.updateWorkout = async workoutObj => {
    const { id } = workoutObj;
    // NOTE: prone to SQL injection, if time permits, go back and prevent.
    const update_query = `UPDATE ${TABLE_NAME} SET ${convert_obj_to_set_statement(workoutObj)} WHERE id = '${id}'`;
    return execute_query(update_query);
}

exports.createWorkout = async workoutObj => {
    const { id, workout_name, workout_status, workout_level, filming_datetime, filming_duration,  trainer_id, created, modified } = workoutObj;
    // NOTE: prone to SQL injection, if time permits, go back and prevent.
    const create_query = `INSERT INTO ${TABLE_NAME} (id, workout_name, workout_status, workout_level, filming_datetime, filming_duration, trainer_id, created, modified ) VALUES ('${id}', '${workout_name}', '${workout_status}', '${workout_level}', '${filming_datetime}', ${filming_duration}, '${trainer_id}', '${created}', '${modified}')`;
    return execute_query(create_query);
}