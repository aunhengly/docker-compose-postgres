const express = require('express');
const bodyParser = require('body-parser'); // latest version of exressJS now comes with Body-Parser!
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// connect to your own database here:
const db = knex({
  client: 'pg',
  connection: {
    host : process.env.POSTGRES_HOST,
    user : process.env.POSTGRES_USER,
    password : process.env.POSTGRES_PASSWORD,
    database : process.env.POSTGRES_DB
 }
});

// const db = knex({
//   client: 'pg',
//   connection: {
//     host : '127.0.0.1',
//     user : 'hengly',
//     password : '',
//     database : 'smart-brain'
//  }
// });


const app = express();

console.log('From servers')

app.use(morgan('combined'))
app.use(cors())
app.use(express.json()); // latest version of exressJS now comes with Body-Parser!

// app.get('/', (req, res)=> { res.send(db.users) })
app.get('/', (req, res)=> { res.send('Helllllllo') })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})
