const {User} = require('../../../models');
const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
    const schema = {
        name: 'string|empty:false',
        email: 'email|empty:false',
        password: 'string|min:6',
        profession: 'string|optional',
        avatar: 'string|optional'
    };

    const validate = v.validate(req.body, schema);

    if(validate.length){
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    //get params id and check id if exist on database
    const id = req.params.id;
    const user = await User.findByPk(id);

    //return error if dont exist
    if(!user){
        return res.status(404).json({
            status: 'error',
            message: 'user not found'
        })
    }

    //user can change email
    //get body email and findone if exist then 
    //check if new email has store in database
    //if has return error
    const email = req.body.email;
    if(email){
        const checkEmail = await User.findOne({
            where: {email}
        });

        if(checkEmail && email !== user.email){
            return res.status(409).json({
                status: 'error',
                message: 'email already exist'
            })
        }
    }

    const password = await bcrypt.hash(req.body.password,10);
    const {
        name, profession, avatar
    } = req.body

    await user.update({
        email,
        password,
        name,
        profession,
        avatar
    });

    return res.json({
        status: 'success',
        data: {
            id: user.id,
            name,
            email,
            profession,
            avatar
        }
    })
}