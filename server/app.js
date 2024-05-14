if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors");
const UserController = require("./controller/userController");
const errorHandler = require("./helper/errorHandler");
const MovieController = require("./controller/movieController");
const authentication = require("./middleware/authentication");
const TicketController = require("./controller/ticketController");
const { authorizedRole } = require("./middleware/authorization");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post("/register", UserController.register);
app.post("/login", UserController.login)
app.post("/google-login", UserController.googleLogin);
app.use(authentication)
app.get("/movies", MovieController.getNowShowing);
app.get("/movies/:id", MovieController.getMovieDetail)
app.get("/tickets", TicketController.getTicket);
// app.post("/payment-token", TicketController.getPaymentToken)
app.post("/buy", TicketController.buyTicket)
app.patch("/pay/:id", authorizedRole, TicketController.ticketPaid)
app.patch("/close/:id", authorizedRole, TicketController.closePayment);
app.delete("/:id", authorizedRole, TicketController.destroyTicket)



app.use(errorHandler);

module.exports = app;
