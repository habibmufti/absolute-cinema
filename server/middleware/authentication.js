const { verifyToken } = require("../helper/jwt")
const { User } = require("../models")

async function authentication(req, res, next) {
    try {
        const accesToken = req.headers.authorization
        if (!accesToken) throw { name: `needLogin` }
        const token = accesToken.split(" ")[1]
        const payload = verifyToken(token)
        if (!payload) throw { name: `invalid token` }
        const user = await User.findByPk(payload.id)
        if (!user) throw { name: `invalid token` }
        req.user = user
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authentication