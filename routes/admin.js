const routes = require('express').Router();
const admin = require('../controllers/AdminController')

routes.get('/dashboard',admin.dashboard)

routes.get('/add',admin.add)
routes.post('/add',admin.addPost)

routes.get('/:id/edit',admin.edit)
routes.post('/:id/edit',admin.editPost)

routes.get('/:id/delete',admin.delete)

module.exports = routes