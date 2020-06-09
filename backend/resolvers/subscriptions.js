const { pubsub } = require('./pubsub');

const subscriptions = {
  quizRequested: {
    subscribe: () => pubsub.asyncIterator(['quizRequested']),
  }
}

module.exports = subscriptions;