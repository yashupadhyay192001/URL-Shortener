const Url = require('../models/Url');
const { nanoid } = require('nanoid');
const validator = require('validator');

exports.createShortUrl = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        message: 'URL is required'
      });
    }

    const shortCode = nanoid(6);

    const existingUrl = await Url.findOne({
      where: {
        original_url: url
      }
    });

    if (existingUrl) {
      res.status(200).json({
        id: existingUrl.id,
        shortUrl: `http://localhost:3000/api/${existingUrl.short_code}`,
        message: 'URL already exists'
      })
    } else {
      const savedUrl = await Url.create({
        original_url: url,
        short_code: shortCode
      });

      res.status(201).json({
        id: savedUrl.id,
        shortUrl: `http://localhost:3000/api/${shortCode}`,
        message: 'Short URL created successfully'
      });
    }

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

exports.redirectUrl = async (req, res) => {

  try {

    const { shortCode } = req.params;

    const url = await Url.findOne({
      where: {
        short_code: shortCode
      }
    });

    if (!url) {
      return res.status(404).json({
        message: 'URL not found'
      });
    }

    await url.increment('clicks');

    return res.redirect(
      url.original_url
    );

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};