function auth(req, res, next) {
  const token = req.headers.token;
  const decodedData = jwt.verify(token, JWT_SECRECT);

  if (decodedData) {
    req.Userid = decodedData.id;
    next();
  } else {
    res.status(403).json({
      msg: "Wrong cridentials"
    });
  }
}
module.export={auth};
