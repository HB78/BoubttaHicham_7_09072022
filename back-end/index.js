const express = require("express");
const app = express();
let port = process.env.PORT || 3000;

// const test = require("./route/test")

//connexion à la BDD
const db = require("./dataBase/db");

const users = require("./route/usersRoute");

// const actualite = require("./controller/publicationController");

// const message = require("./controller/commentController");

//accession au path du server
const path = require("path");

//gestion des erreurs cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// __dirname c://user/desktop/projet
// path.join(__dirname, 'images') == __dirname + '/' + '/image';
app.use("/images", express.static(path.join(__dirname, 'images')));

//alternative to body-parser to support JSON-encoded bodies
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/users", users);

// app.use("/actualite", actualite);

// app.use("/commentaires", message);

//routes test
// app.use("/test", test);

app.get('/', (req, res) => {
    console.log("Greeting (clg) from route get");
    res.send('Hello World (res.send) from get');
});

app.listen(port, () => {
    console.log('http://localhost:3000 Server is listening on port ' + 3000);
});
