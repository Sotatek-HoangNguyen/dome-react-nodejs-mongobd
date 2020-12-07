// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require("./config/db.config");

const app = express();
const PORT = 4000;

var corsOptions = {
    origin: "http://localhost:4000"
};

const personsRoute = require('./persons.route');

// mongoose.connect(config.DB, { useNewUrlParser: true }).then(
//     () => {console.log('Database is connected') },
//     err => { console.log('Can not connect to the database'+ err)}
// );

//Simple Usage (Enable All CORS Requests)
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', personsRoute);

// Mongoose
const db = require("./models");

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

app.listen(PORT, function(){
    console.log('Server is running on Port:',PORT);
});
