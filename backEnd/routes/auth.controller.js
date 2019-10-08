
const express = require('express');
const router = express.Router();
const authService = require('./auth.service');

// routes
router.post('/authenticate', authenticate);
router.get('/', getAll);

module.exports = router;

function authenticate(req, res, next) {
    authService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    authService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}