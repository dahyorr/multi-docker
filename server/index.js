const keys = require('./keys')

// Express app setup
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

// postgres setup
const {Pool} = require('pg')
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort,
})
pgClient.on('error', () => console.log('Lost PG Connection'))
pgClient.query('CREATE TABLE IF NOT EXISTS values (number INT);')
    .catch(err => console.log(err))


// Redis Setup
const redis = require('redis')
const redisClient = redis.createClient({
    host: keys.redisHost,
    post: keys.redisPort,
    retry_strategy: () => 1000,
})
const redisPublisher = redisClient.duplicate()

// express route handler
app.get('/', (req, res) => {
    return res.send('Hi')
})

app.get('/values/all', async (req, res) => {
    const values = await pgClient.query('SELECT * from values')
    res.send(values.rows)
})

app.get('/values/current', async (req, res) => {
    redisClient.hgetall('values', (err, values) => {
        res.send(values)
    })
})

app.post('/values', async (req, res) => {
    const {index} = req.body
    if (parseInt(index) > 40){
        return res.status(422).send('Index too High')
    }
    redisClient.hset('values', index, 'Nothing Yet!')
    redisPublisher.publish('insert', index)
    pgClient.query('INSERT INTO values(number) VALUES($1)', [index])
    res.send({working: true})
})

app.listen(5000, () => {
    console.log('listening')
})
