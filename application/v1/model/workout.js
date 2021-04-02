const { execute_query } = require('./v1/model/sqlite3');
const { convert_obj_to_set_statement } = require('./helpers/sqlite3');

const TABLE_NAME = 'Workouts';

exports.getWorkoutById = id => {
    // NOTE: prone to SQL injection, if time permits, go back and prevent.
    const get_query = `SELECT * FROM ${TABLE_NAME} WHERE id = ${id}`;
    return execute_query(get_query);
}

exports.getWorkoutByName = name => {
    // NOTE: prone to SQL injection, if time permits, go back and prevent.
    const get_query = `SELECT * FROM ${TABLE_NAME} WHERE workout_name = ${name}`;
    return execute_query(get_query);
}

exports.getWorkoutByDateTime = filming_datetime => {
    // NOTE: prone to SQL injection, if time permits, go back and prevent.
    const get_query = `SELECT * FROM ${TABLE_NAME} WHERE filming_datetime = ${filming_datetime}`;
    return execute_query(get_query);
}

exports.getWorkoutByDuration = duration => {
    // NOTE: prone to SQL injection, if time permits, go back and prevent.
    const get_query = `SELECT * FROM ${TABLE_NAME} WHERE filming_duration = ${duration}`;
    return execute_query(get_query);
}

exports.getWorkoutByStatus = status => {
    // NOTE: prone to SQL injection, if time permits, go back and prevent.
    const get_query = `SELECT * FROM ${TABLE_NAME} WHERE workout_status = ${status}`;
    return execute_query(get_query);
}

exports.getWorkoutByLevel = level => {
    // NOTE: prone to SQL injection, if time permits, go back and prevent.
    const get_query = `SELECT * FROM ${TABLE_NAME} WHERE workout_level = ${level}`;
    return execute_query(get_query);  
}

exports.getWorkoutByTrainerId = trainer_id => {
    // NOTE: prone to SQL injection, if time permits, go back and prevent.
    const get_query = `SELECT * FROM ${TABLE_NAME} WHERE trainer_id = ${trainer_id}`;
    return execute_query(get_query);
}

exports.updateWorkout = workoutObj => {
    const { id } = workoutObj;
    // NOTE: prone to SQL injection, if time permits, go back and prevent.
    const update_query = `UPDATE ${TABLE_NAME} SET ${convert_obj_to_set_statement(workoutObj)} WHERE id = ${id}`;
    return execute_query(update_query);
}

exports.createWorkout = workoutObj => {
    const { id, workout_name, workout_status, workout_level, filming_datetime, filming_duration,  trainer_id, created, modified } = workoutObj;
    // NOTE: prone to SQL injection, if time permits, go back and prevent.
    const create_query = `INSERT INTO ${TABLE_NAME} (id, workout_name, workout_status, workout_level, filming_datetime, filming_duration, trainer_id, created, modified ) VALUES (${id}, ${workout_name}, ${workout_status}, ${workout_level}, ${filming_datetime}, ${filming_duration}, ${trainer_id}, ${created}, ${modified})`;
    return execute_query(create_query);
}