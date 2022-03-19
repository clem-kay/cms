const UserAccount = require('../../models').UserAccount
const User = require('../../models').User
const validator = require('validator');
const Sequelize = require('sequelize');
const { Op } = Sequelize.Op

const crypto = require('crypto');
let secret = "salemAssembly"

module.exports.CreateUser = async (req, res, next) => {
    console.log(req.body)

    if (!validator.isEmail(req.body.email) || validator.isEmpty(req.body.username)|| validator.isEmpty(req.body.firstName)|| validator.isEmpty(req.body.lastName)){
        loginErrorMessage = 'The following fields are required email, username, firstName, lastName, phoneNumber, roleId';
        res.send({message:'failed', error:loginErrorMessage } )
    }

    let userInfo = {
        firstName: req.body.firstName,
        middleName:req.body.middleName || '',
        lastName: req.body.lastName,
        email: req.body.email,
        DateOfBirth: req.body.DateOfBirth || '',
        maritalStatus: req.body.maritalStatus || 'Single',
        phoneNumber: req.body.phoneNumber,
        whatsapp:req.body.whatsapp || '',
        UserAccount: [
            {
                username: req.body.username,
                email: req.body.email,
                password: hashPassword("password"),
                RoleId: req.body.role,
                blocked: false
            }
        ]
    };

    console.log(userInfo)

    let emailOrPhoneNumberExist = await User.findOne({
        where: {
            
              email: req.body.email ,
            phoneNumber: req.body.phoneNumber
           
          }
    })

    if (!emailOrPhoneNumberExist){

        await User.create(userInfo,{ include: [UserAccount] }).then((resp) => {
            res.send({message:'success', error:'', data:resp})
        }).catch((err) => {
            console.log(err)
        })

    }else{
        res.send({message:'failed', error:'Email or Phone number exist' } )
    }

}

//hash password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
}