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
        set_response_error(res, 'missing required id parameter', 401);
        return false;
    }

    return true;
}

exports.validateGetWorkoutById = (req, res) => {
    if(!req.query.id) {
        set_response_error(res, 'missing required id parameter', 401);
        return false;
    }

    return true;
}