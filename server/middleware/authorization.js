const { User, Ticket } = require("../models")


async function authorizedRole(req, res, next) {
    try {
        const user = req.user
        const id = req.body.ticketId ? req.body.ticketId : req.params.id;
        const ticket = await Ticket.findByPk(id)
        if (!ticket) throw { name: `notFound` }
        if ( ticket.UserId !== user.id) throw { name: `forbidden` }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = { authorizedRole }