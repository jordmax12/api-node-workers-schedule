const { getTrainerById } = require('../../model/trainer');
const TrainerLogic = require('../trainer');

exports.getTrainerById = async id => {
    const results = await getTrainerById(id);
    const single = results.length > 0 ? results[0] : null;
    if(single) {
        trainer = new TrainerLogic(single);
        return trainer.export();
    }
    return null;
}