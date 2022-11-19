const { MongoClient } = require('mongodb')

let dbConnection
const uri = 'mongodb+srv://Team_8:IEEE_Team_8@cluster0.8yckj9s.mongodb.net/?retryWrites=true&w=majority'

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(uri)
        .then((client) => {
            dbConnection = client.db('Task2')
            return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbConnection
}
