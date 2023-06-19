"use strict"

const express = require('express');
const {Games} = require('../models/index')
const router = express.Router();

router.get('/games',handleGetgames)
router.get('/games/:id',handleGetgamesById)
router.put('/games/:id',handleUpdategamesById)
router.post('/games',handlePostgames)
router.delete('/games/:id',handleDeletegamesById)

async function handleGetgames(req,res) {
const allgames = await Games.findAll();
res.status(200).json(allgames);
}
async function handleGetgamesById(req,res) {
    const id = req.params.id;
const onegames = await Games.findOne({ where: { id: id } });
res.status(200).json(onegames);
}
async function handleUpdategamesById(req,res) {
    const id = req.params.id;
    const obj = req.body;
    const updatedGame = await Games.update(obj,{ where: { id: id }});
    const onegames = await Games.findOne({ where: { id: id } });
res.status(202).json(onegames);
}
async function handlePostgames(req,res) {
const obj = req.body;
const Game =  await Games.create(obj)
res.status(201).json(Game);
}
async function handleDeletegamesById(req,res) {
    const id = req.params.id;
    const DeletedGame = await Games.destroy({ where: { id: id }});
    const onegames = await Games.findOne({ where: { id: id } });
res.status(200).json(onegames);
}

module.exports = router;