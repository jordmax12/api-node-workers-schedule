const { getTrainerById } = require('../model/trainer');
const { 
    getWorkoutById,
    getWorkoutByName,
    getWorkoutsByStatus,
    getWorkoutsByLevel,
    getWorkoutsByDuration,
    getWorkoutsByDateTime,
    getWorkoutsByTrainerId
} = require('../model/workout');

const _set_response_error = (res, error, status_code) => {
    // Ideally, we'd have our own implementation of Response class, where we can ADD errors
    // to save on time, i have not done this.
    if(!res.headersSent) {
        res.status(status_code);
        res.send({ message: error });
    }
}

exports.validatePostWorkout = (req, res) => {
    // Must have all required body
    // workout_level must contain enum value
    // workout_status must contain enum value
    // trainer_id must exist
    // filming_datetime must be a ISO 8601 string
    // filming_duration must be a integer
    const required_body = [
        'workout_name',
        'workout_status',
        'workout_level',
        'trainer_id',
        'filming_datetime',
        'filming_duration'
    ]

    console.log('logging body', req.body);
    return true;
}

exports.validateGetTrainerById = (req, res) => {
    if(!req.query.id) {
        _set_response_error(res, 'missing required id parameter', 500);
        return false;
    }

    return true;
}

exports.trainerExistsById = async (req, res) => {
    const id = req.query.id;
    const result = await getTrainerById(id);
    if (result.length > 0) return true;
    else {
        _set_response_error(res, 'trainer by id does not exist', 500);
        return false;
    }
}

exports.workoutExistsById = async (req, res) => {
    const id = req.query.id;
    const result = await getWorkoutById(id);
    if (result.length > 0) return true;
    else {
        _set_response_error(res, 'workout by id does not exist', 500);
        return false;
    }
}

exports.workoutExistsByName = async (req, res) => {
    const name = req.query.name;
    const result = await getWorkoutByName(name);
    if (result.length > 0) return true;
    else {
        _set_response_error(res, 'workouts by name does not exist', 500);
        return false;
    }
}

exports.workoutExistsByStatus = async (req, res) => {
    const status = req.query.status;
    const result = await getWorkoutsByStatus(status);
    if (result.length > 0) return true;
    else {
        _set_response_error(res, 'workouts by status does not exist', 500);
        return false;
    }
}

exports.workoutExistsByLevel = async (req, res) => {
    const level = req.query.level;
    const result = await getWorkoutsByLevel(level);
    if (result.length > 0) return true;
    else {
        _set_response_error(res, 'workouts by level does not exist', 500);
        return false;
    }
}

exports.workoutExistsByFilmingDatetime = async (req, res) => {
    const filming_datetime = req.query.filming_datetime;
    const result = await getWorkoutsByDateTime(filming_datetime);
    if (result.length > 0) return true;
    else {
        _set_response_error(res, 'workouts by filming_datetime does not exist', 500);
        return false;
    }
}

exports.workoutExistsByFilmingDuration = async (req, res) => {
    const filming_duration = req.query.filming_duration;
    const result = await getWorkoutsByDuration(filming_duration);
    if (result.length > 0) return true;
    else {
        _set_response_error(res, 'workouts by filming_duration does not exist', 500);
        return false;
    }
}

exports.workoutExistsByTrainerId = async (req, res) => {
    const trainer_id = req.query.trainer_id;
    const result = await getWorkoutsByTrainerId(trainer_id);
    if (result.length > 0) return true;
    else {
        _set_response_error(res, 'workouts by trainer_id does not exist', 500);
        return false;
    }
}

exports.validateGetWorkoutById = (req, res) => {
    if(!req.query.id) {
        _set_response_error(res, 'missing required id parameter', 500);
        return false;
    }

    return true;
}

exports.validateGetWorkoutByName = (req, res) => {
    if(!req.query.name) {
        _set_response_error(res, 'missing required name parameter', 500);
        return false;
    }

    return true;
}

exports.validateGetWorkoutByStatus = (req, res) => {
    if(!req.query.status) {
        _set_response_error(res, 'missing required status parameter', 500);
        return false;
    }

    return true;
}

exports.validateGetWorkoutByLevel = (req, res) => {
    if(!req.query.level) {
        _set_response_error(res, 'missing required level parameter', 500);
        return false;
    }

    return true;
}

exports.validateGetWorkoutByFilmingDatetime = (req, res) => {
    if(!req.query.filming_datetime) {
        _set_response_error(res, 'missing required filming_datetime parameter', 500);
        return false;
    }

    return true;
}

exports.validateGetWorkoutByFilmingDuration = (req, res) => {
    if(!req.query.filming_duration) {
        _set_response_error(res, 'missing required filming_duration parameter', 500);
        return false;
    }

    return true;
}

exports.validateGetWorkoutByTrainerId = (req, res) => {
    if(!req.query.trainer_id) {
        _set_response_error(res, 'missing required trainer_id parameter', 500);
        return false;
    }

    return true;
}