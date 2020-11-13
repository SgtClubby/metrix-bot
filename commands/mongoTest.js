MongoDB = require("./MongodbAPI")
var url = "mongodb://localhost:27017"
var database = "FortiAPI"
var collection = "cloudkeys"
var my_query = {
    yes: 1
}

console.log(MongoDB.mongoFind(url, database, collection, my_query))


