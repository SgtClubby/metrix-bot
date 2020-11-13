const MongoClient = require('mongodb').MongoClient

const mongoInsert = (url, database, collection, data) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        var dbo = db.db(database)
        var coll = dbo.collection(collection)
        coll.insertOne(data, function(err, res) {})
        db.close()
        Promise.resolve(res).then(() => {return res})
    })
}
exports.mongoInsert = mongoInsert


const mongoUpdate = (url, database, collection, my_query, new_values) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if (err) throw err
        var dbo = db.db(database)

        dbo.collection(collection).updateOne(my_query, new_values, function(err, res) {
            if (err) throw err
            db.close()
            Promise.resolve(res).then(() => {return res})
        })
    })
}
exports.mongoUpdate = mongoUpdate


const mongoDelete = (url, database, collection, my_query) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if (err) throw err
        var dbo = db.db(database)
        dbo.collection(collection).deleteOne(my_query, async function(err, res) {
            if (err) throw err
            db.close()
            Promise.resolve(res).then(() => {return res})
        })
    })
}
exports.mongoDelete = mongoDelete


const mongoFind = (url, database, collection, my_query) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if (err) throw err
        var dbo = db.db(database)
        dbo.collection(collection).findOne(my_query, async function(err, res) {
            if (err) throw err
            db.close()
            Promise.resolve(res).then(() => {return res})
        })
    })
}
exports.mongoFind = mongoFind