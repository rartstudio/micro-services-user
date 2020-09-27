const {User} = require('../../../models');

module.exports = async (req,res) => {

    //get user ids (using filter)
    //if dont find return empty array
    //if find return array based on request
    const userIds = req.query.user_ids || [];

    const sqlOptions = {
        attributes: ['id','name','email','role','profession','avatar']
    }

    //if any user req
    if(userIds.length){
        //if we pass an array in where it will return where id in(....)
        sqlOptions.where = {
            id: userIds
        }
    }

    //find all users and choose attribute want to display 
    const users = await User.findAll(sqlOptions);

    return res.json({
        status: 'success',
        data : users
    })
}