const {User} = require('../../../models');
const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req,res) => {
    //check how to use fastest validator
    const schema = {
        name: 'string|empty:false',
        email: 'email|empty:false',
        password: 'string|min:6',
        profession: 'string|optional'
    }

    //take all parameter in request body
    const validate = v.validate(req.body, schema);

    //validate will return array
    //if array length > 0 then have a error
    if(validate.length){
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    //find if new email has store in table
    const user = await User.findOne({
        where: {email : req.body.email}
    });

    if(user) {
        //409 : conflict data if exists
        return res.status(409).json({
            status: 'error',
            message: 'email already exists'
        })
    }

    //hash password if email not already exists
    const password = await bcrypt.hash(req.body.password, 10);

    //set data to object
    const data = {
        password,
        name: req.body.name,
        email: req.body.email,
        profession: req.body.profession,
        role: 'student'
    };

    //create user data
    const createdUser = await User.create(data);

    //returning
    return res.json({
        status: 'success',
        data : {
            id: createdUser.id
        }
    })
}