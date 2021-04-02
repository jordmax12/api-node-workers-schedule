const { getTrainerById } = require('../model/trainer');
const { getWorkoutById } = require('../model/workout');

const set_response_error = (res, error, status_code) => {
    // Ideally, we'd have our own implementation of Response class, where we can ADD errors
    // to save on time, i have not done this.
    if(!res.headersSent) {
        res.status(status_code);
        res.send({ message: error });
    }
}

exports.validateGetTrainerById = (req, res) => {
    if(!req.query.id) {
        set_response_error(res, 'missing required id parameter', 500);
        return false;
    }

    return true;
}

exports.trainerExistsById = async (req, res) => {
    const id = req.query.id;
    const result = await getTrainerById(id);
    if (result.length > 0) return true;
    else {
        set_response_error(res, 'trainer by id does not exist', 500);
        return false;
    }
}

exports.workoutExistsById = async (req, res) => {
    const id = req.query.id;
    const result = await getWorkoutById(id);
    if (result.length > 0) return true;
    else {
        set_response_error(res, 'workout by id does not exist', 500);
        return false;
    }
}

exports.validateGetWorkoutById = (req, res) => {
    if(!req.query.id) {
        set_response_error(res, 'missing required id parameter', 500);
        return false;
    }

    return true;
}