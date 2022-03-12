const UserAccount = require('../../models').UserAccount
const validator = require('validator');

const crypto = require('crypto');
let secret = "salemAssembly"


module.exports.Login = async (req, res, next) => {
    console.log(".....received request........" + req.body)
    console.log(req.body)
    if (!validator.isEmail(req.body.email) || validator.isEmpty(req.body.password)){
        loginErrorMessage = 'Incorrect Email or password';
        res.send({message:'failed', error:loginErrorMessage } )
    }

    let user = await UserAccount.findOne({
        where : {
            email:req.body.email
        }
    });

    if (user) {

        if (user.password == hashPassword(req.body.password)){
            res.send({message:'sucess',user:user} )
        }else {
            loginErrorMessage = 'Incorrect username or password';
            res.send({message:'failed', error:loginErrorMessage } )
        }
    }else {
        loginErrorMessage = 'User not found';
        res.send({message:'failed', error:loginErrorMessage } )
    }
    

}



module.exports.Logout = async (req,res,next) =>{
    
    req.session.destroy ((error) => {
        if (error) {
            console.log('Error:failed to destroy session during logout'); 
            req.user = null;
            res.redirect('/login')}

    }

   
)};

//hash password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
}