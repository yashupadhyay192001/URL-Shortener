const errorHandler = require("../middlewares/errorHandler");
const urlService =
  require("../services/urlService");

exports.createShortUrl =
  async (req, res, next) => {

    try {

      const { url } = req.body;

      const result =
        await urlService
          .createShortUrl(url);

      return res.json({
        shortUrl:
          `http://localhost:3000/api/${result.short_code}`
      });

    } catch (error) {

      next(error);

    }
  };

exports.redirectUrl =
  async (req, res, next) => {

    try {

      const originalUrl =
        await urlService.getOriginalUrl(
          req.params.shortCode
        );

      return res.redirect(
        originalUrl
      );

    } catch (error) {

      next(error);

    }
  };

exports.getAnalytics = async (req, res, next) => {
  try {
    const { shortCode } = req.params;

    const analytics = await urlService.getAnalytics(shortCode);

    res.json(analytics);

  } catch (error) {

    next(error);

  }
}

