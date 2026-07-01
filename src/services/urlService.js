const { nanoid } = require("nanoid");
const cacheService = require("./cacheService");

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

  const cached = await cacheService.get(
    shortCode
  );

  if (cached) {
    console.log("CACHE HIT");
    return JSON.parse(cached);
  }

  console.log("CACHE MISS");

  const url =
    await urlRepository.findByShortCode(
      shortCode
    );

  if (!url) {
    throw new Error(
      "URL_NOT_FOUND"
    );
  }

  await cacheService.set(
    shortCode,
    url.original_url
  )

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