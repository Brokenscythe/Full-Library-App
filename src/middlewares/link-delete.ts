export const linkdelete = function (req, res, next) {
    if (req.query._method == "DELETE") {
      req.method = "DELETE";
      console.log(req.url);
      console.log(req.path);
      req.url = req.path;
    }
    next();
  }