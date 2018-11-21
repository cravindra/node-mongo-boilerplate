const express = require('express');
const router = express.Router();
const crudFactory = Model => {
    const router = express.Router();
    /**
     * Route to fetch all models
     * @method GET
     */
    router.get('/', (req, res) => {
        let { limit = 10, page = 0 } = req.query;
        limit = +limit;
        page = +page;
        if (isNaN(page) || isNaN(limit)) {
            return res.error(400);
        }
        delete req.query.limit;
        delete req.query.page;
        Model.find({ ...req.query })
            .limit(limit)
            .skip(limit * page)
            .exec()
            .then(data => res.ok({ data }))
            .catch(err => res.error(400, { errors: err.errors, message: 'Bad request' }));
    });
    router.post('/', (req, res) => {
        Model.create(req.body)
            .then(data => res.ok(201, { data }))
            .catch(err => res.error(400, { info: err, message: 'Bad request' }));
    });

    return router;
};


const pluralize = word => `${word}s`;

module.exports = Object.keys(_models).reduce((router, key) => {
    router.use(`/${pluralize(key.toLowerCase())}`, crudFactory(_models[key]))
    return router;
}, router);