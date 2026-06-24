const { nanoid } = require("nanoid");

const urlRepository = require(
  "../repositories/urlRepository"
);

exports.createShortUrl = async (
  originalUrl
) => {

  const existing =
    await urlRepository.findByOriginalUrl(
      originalUrl
    );

  if (existing) {
    return existing;
  }

  const shortCode = nanoid(6);

  return urlRepository.createUrl({
    original_url: originalUrl,
    short_code: shortCode
  });
};

exports.getOriginalUrl = async (
  shortCode
) => {

  const url =
    await urlRepository.findByShortCode(
      shortCode
    );

  if (!url) {
    throw new Error(
      "URL_NOT_FOUND"
    );
  }

  await url.increment("clicks");

  return url.original_url;
};

exports.getAnalytics =
  async (shortCode) => {

    const url =
      await urlRepository
        .findByShortCode(shortCode);

    if (!url) {
      throw new Error(
        "URL_NOT_FOUND"
      );
    }

    return {
      originalUrl:
        url.original_url,

      clicks:
        url.clicks,

      createdAt:
        url.createdAt
    };
  };