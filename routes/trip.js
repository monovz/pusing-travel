const routes = require('express').Router();

const TripController = require('../controllers/TripController');

routes.get('/', TripController.showAll)

routes.get('/:id', TripController.tripDetails)

routes.get('/:id/book', TripController.bookTrip)
routes.post('/:id/book', TripController.bookTripPost)

module.exports = routes