const validator =
  require("validator");

module.exports =
  (req, res, next) => {

    const { url } = req.body;

    if (
      !url ||
      !validator.isURL(url)
    ) {
      return res.status(400).json({
        message:
          "Invalid URL"
      });
    }

    next();
  };