const express = require('express');

const router = express.Router();

const {
  createShortUrl,
  redirectUrl,
  getAnalytics
} = require('../controllers/urlController');

router.post(
  '/shorten',
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