const { 
    getWorkoutById: _getWorkoutById,
    getWorkoutsByName: _getWorkoutsByName,
    getWorkoutsByStatus: _getWorkoutsByStatus,
    getWorkoutsByLevel: _getWorkoutsByLevel,
    getWorkoutsByTrainerId: _getWorkoutsByTrainerId,
    getWorkoutsByDateTime: _getWorkoutsByDateTime,
    getWorkoutsByDuration: _getWorkoutsByDuration 
} = require('../../model/workout');
const WorkoutLogic = require('../workout');

exports.getWorkoutById = async id => {
    const results = await _getWorkoutById(id);
    const single = results.length > 0 ? results[0] : null;
    if(single) {
        workout = new WorkoutLogic(single);
        return workout.export();
    }
    return null;
}

exports.getWorkoutsByName = async (workout_name, last_created = null) => {
    const results = await _getWorkoutsByName(workout_name, last_created);
    return results.map(result => {
        const workout = new WorkoutLogic(result);
        return workout.export();
    })
}

exports.getWorkoutsByStatus = async (workout_status, last_created = null) => {
    const results = await _getWorkoutsByStatus(workout_status, last_created);
    return results.map(result => {
        const workout = new WorkoutLogic(result);
        return workout.export();
    })
}

exports.getWorkoutsByLevel = async (workout_level, last_created = null) => {
    const results = await _getWorkoutsByLevel(workout_level, last_created);
    return results.map(result => {
        const workout = new WorkoutLogic(result);
        return workout.export();
    })
}

exports.getWorkoutsByTrainerId = async (trainer_id, last_created = null) => {
    const results = await _getWorkoutsByTrainerId(trainer_id, last_created);
    return results.map(result => {
        const workout = new WorkoutLogic(result);
        return workout.export();
    })
}

exports.getWorkoutsByFilmDate = async (filming_datetime, last_created = null) => {
    const results = await _getWorkoutsByDateTime(filming_datetime, last_created);
    return results.map(result => {
        const workout = new WorkoutLogic(result);
        return workout.export();
    })
}

exports.getWorkoutsByDuration = async (filming_duration, last_created = null) => {
    const results = await _getWorkoutsByDuration(filming_duration, last_created);
    return results.map(result => {
        const workout = new WorkoutLogic(result);
        return workout.export();
    })
}