const {
    workoutExistsById,
    workoutExistsByName,
    workoutExistsByStatus,
    workoutExistsByLevel,
    workoutExistsByTrainerId,
    workoutExistsByFilmingDatetime,
    workoutExistsByFilmingDuration,
    validateGetWorkoutById,
    validateGetWorkoutByName,
    validateGetWorkoutByStatus,
    validateGetWorkoutByLevel,
    validateGetWorkoutByTrainerId,
    validateGetWorkoutByFilmingDatetime,
    validateGetWorkoutByFilmingDuration,
    validatePostWorkout,
} = require('../logic/validator');

const { 
    getWorkoutById, 
    getWorkoutsByName,
    getWorkoutsByStatus,
    getWorkoutsByLevel,
    getWorkoutsByTrainerId,
    getWorkoutsByFilmDate,
    getWorkoutsByDuration 
} = require('../logic/factories/workout');

const _getWorkoutById = async (req, res) => {
    if(validateGetWorkoutById(req, res)
    && await workoutExistsById(req, res)) {
        const workout = await getWorkoutById(req.query.id);
        res.status(200);
        res.send({
            workout
        })
    }
}

const _getWorkoutsByName = async (req, res) => {
    if(validateGetWorkoutByName(req, res)
    && await workoutExistsByName(req, res)) {
        const workouts = await getWorkoutsByName(req.query.name, req.query.last_created);
        res.status(200);
        res.send({
            workouts
        })
    }
}

const _getWorkoutsByStatus = async (req, res) => {
    if(validateGetWorkoutByStatus(req, res)
    && await workoutExistsByStatus(req, res)) {
        const workouts = await getWorkoutsByStatus(req.query.status, req.query.last_created);
        res.status(200);
        res.send({
            workouts
        })
    } 
}

const _getWorkoutsByLevel = async (req, res) => {
    if(validateGetWorkoutByLevel(req, res)
    && await workoutExistsByLevel(req, res)) {
        const workouts = await getWorkoutsByLevel(req.query.level, req.query.last_created);
        res.status(200);
        res.send({
            workouts
        })
    } 
}

const _getWorkoutsByTrainerId = async (req, res) => {
    if(validateGetWorkoutByTrainerId(req, res)
    && await workoutExistsByTrainerId(req, res)) {
        const workouts = await getWorkoutsByTrainerId(req.query.trainer_id, req.query.last_created);
        res.status(200);
        res.send({
            workouts
        })
    } 
}

const _getWorkoutsByFilmingDatetime = async (req, res) => {
    if(validateGetWorkoutByFilmingDatetime(req, res)
    && await workoutExistsByFilmingDatetime(req, res)) {
        const workouts = await getWorkoutsByFilmDate(req.query.filming_datetime, req.query.last_created);
        res.status(200);
        res.send({
            workouts
        })
    } 
}

const _getWorkoutsByFilmingDuration = async (req, res) => {
    if(validateGetWorkoutByFilmingDuration(req, res)
    && await workoutExistsByFilmingDuration(req, res)) {
        const workouts = await getWorkoutsByDuration(req.query.filming_duration, req.query.last_created);
        res.status(200);
        res.send({
            workouts
        })
    } 
}

// Eh really dont advise this, makes it difficult to have multiple query params if you want
// Doing this to save time, will go back later and make better if it permits.
exports.getWorkoutHandler = async (req, res) => {
    if(req.query.id) return _getWorkoutById(req, res);
    else if(req.query.name) return _getWorkoutsByName(req, res);
    else if(req.query.level) return _getWorkoutsByLevel(req, res);
    else if(req.query.status) return _getWorkoutsByStatus(req, res);
    else if(req.query.trainer_id) return _getWorkoutsByTrainerId(req, res);
    else if(req.query.filming_datetime) return _getWorkoutsByFilmingDatetime(req, res);
    else if(req.query.filming_duration) return _getWorkoutsByFilmingDuration(req, res);
}

exports.postWorkout = async (req, res) => {
    if(validatePostWorkout(req, res)) {
        res.status(200);
        res.send({ hello: 'world' })
    }
}