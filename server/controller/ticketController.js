const { Ticket, Movie, User } = require("../models");
const midtransClient = require("midtrans-client");

class TicketController {
  static async buyTicket(req, res, next) {
    try {
      const { MovieId, qty } = req.body;
      if (qty < 1 || !qty) throw { name: "noQty" };
      const user = req.user;

      const ticket = await Ticket.create({
        UserId: user.id,
        MovieId: MovieId,
        quantity: qty,
      });
      if (ticket.isPaid) throw {name: "paid"}
      const movie = await Movie.findOne({where: {id: ticket.MovieId}})
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: "TRANSACTION_" + new Date().toISOString() + `_${user.id}`,
          gross_amount: movie.price * ticket.quantity,
        },
        item_details: {
          ticketId: ticket.id,
          price: movie.price,
          quantity: ticket.quantity,
          name: "Ticket " + movie.title,
        },
        customer_details:{
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email
        }
        ,
        credit_card: {
          secure: true,
        },
      };

      snap.createTransaction(parameter).then((transaction) => {
        let token = transaction.token;
        let url = transaction.redirect_url;
        res.status(201).json({token, url, ticket})
      });
    } catch (err) {
      next(err)
    }
  }
  static async ticketPaid(req, res, next){
    try {
      const { id } = req.params;
      await Ticket.update({isPaid: true}, {where:{id}})
      res.status(200).json({message: "payment success"})
    } catch (err) {
      next(err)
    }
  }
  static async closePayment(req, res, next){
    try {
      const { id } = req.params;
      const {url} = req.body
      await Ticket.update({paymentUrl: url}, {where:{id}})
      res.status(200).json({message: "payment closed"})
    } catch (err) {
      next(err)
    }
  }
  static async destroyTicket(req, res, next){
    try {
      const {id}= req.params
      const ticket = await Ticket.findByPk(id)
      if(ticket.isPaid === false) throw {name: "forbidden"}
      await Ticket.destroy({where:{id}})
      res.status(200).json({message: "your ticket has been deleted"})
    } catch (err) {
      next(err)
    }
  }
  static async getTicket(req, res, next){
    try {
      const user = req.user;
      const ticket = await Ticket.findAll({
        where:{UserId: user.id},
        include: {
          model: Movie
        },
        
      });
      res.status(200).json(ticket)
    } catch (err) {
      next(err)
    }
  }
}
module.exports = TicketController;
