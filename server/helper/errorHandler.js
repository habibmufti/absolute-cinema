function errorHandler(err, req, res, next) {
    switch (err.name) {
      case "SequelizeValidationError":
      case "SequelizeUniqueConstraintError":
        res.status(400).json({ message: err.errors.map((err) => err.message) });
        break;
      case "fileRequired":
        res.status(400).json({ message: `image is required` });
        break;
      case "noEmail":
        res.status(400).json({ message: `email is required` });
        break;
      case "noPassword":
        res.status(400).json({ message: `password is required` });
        break;
      case "paid":
        res.status(400).json({ message: `this ticket is already paid` });
        break;
      case "noQty":
        res.status(400).json({ message: `minimum ticket is 1` });
        break;
      case "notFound":
        res.status(404).json({ message: `data not found` });
        break;
      case "notAdmin":
        res.status(403).json({ message: `youre not an admin` });
        break;
      case "forbidden":
        res.status(403).json({ message: `youre not authorized` });
        break;
      case "invalid token":
      case "JsonWebTokenError":
        res.status(401).json({ message: `invalid token` });
        break;
      case "needLogin":
        res.status(401).json({ message: `please login first` });
        break;
      case "invalid":
        res.status(401).json({ message: `username/password is incorrect` });
        break;
      default:
        // res.status(500).json({ message: `internal server error` })
        res.send(err);
        break;
    }
}

module.exports = errorHandler;