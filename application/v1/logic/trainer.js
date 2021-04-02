const {v4: uuidv4} = require('uuid');
const { updateTrainer, createTrainer } = require('../model/trainer');

class Trainers {
    constructor(trainerObj) {
        const currentTime = new Date().toISOString();
        this._trainer = {
            id: trainerObj.id || uuidv4(),
            trainer_name: trainerObj.trainer_name,
            trainer_photo: trainerObj.trainer_photo,
            created: trainerObj.created || currentTime,
            modified: trainerObj.modified || currentTime
        };
    }

    get id() {
        return this._trainer.id;
    }

    get trainer_name() {
        return this._trainer.trainer_name;
    }

    set trainer_name(trainer_name) {
        this._trainer.trainer_name = trainer_name;
    }

    get trainer_photo() {
        return this._trainer.trainer_photo;
    }

    set trainer_photo(trainer_photo) {
        this._trainer.trainer_photo = trainer_photo;
    }

    get created() {
        return this._trainer.created;
    }

    get modified() {
        return this._trainer.modified;
    }

    merge(updatedTrainer) {
        const blacklist = ['id', 'created', 'modified'];
        const updatedKeys = Object.keys(this._trainer);
        updatedKeys.forEach((prop) => {
            if (Object.prototype.hasOwnProperty.call(updatedTrainer, prop) && !blacklist.includes(prop)) {
                this._trainer[prop] = updatedTrainer[prop];
            }
        });
    }

    export() {
        return this._trainer;
    }

    async create() {
        const result = await createTrainer(this.export());
        return result;
    }

    async update() {
        this._trainer.modified = new Date().toISOString();
        return updateTrainer(this._trainer);
    }
}

module.exports = Trainers;