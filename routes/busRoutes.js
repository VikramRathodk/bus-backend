const express = require('express');
const router = express.Router();
const busController = require('../controllers/busController');


router.get(
    '/states',busController.getStates
);

router.get(
    '/cities/:stateId',
    busController.getCitiesByState
);

router.get(
    '/search-buses',
    busController.searchBuses
);

module.exports = router;