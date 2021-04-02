const { validateGetWorkoutById, workoutExistsById } = require('../logic/validator');
const { getWorkoutById } = require('../logic/factories/workout');

exports.getWorkoutById = async (req, res) => {
    if(validateGetWorkoutById(req, res)
    && await workoutExistsById(req, res)) {
        const workout = await getWorkoutById(req.query.id);
        res.status(200);
        res.send({
            workout
        })
    }
}