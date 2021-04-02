const moment = require('moment');
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

const _is_iso_date = (str) => {
    return moment(str, moment.ISO_8601).isValid();
}

const _validate_post_required_body = req => {
    const errors = [];
    const required_body = [
        'workout_name',
        'workout_status',
        'workout_level',
        'trainer_id',
        'filming_datetime',
        'filming_duration'
    ]

    let found_in_required = 0;
    for(const key in req.body) {
        if(required_body.indexOf(key) === -1) {
            errors.push({ key: 'invalid key' });
        } else {
            found_in_required++;
        }
    }

    if(found_in_required != 6) errors.push({ 'required_body': `please supply all the required body: ${required_body.join(', ')}` });
    return errors;
}

const _validate_post_workout_level = req => {
    const errors = [];
    const { workout_level } = req.body;

    const available_levels = [
        "BEGINNER",
        "INTERMEDIATE",
        "ADVANCED"
    ]

    if(!workout_level) errors.push({ 'workout_level': 'need to supply workout_level.' });
    else {
        if(available_levels.indexOf(workout_level.toUpperCase()) === -1) {
            errors.push({ 'workout_level': `workout_level must be one of the following: ${available_levels.join(', ')}` });
        }
    }

    return errors;
}

const _validate_post_workout_status = req => {
    const errors = [];
    const { workout_status } = req.body;

    const available_statuses = [
        "PLANNING",
        "READY",
        "COMPLETED",
        "CANCELED"
    ]

    if(!workout_status) errors.push({ 'workout_status': 'need to supply workout_status.' });
    else {
        if(available_statuses.indexOf(workout_status.toUpperCase()) === -1) {
            errors.push({'workout_status': `workout_status must be one of the following: ${available_statuses.join(', ')}`});
        }
    }

    return errors;
}

const _validate_post_workout_trainer_id = async req => {
    const errors = [];
    const { trainer_id } = req.body;
    if(!trainer_id) errors.push({ 'trainer_id': 'need to supply trainer_id' });
    else {
        const get_trainer = await getTrainerById(trainer_id);
        if(get_trainer.length === 0) errors.push({ 'trainer_id': `trainer id ${trainer_id} does not exist.` })
    }
    return errors;
}

const _validate_post_workout_filming_datetime = req => {
    // _is_iso_date
    const errors = [];
    const { filming_datetime } = req.body;
    if(!filming_datetime) errors.push({ 'filming_datetime': 'need to supply filming_datetime' });
    else {
        if(!_is_iso_date(filming_datetime)) errors.push({ 'filming_datetime': 'invalid string; must be ISO 8601 formatted string.' })
    }

    return errors;
}

const _validate_post_workout_filming_duration = req => {
    // _is_iso_date
    const errors = [];
    const { filming_duration } = req.body;
    if(!filming_duration) errors.push({'filming_duration': 'need to supply filming_duration'});
    else {
        if(!Number.isInteger(filming_duration)) errors.push({ 'filming_duration': 'filming_duration is invalid, please supply an integer' })
    }

    return errors;
}

exports.validatePatchWorkout = async (req, res) => {
    // we need to make sure they only supply actual params
    // hydrate workout using workout_id (create logic function for this)
    // validate the user is not sending id, created, or modified
    const errors = [];
    if(!req.query.id) {
        errors.push({ 'id': 'need to supply a valid workout id' })
    } else {
        const find_workout = await getWorkoutById(req.query.id);
        if(find_workout.length === 0) {
            errors.push({ 'id': `workout with id ${req.query.id} does not exist.` })
        }
    }

    const { id, created, modified } = req.body;
    if(id || created || modified) {
        errors.push({ 'id,created,modified': 'invalid keys sent with request, please remove.' })
    }

    if(errors.length > 0) {
        _set_response_error(res, JSON.stringify(errors), 500);
    }
    return errors.length === 0;
}

exports.validatePostWorkout = async (req, res) => {
    // Must have all required body
    // workout_level must contain enum value
    // workout_status must contain enum value
    // trainer_id must exist
    // filming_datetime must be a ISO 8601 string
    // filming_duration must be a integer

    // Really messy here, and could be a lot more generic. But want to save on time.
    const errors = [];
    const required_body_errors = _validate_post_required_body(req);
    errors.push(...required_body_errors);
    const workout_level_errors = _validate_post_workout_level(req);
    errors.push(...workout_level_errors);
    const workout_status_errors = _validate_post_workout_status(req);
    errors.push(...workout_status_errors);
    const workout_trainer_id_errors = await _validate_post_workout_trainer_id(req);
    errors.push(...workout_trainer_id_errors);
    const workout_filming_datetime_errors = _validate_post_workout_filming_datetime(req);
    errors.push(...workout_filming_datetime_errors);
    const workout_filming_duration_errors = _validate_post_workout_filming_duration(req);
    errors.push(...workout_filming_duration_errors);
    if(errors.length > 0) {
        _set_response_error(res, JSON.stringify(errors), 500);
    }
    return errors.length === 0;
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