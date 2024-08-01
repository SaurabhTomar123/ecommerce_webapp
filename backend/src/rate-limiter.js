const RateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const redis = require('./clients/redis');
const Boom = require('boom');


const limiter = new RateLimit({
  store: new RedisStore({
    client: redis,
    resetExpiryOnChange: true,
    expiry: 30,
  }),
  max: 1000,
  handler: (req, res, next) => {
    next(Boom.tooManyRequests());
  },
});

export default limiter;
