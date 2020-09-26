const {User} = require('../../../models');
const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req,res) => {

    //validate
    const schema = {
        email: 'email|empty:false',
        password: 'string|min:6'
    }

    const validate = v.validate(req.body, schema);
    
    if(validate.length){
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    //find email
    const user = await User.findOne({
        where: {email: req.body.email}
    });

    //if dont return message
    if(!user){
        return res.status(404).json({
            status:'error',
            message: 'user not found'
        })
    }

    //check if user enter valid password using bcrypt.compare
    //first parameter req from body (not hashing or plain text)
    //second parameter from database cause turn true
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);

    //if user enter invalid password
    if(!isValidPassword){
        return res.status(404).json({
            status: 'error',
            message: 'user not found'
        })
    }

    return res.json({
        status: 'success',
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            profession: user.profession
        }
    })
}