const { pubsub } = require('./pubsub');

const subscriptions = {
  requestApproved: {
    subscribe: () => pubsub.asyncIterator(['requestApproved']),
  }
}

module.exports = subscriptions;