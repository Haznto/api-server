"use strict"

// require dependencies
const express = require('express');
const {medsProfile} = require('../models/index')
const router = express.Router();

//define routes
router.get('/medicines',handleGetmedicines)
router.get('/medicines/:id',handleGetmedicinesById)
router.put('/medicines/:id',handleUpdatemedicinesById)
router.post('/medicines',handlePostmedicines)
router.delete('/medicines/:id',handleDeletemedicinesById)

// GET all medicine
async function handleGetmedicines(req,res) {
    const id = req.params.id;
const onemedicines = await medsProfile.read();
res.status(200).json(onemedicines);
}

// GET a single medicine by ID
async function handleGetmedicinesById(req,res) {
    const id = req.params.id;
const onemedicines = await medsProfile.read(id);
res.status(200).json(onemedicines);
}

// PUT update existing medicine by ID
async function handleUpdatemedicinesById(req,res) {
    const id = req.params.id;
    const obj = req.body;
    const updatedmedicines = await medsProfile.update(id,obj);
    // const onemedicines = await medicines.findOne({ where: { id: id } });
res.status(202).json(updatedmedicines);
}

// POST create new medicine
async function handlePostmedicines(req,res) {
const obj = req.body;
const mediciness =  await medsProfile.create(obj)
res.status(201).json(mediciness);
}
// DELETE delete medicine by ID
async function handleDeletemedicinesById(req,res) {
    const id = req.params.id;
    const Deletedmedicines = await medsProfile.delete(id);
    // console.log(typeof(Deletedmedicines.message))
    const onemedicines = await medsProfile.read(id);
    Deletedmedicines.message?res.status(400).json({
        message: "id not found in our database, change it to one that exists."
    }):res.status(200).json(onemedicines);
}

module.exports = router;