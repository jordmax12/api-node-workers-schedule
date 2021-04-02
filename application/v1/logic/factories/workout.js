const { getWorkoutById } = require('../../model/workout');
const WorkoutLogic = require('../workout');

exports.getWorkoutById = async id => {
    const results = await getWorkoutById(id);
    const single = results.length > 0 ? results[0] : null;
    if(single) {
        workout = new WorkoutLogic(single);
        return workout.export();
    }
    return null;
}