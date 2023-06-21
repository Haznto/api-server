"use strict"

const express = require('express');
const {Patient, medsProfile} = require('../models/index')
const {patientProfile} = require('../models/index')
const router = express.Router();

router.get('/patient',handleGetpatient)
router.get('/patient',handleGetpatient)
router.get('/patient/:id',handleGetpatientById)
router.get('/patient-profile/:id',patientProfileById)
router.put('/patient/:id',handleUpdatepatientById)
router.post('/patient',handlePostpatient)
router.delete('/patient/:id',handleDeletepatientById)

// async function handleGetpatient(req,res) {
// const allpatient = await Patient.findAll();
// res.status(200).json(allpatient);
// }
// async function handleGetpatientById(req,res) {
//     const id = req.params.id;
// const onepatient = await Patient.findOne({ where: { id: id } });
// res.status(200).json(onepatient);
// }
async function handleGetpatient(req,res) {
    const id = req.params.id;
const onepatient = await patientProfile.read();
res.status(200).json(onepatient);
}
async function handleGetpatientById(req,res) {
    const id = req.params.id;
const onepatient = await patientProfile.read(id);
res.status(200).json(onepatient);
}


async function handleUpdatepatientById(req,res) {
    const id = req.params.id;
    const obj = req.body;
    const updatedPatient = await patientProfile.update(id,obj);
    // const onepatient = await Patient.findOne({ where: { id: id } });
res.status(202).json(updatedPatient);
}
async function handlePostpatient(req,res) {
const obj = req.body;
const Patients =  await patientProfile.create(obj)
res.status(201).json(Patients);
}
async function handleDeletepatientById(req,res) {
    const id = req.params.id;
    const DeletedPatient = await patientProfile.delete(id);
    // console.log(typeof(DeletedPatient.message))
    const onepatient = await patientProfile.read(id);
    DeletedPatient.message?res.status(400).json({
        message: "id not found in our database, change it to one that exists."
    }):res.status(200).json(onepatient);
}

async function patientProfileById(req, res) {
    const id = req.params.id;
    const patientProfileById = await patientProfile.readPatientProfile(id, medsProfile.model);
    res.status(200).json(patientProfileById)
  }

module.exports = router;