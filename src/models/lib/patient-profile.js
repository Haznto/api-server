'use strict'
// Creates a class to make new instances for each model, that has methods to perform CRUD.
class PatientProfile {
    constructor(model){
        this.model = model;
    }


    async read(id){
        let dataToWait = null;
        if(id) {
            dataToWait = await this.model.findOne( { where: { id: id } } )
        } else {
            dataToWait = await this.model.findAll()
        }
        return dataToWait;
    }

    async create(obj){
        let dataToWait = null;
        try{
            dataToWait = await this.model.create(obj)
            return dataToWait
        } catch (err) {
            console.log(`Error happened, check ${err}`)
        }

    }

    async update(id,obj) {
        try {

            let dataToWait = await this.model.update(obj,{ where: { id: id }});
            let afterUpdate = await this.read(id)
            return afterUpdate
        } catch (err) {
            console.log(`error : ${err}`)
            return err
        }
    }

    async delete(id) {
        try{
            
            if (await this.read(id)) {
            let dataToWait = await this.model.destroy({ where: { id: id }});
            return dataToWait
        } else throw new Error(`the id you sent doesn't exist in our database`)
    } catch (err){
        
        return err;
    }
    }

    async readPatientProfile(id, model) {
        const dataToWait = await this.model.findOne({
          where: { id },
          include: model
        });
        return dataToWait;
      }
    
}


module.exports = PatientProfile;