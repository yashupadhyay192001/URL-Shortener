const express = require('express');

const router = express.Router();

const {
  createShortUrl,
  redirectUrl,
  getAnalytics
} = require('../controllers/urlController');
const urlValidator = require('../validators/urlValidator');

router.post(
  '/shorten',
  urlValidator,
  createShortUrl
);

router.get(
  '/:shortCode',
  redirectUrl
);

router.get(
  '/analytics/:shortCode',
  getAnalytics
);

module.exports = router;