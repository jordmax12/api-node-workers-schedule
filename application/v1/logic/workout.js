const {v4: uuidv4} = require('uuid');
const { updateWorkout, createWorkout } = require('../model/workout');

class WorkoutLogic {
    constructor(workoutObj) {
        const currentTime = new Date().toISOString();
        this._workout = {
            id: workoutObj.id || uuidv4(),
            filming_datetime: workoutObj.filming_datetime,
            filming_duration: workoutObj.filming_duration,
            workout_name: workoutObj.workout_name,
            workout_status: workoutObj.workout_status,
            workout_level: workoutObj.workout_level,
            trainer_id: workoutObj.trainer_id,
            created: workoutObj.created || currentTime,
            modified: workoutObj.modified || currentTime
        };
    }

    get id() {
        return this._workout.id;
    }

    get filming_datetime() {
        return this._workout.filming_datetime;
    }

    set filming_datetime(filming_datetime) {
        this._workout.filming_datetime = filming_datetime;
    }

    get filming_duration() {
        return this._workout.filming_duration;
    }

    set filming_duration(filming_duration) {
        this._workout.filming_duration = filming_duration;
    }

    get workout_status() {
        return this._workout.workout_status;
    }

    set workout_status(workout_status) {
        this._workout.workout_status = workout_status;
    }

    get workout_level() {
        return this._workout.workout_level;
    }

    set workout_level(workout_level) {
        this._workout.workout_level = workout_level;
    }

    get trainer_id() {
        return this._workout.trainer_id;
    }

    set trainer_id(trainer_id) {
        this._workout.trainer_id = trainer_id;
    }

    get created() {
        return this._workout.created;
    }

    get modified() {
        return this._workout.modified;
    }

    merge(updatedWorkout) {
        const blacklist = ['id', 'created', 'modified'];
        const updatedKeys = Object.keys(this._workout);
        updatedKeys.forEach((prop) => {
            if (Object.prototype.hasOwnProperty.call(updatedWorkout, prop) && !blacklist.includes(prop)) {
                this._workout[prop] = updatedWorkout[prop];
            }
        });
    }

    export() {
        return this._workout;
    }

    async create() {
        const result = await createWorkout(this.export());
        return result;
    }

    async update() {
        this._workout.modified = new Date().toISOString();
        return updateWorkout(this._workout);
    }
}

module.exports = WorkoutLogic;