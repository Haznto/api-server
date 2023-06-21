"use strict"

require('dotenv').config();
const {app} = require('../src/server');
const supertest = require('supertest');
const req = supertest(app);
const { db } = require('../src/models/index');

beforeAll(async () => {
    await db.sync();
  })

afterAll(async () => {
    
    await db.drop();
  })

  describe('testing the server', () => {

    
    it('404 on a bad route', async () => {
      const res = await req.get('/pagenotFound')
      expect(res.status).toBe(404);
    });
    
    it('404 on a bad method', async () => {
      const res = await req.post('/records/1')
      expect(res.status).toBe(404);
    });
    it('Create a record using POST', async () => {
        const res = await req.post('/games').send({
            game: 'Resident Evil 5',
            category: 'Horror'
          });
          const createdGame = JSON.parse(res.text);
          expect(res.status).toBe(201);
          expect(createdGame.game).toEqual('Resident Evil 5')
          expect(createdGame.category).toEqual('Horror')
    });
    
    
    it('Read a list of records using GET', async () => {
      const res = await req.get('/games');
      console.log(res.body)
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    })
  
    it('Read a record using GET', async () => {
      const res = await req.get('/games/1');
      console.log(res.body)
      expect(res.status).toBe(200);
      expect(res.body.game).toBe('Resident Evil 5');
    })
    it('Update a record using PUT', async () => {
      const res = await req.put('/games/1').send({
        game: 'Resident Evil 4',
        category: 'Horror'
      });
      console.log(res.body)
      expect(res.status).toBe(202)
      expect(res.body.game).toBe('Resident Evil 4');
    })
  
    it('Destroy a record using DELETE', async () => {
      const res = await req.delete('/games/1');
      expect(res.status).toBe(200);
      expect(res.body).toBe(null);
    })

    //------------------------------------------------------------- New Related Model tests.

    it('Create a record using POST', async () => {
      const res = await req.post('/patient').send({
          patient: 'Zaid',
          gender: 'male'
        });
        const createdpatient = JSON.parse(res.text);
        expect(res.status).toBe(201);
        expect(createdpatient.patient).toEqual('Zaid')
        expect(createdpatient.gender).toEqual('male')
  });
    it('Create a record using POST', async () => {
      const res = await req.post('/medicines').send({
          drug: 'Propranolol',
          patientId: 1
        });
        const createdpatient = JSON.parse(res.text);
        expect(res.status).toBe(201);
        expect(createdpatient.drug).toEqual('Propranolol')
        expect(createdpatient.patientId).toEqual(1)
  });
  
  
  it('Read a list of records using GET', async () => {
    const res = await req.get('/patient');
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  })

  it('Read a record using GET', async () => {
    const res = await req.get('/patient/1');
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body.patient).toBe('Zaid');
  })
  it('Read a record using GET', async () => {
    const res = await req.get('/patient-profile/1');
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body.patient).toBe('Zaid');
    expect(res.body.medicines[0].drug).toBe('Propranolol');
  })
  it('Update a record using PUT', async () => {
    const res = await req.put('/patient/1').send({
      patient: 'Hussam',
      gender: 'male'
    });
    console.log(res.body)
    expect(res.status).toBe(202)
    expect(res.body.patient).toBe('Hussam');
  })

  it('Destroy a record using DELETE', async () => {
    const res = await req.delete('/patient/1');
    expect(res.status).toBe(200);
    expect(res.body).toBe(null);
  })
  it('Destroy a record using DELETE if ID not exist', async () => {
    const res = await req.delete('/patient/1321313');
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("id not found in our database, change it to one that exists.");
  })
  })