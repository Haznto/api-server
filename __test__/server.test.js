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
  })