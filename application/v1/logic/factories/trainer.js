const { getTrainerById } = require('../../model/trainer');
const { getWorkoutsByTrainerId } = require('../../model/workout');
const TrainerLogic = require('../trainer');
const WorkoutLogic = require('../workout');

exports.getTrainerById = async id => {
    const results = await getTrainerById(id);
    const single = results.length > 0 ? results[0] : null;
    if(single) {
        trainer = new TrainerLogic(single);
        const trainer_obj =  trainer.export();
        // get all workouts for this trainer
        const workouts = await getWorkoutsByTrainerId(id);
        const normalized_workouts = workouts.map(wk => {
            return new WorkoutLogic(wk).export()
        })
        trainer_obj.workouts = normalized_workouts;
        return trainer_obj;
    }
    return null;
}