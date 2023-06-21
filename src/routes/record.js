"use strict"

// require dependencies
const express = require('express');
const {Records} = require('../models/index')
const router = express.Router();

// define routes
router.get('/records',handleGetRecords)
router.get('/records/:id',handleGetRecordsById)
router.put('/records/:id',handleUpdateRecordsById)
router.post('/records',handlePostRecords)
router.delete('/records/:id',handleDeleteRecordsById)

// GET all recordes
async function handleGetRecords(req,res) {
const allRecords = await Records.findAll();
res.status(200).json(allRecords);
}

// GET a single recordes by ID
async function handleGetRecordsById(req,res) {
    const id = req.params.id;
const oneRecords = await Records.findOne({ where: { id: id } });
res.status(200).json(oneRecords);
}

// PUT update existing recordes by ID
async function handleUpdateRecordsById(req,res) {
    const id = req.params.id;
    const obj = req.body;
    const updatedRecord = await Records.update(obj,{ where: { id: id }});
    const oneRecords = await Records.findOne({ where: { id: id } });
    res.status(202).json(oneRecords);
}

// POST create new recordes
async function handlePostRecords(req,res) {
const obj = req.body;
const record =  await Records.create(obj)
res.status(201).json(record);
}

// DELETE delete recordes by ID
async function handleDeleteRecordsById(req,res) {
    const id = req.params.id;
    const DeletedRecord = await Records.destroy({ where: { id: id }});
    const oneRecords = await Records.findOne({ where: { id: id } });
res.status(200).json(oneRecords);
}

module.exports = router;