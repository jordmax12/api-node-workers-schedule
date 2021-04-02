const { execute_query } = require('./v1/model/sqlite3');
const { convert_obj_to_set_statement } = require('./helpers/sqlite3');

exports.getWorkoutById = id => {

}

exports.getWorkoutByName = name => {
    
}

exports.getWorkoutByDateTime = filming_datetime => {

}

exports.getWorkoutByDuration = duration => {
    
}

exports.getWorkoutByStatus = status => {
    
}

exports.getWorkoutByLevel = level => {
    
}

exports.getWorkoutByTrainerId = trainer_id => {
    
}

exports.updateWorkout = workoutObj => {
    const { id } = workoutObj;
    // NOTE: prone to SQL injection, if time permits, go back and prevent.
    const update_query = `UPDATE Workouts SET ${convert_obj_to_set_statement(workoutObj)} WHERE id = ${id}`;
    return execute_query(update_query);
}

exports.createWorkout = workoutObj => {
    const { id, filming_datetime, filming_duration, workout_status, trainer_id, workout_level, created, modified } = workoutObj;
    // NOTE: prone to SQL injection, if time permits, go back and prevent.
    const create_query = `INSERT INTO Workouts (id, filming_datetime, filming_duration, workout_status, trainer_id, workout_level, created, modified ) VALUES (${id}, ${filming_datetime}, ${filming_duration}, ${workout_status}, ${trainer_id}, ${workout_level}, ${created}, ${modified})`;
    return execute_query(create_query);
}