const MongoClient = require("mongodb").MongoClient;
require('dotenv').config()

class Connection {
   static async connectToMongo() {
      if (this.db) return this.db;
      const client = new MongoClient(this.url, this.options);
      this.db = await client.connect().catch((err) => console.log(err));
      return this.db;
   }
}

Connection.db = null;
Connection.url = process.env.URIMONGO;
Connection.options = {
   useNewUrlParser: true,
   useUnifiedTopology: true,
};

module.exports = { Connection };