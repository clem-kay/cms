const Committee = require('../../models').Committee
const validator = require('validator');

module.exports.CreateCommittee = async (req, res, next) => {
    let committee = {}
    console.log(".....received request........" + req.body)  
    console.log(`creating an commitee with name ${req.body.committeeName}`)
    if(!validator.isEmpty(req.body.committeeName)){
    
        committee = req.body

        let committeeExist = await Committee.findOne({
            where : {
                committeeName:req.body.committeeName
            }
        });
        
        if(!committeeExist){
            await Committee.create(committee).then((resp) => {
            res.send({message:"sucess", data:resp, error:""})
            
            }).catch((err) => {
            console.log(err)}) 
        }else{
            res.send({message:'failed', error:'Commitee Name already exist'})
        } 
    
    }else{
        res.send({message:'failed', error:'Commitee Name cannot be empty'})
    }
}

module.exports.UpdateCommittee = async (req, res, next) => {
    let committee = {}
    console.log(".....received request........" + req.body)  
    console.log(`updating a commitee with name ${req.body.committeeName}`)
    //TODO: update to have commitee head
    if(!validator.isEmpty(req.body.committeeName)){
    
        committee.committeeName = req.body.committeeName
        

        await Committee.update(committee,{
            where :{
                id:req.params.id
            }
        }).then((resp) => {
            res.send({message:"sucess", data:resp, error:""})
            
            }).catch((err) => {
            console.log(err)}) 
        
    
    }else{
        res.send({message:'failed', error:'Update not successful'})
    }
}

module.exports.FindAllCommittees = async (req, res, next) => {
    console.log(".....received request........" + req.body)  
    console.log(`retrieving all commitee`)
   
        await Committee.findAll().then((resp) => {
            res.send({message:"sucess", data:resp, error:""})
            }).catch((err) => {
            console.log(err)
        }) 
}

module.exports.FindOneCommittee = async (req, res, next) => {

    console.log(".....received request........" + req.body)  
    console.log(`retriving a commitee with id ${req.params.id}`)
  
    if (validator.isEmpty(req.params.id)){
        res.send({message:"failed", data:"", error:"Cannot retrieve null data"})
    }else {
        let committee = await Committee.findOne({
            where:{
                id:req.params.id
            }
        })

        if (committee) {
            res.send({message:"success", data:committee, error:""})
        } else {
            res.send({message:"failed", data:"", error:"Cannot retrieve null data"})
        }
    }
}

module.exports.DeleteCommittee = async (req, res, next) => {

    console.log(".....received request........" + req.body)  
    console.log(`deleting a commitee with name ${req.body.committeeName}`)
  
    if (validator.isEmpty(req.params.id)){
        res.send({message:"failed", data:"", error:"Commitee id do not exist"})
    }else {
        let committee = await Committee.destroy({
            where:{
                id:req.params.id
            }
        })

        if (committee) {
            res.send({message:"success", error:""})
        } else {
            res.send({message:"failed", data:"", error:"Commitee do not exist"})
        }
    }
}
