const Assembly = require('../../models').Assembly
const validator = require('validator');

module.exports.CreateAssembly = async (req, res, next) => {
    let assembly = {}
    console.log(".....received request........" + req.body)  
    console.log(`creating an assembly with name ${req.body.assemblyName}`)
    if(!validator.isEmpty(req.body.assemblyName)){
    
        assembly = req.body

        let assemblyExist = await Assembly.findOne({
            where : {
                assemblyName:req.body.assemblyName
            }
        });
        
        if(!assemblyExist){
            await Assembly.create(assembly).then((resp) => {
            res.send({message:"sucess", data:resp, error:""})
            
            }).catch((err) => {
            console.log(err)}) 
        }else{
            res.send({message:'failed', error:'Assembly Name already exist'})
        } 
    
    }else{
        res.send({message:'failed', error:'Assembly Name cannot be empty'})
    }
}

module.exports.UpdateAssembly = async (req, res, next) => {
    assembly = {}
    console.log(".....received request........" + req.body)  
    console.log(`updating an assembly with name ${req.body.assemblyName}`)
    if(!validator.isEmpty(req.body.assemblyName)){
    
        assembly = req.body
        

        await Assembly.update(assembly,{
            where :{
                id:req.params.id
            }
        }).then((resp) => {
            res.send({message:"sucess", data:resp, error:""})
            
            }).catch((err) => {
            console.log(err)}) 
        
    
    }else{
        res.send({message:'failed', data:'', error:'Update not successful'})
    }
}

module.exports.FindAllAssemblies = async (req, res, next) => {
    let assembly = {}
    console.log(".....received request........" + req.body)  
    console.log(`retrieving all assemblies`)
   
        await Assembly.findAll().then((resp) => {
            res.send({message:"sucess", data:resp, error:""})
            }).catch((err) => {
            console.log(err)
        }) 
}

module.exports.FindOneAssembly = async (req, res, next) => {

    console.log(".....received request........" + req.body)  
    console.log(`retriving an assembly with id ${req.params.id}`)
  
    if (validator.isEmpty(req.params.id)){
        res.send({message:"failed", data:"", error:"Cannot retrieve null data"})
    }else {
        let assembly = await Assembly.findOne({
            where:{
                id:req.params.id
            }
        })

        if (assembly) {
            res.send({message:"success", data:assembly, error:""})
        } else {
            res.send({message:"failed", data:"", error:"Cannot retrieve null data"})
        }
    }
}

module.exports.DeleteAssembly = async (req, res, next) => {

    console.log(".....received request........" + req.body)  
    console.log(`deleting an assembly with name ${req.body.assemblyName}`)
  
    if (validator.isEmpty(req.params.id)){
        res.send({message:"failed", data:"", error:"Assembly do not exist"})
    }else {
        let assembly = await Assembly.destroy({
            where:{
                id:req.params.id
            }
        })

        if (assembly) {
            res.send({message:"success", error:""})
        } else {
            res.send({message:"failed", data:"", error:"Assembly do not exist"})
        }
    }
}
