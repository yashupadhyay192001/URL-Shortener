const Url = require("../models/Url");

exports.findByOriginalUrl = async (url) => {
  return Url.findOne({
    where: {
      original_url: url
    }
  });
};

exports.findByShortCode = async (shortCode) => {
  return Url.findOne({
    where: {
      short_code: shortCode
    }
  });
};

exports.createUrl = async (data) => {
  return Url.create(data);
};