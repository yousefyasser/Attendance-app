const express = require('express')
const app = express()
const ejs = require('ejs')
const { connectToDb, getDb} = require('./db')

app.set('view engine', 'ejs')
app.use(express.json())

//database connection
let db

connectToDb((err) => {
    if(!err){
            app.listen(3000, () => {
                console.log('listening on port 3000...')
            })
        db = getDb()
    }
})

// routes
app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/event', (req, res) => {
    db.collection('event')
    .findOne({id: req.query.id})
    .then(doc => {
        if(doc == null){
            res.render('return.ejs')
        }else{
            res.redirect(`/event/attended?id=${doc.id}`)
        }
    })
    .catch(err => {
        res.status(500).json({error: 'could not fetch the documents'})
    })
})
                
app.get('/event/attended', (req, res) => {
    let date_time = new Date();
    let day = ("0" + date_time.getDate()).slice(-2);
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
    let year = date_time.getFullYear();
    let hours = date_time.getHours();
    let minutes = date_time.getMinutes();
    let seconds = date_time.getSeconds();
    let update = day + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds

    db.collection('event')
    .updateOne({id: req.query.id}, {$push: {"Timestamp": update}})
    .then(result => {
        res.render('attended.ejs')
    })
    .catch(err => {
        res.status(500).json({error: 'Could not Update document'})
    })
})
