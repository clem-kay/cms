const Ministry = require('../../models').Ministry
const validator = require('validator');

module.exports.CreateMinistry = async (req, res, next) => {
    let ministry = {}
    console.log(".....received request........" + req.body)  
    console.log(`creating an ministry with name ${req.body.ministryName}`)
    if(!validator.isEmpty(req.body.ministryName)){
    
        ministry = req.body

        let ministryExist = await Ministry.findOne({
            where : {
                ministryName:req.body.ministryName
            }
        });
        
        if(!ministryExist){
            await Ministry.create(ministry).then((resp) => {
            res.send({message:"sucess", data:resp, error:""})
            
            }).catch((err) => {
            console.log(err)}) 
        }else{
            res.send({message:'failed', error:'Ministry Name already exist'})
        } 
    
    }else{
        res.send({message:'failed', error:'Ministry Name cannot be empty'})
    }
}

module.exports.UpdateMinistry = async (req, res, next) => {
    ministry = {}
    console.log(".....received request........" + req.body)  
    console.log(`updating a ministry with name ${req.body.ministryName}`)
    if(!validator.isEmpty(req.body.ministryName)){
    
        ministry.ministryName = req.body.ministryName
        
        let ministryExist = await Ministry.findOne({
            where : {
                id:req.params.id
            }
        });
        console.log(ministryExist)

        if (ministryExist){
            await Ministry.update(ministry, {
                where :{
                    id:req.params.id
                }
            }).then((resp) => {
                res.send({message:"sucess", data:resp, error:""})
                
                }).catch((err) => {
                console.log(err)}) 
        }else{
            res.send({message:'failed', error:'Ministry do not exist'})
        } 
    
    }else{
        res.send({message:'failed', error:'Update not successful'})
    }
}

module.exports.FindAllMinistries = async (req, res, next) => {
    console.log(".....received request........" + req.body)  
    console.log(`retrieving all ministry`)
   
        await Ministry.findAll().then((resp) => {
            res.send({message:"sucess", data:resp, error:""})
            }).catch((err) => {
            console.log(err)
        }) 
}

module.exports.FindOneMinistry = async (req, res, next) => {

    console.log(".....received request........" + req.body)  
    console.log(`retriving a ministry with id ${req.params.id}`)
  
    if (validator.isEmpty(req.params.id)){
        res.send({message:"failed", data:"", error:"Cannot retrieve null data"})
    }else {
        let ministry = await Ministry.findOne({
            where:{
                id:req.params.id
            }
        })

        if (ministry) {
            res.send({message:"success", data:ministry, error:""})
        } else {
            res.send({message:"failed", data:"", error:"Cannot retrieve null data"})
        }
    }
}

module.exports.DeleteMinistry = async (req, res, next) => {

    console.log(".....received request........" + req.body)  
    console.log(`deleting a ministry with name ${req.body.ministryName}`)
  
    if (validator.isEmpty(req.params.id)){
        res.send({message:"failed", data:"", error:"Ministry id do not exist"})
    }else {
        let ministry = await Ministry.destroy({
            where:{
                id:req.params.id
            }
        })

        if (ministry) {
            res.send({message:"success", error:""})
        } else {
            res.send({message:"failed", data:"", error:"Ministry do not exist"})
        }
    }
}
