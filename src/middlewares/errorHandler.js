module.exports =
  (err, req, res, next) => {

    console.error(err);

    if (
      err.message ===
      "URL_NOT_FOUND"
    ) {

      return res.status(404).json({
        message:
          "URL Not Found"
      });

    }

    return res.status(500).json({
      message:
        "Internal Server Error"
    });
  };