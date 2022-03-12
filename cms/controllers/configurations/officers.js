const Officer = require('../../models').Officer
const validator = require('validator');

module.exports.CreateOfficer = async (req, res, next) => {
    console.log(".....received request........" + req.body)  
    console.log(`creating an assembly with name ${req.body.officerPosition}`)
    if(!validator.isEmpty(req.body.officerPosition)){
    
        officer = req.body

        let officerExist = await Officer.findOne({
            where : {
                officerPosition:req.body.officerPosition
            }
        });
        
        if(!officerExist){
            await Officer.create(officer).then((resp) => {
            res.send({message:"sucess", data:resp, error:""})
            
            }).catch((err) => {
            console.log(err)}) 
        }else{
            res.send({message:'failed', error:'Officer Name already exist'})
        } 
    
    }else{
        res.send({message:'failed', error:'Officer Name cannot be empty'})
    }
}

module.exports.UpdateOfficer = async (req, res, next) => {
    console.log(".....received request........" + req.body)  
    console.log(`Updating an assembly with name ${req.body.officerPosition}`)
    if(!validator.isEmpty(req.body.officerPosition)){
    
        officer = req.body

        let officerExist = await Officer.findOne({
            where:{
                id:req.params.id
            }
        })
        
if (officerExist){
        await Officer.update(officer,{
            where :{
                id:req.params.id
            }
        }).then((resp) => {
            res.send({message:"sucess", data:resp, error:""})
            
            }).catch((err) => {
            console.log(err)}) 
            }
            else{
                res.send({message:'failed', error:'Update not successful'})
            }
    
    }else{
        res.send({message:'failed', error:'Update not successful, Office do not exist'})
    }
}

module.exports.FindAllOfficers = async (req, res, next) => {
    console.log(".....received request........" + req.body)  
    console.log(`retrieving all office positions`)
   
        await Officer.findAll().then((resp) => {
            res.send({message:"sucess", data:resp, error:""})
            }).catch((err) => {
            console.log(err)
        }) 
}

module.exports.FindOneOffice = async (req, res, next) => {

    console.log(".....received request........" + req.body)  
    console.log(`retriving an office with id ${req.params.id}`)
  
    if (validator.isEmpty(req.params.id)){
        res.send({message:"failed", data:"", error:"Cannot retrieve null data"})
    }else {
        let officer = await Officer.findOne({
            where:{
                id:req.params.id
            }
        })

        if (officer) {
            res.send({message:"success", data:officer, error:""})
        } else {
            res.send({message:"failed", data:"", error:"Cannot retrieve null data"})
        }
    }
}

module.exports.DeleteOffice = async (req, res, next) => {

    console.log(".....received request........" + req.body)  
    console.log(`deleting an officer with name ${req.body.officerPosition}`)
  
    if (validator.isEmpty(req.params.id)){
        res.send({message:"failed", data:"", error:"Position do not exist"})
    }else {
        let officer = await Officer.destroy({
            where:{
                id:req.params.id
            }
        })

        if (officer) {
            res.send({message:"success", error:""})
        } else {
            res.send({message:"failed", data:"", error:"position do not exist"})
        }
    }
}
