"use strict"

//requering dependencies
const express = require('express');
const {Games} = require('../models/index')
const router = express.Router();

//defining routes
router.get('/games',handleGetgames)
router.get('/games/:id',handleGetgamesById)
router.put('/games/:id',handleUpdategamesById)
router.post('/games',handlePostgames)
router.delete('/games/:id',handleDeletegamesById)

// GET all Games
async function handleGetgames(req,res) {
const allgames = await Games.findAll();
res.status(200).json(allgames);
}

// GET a single Games by ID
async function handleGetgamesById(req,res) {
    const id = req.params.id;
const onegames = await Games.findOne({ where: { id: id } });
res.status(200).json(onegames);
}

// PUT update existing Games by ID
async function handleUpdategamesById(req,res) {
    const id = req.params.id;
    const obj = req.body;
    const updatedGame = await Games.update(obj,{ where: { id: id }});
    const onegames = await Games.findOne({ where: { id: id } });
res.status(202).json(onegames);
}

// POST create new Games
async function handlePostgames(req,res) {
const obj = req.body;
const Game =  await Games.create(obj)
res.status(201).json(Game);
}

// DELETE delete Games by ID
async function handleDeletegamesById(req,res) {
    const id = req.params.id;
    const DeletedGame = await Games.destroy({ where: { id: id }});
    const onegames = await Games.findOne({ where: { id: id } });
res.status(200).json(onegames);
}

module.exports = router;