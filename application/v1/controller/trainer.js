const { validateGetTrainerById, trainerExistsById } = require('../logic/validator');
const { getTrainerById } = require('../logic/factories/trainer');

exports.getTrainerById = async (req, res) => {
    if(validateGetTrainerById(req, res)
    && await trainerExistsById(req, res)) {
        const trainer = await getTrainerById(req.query.id);
        res.status(200);
        res.send({
            trainer
        })
    }
}