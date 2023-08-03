const { createClient } = require('redis')

class Redis {
  constructor () {
    this.client = createClient({
      url: process.env.REDIS_URL
    })
    this.client.connect().then()
  }

  async set (key, object, TTL = 21600) {
    await this.client.set(key, object, {
      EX: TTL
    })
  }

  async get (key) {
    // eslint-disable-next-line
    return await this.client.get(key)
  }
}

module.exports = Redis
