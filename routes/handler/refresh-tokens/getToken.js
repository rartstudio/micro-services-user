const { RefreshToken } = require('../../../models')

module.exports = async (req,res) => {
    const refreshToken = req.query.refresh_token;
    const token = await RefreshToken.findOne({
        where: {token: refreshToken}
    })

    //check token if exist
    if(!token){
        return res.status(400).json({
            status: 'error',
            message: 'invalid_token'
        })
    }

    return res.json({
        status: 'success',
        token
    })
}