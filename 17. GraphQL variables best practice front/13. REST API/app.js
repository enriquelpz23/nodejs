const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const graphqlHttp = require('express-graphql');

const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");
const auth = require("./middleware/auth");
const { clearImage } = require('./util/file');

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    }, 
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const mimetypes = [
        'image/png',
        'image/jpg',
        'image/jpeg'
    ];
    cb(null, mimetypes.find(mimetype => mimetype === file.mimetype));
}


app.use(bodyParser.json()); // aplication/json
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(
    multer({storage: fileStorage, fileFilter: fileFilter}).single("image")
    );

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
      );
    res.setHeader("Access-Control-Allow-Headers", "Content-type, Authorization");
    if (req.method === "OPTIONS") { 
        return res.sendStatus(200);
    }
    next();
});

app.use(auth);


app.put('/post-image', (req, res, next) => {
    if (!req.isAuth) {
      throw new Error('Not authenticated!');
    }
    if (!req.file) {
      return res.status(200).json({ message: 'No file provided!' });
    }
    if (req.body.oldPath) {
      clearImage(req.body.oldPath);
    }
    return res
      .status(201)
      .json({ message: 'File stored.', filePath: req.file.path });
  });
  

app.use(
    "/graphql", 
    graphqlHttp({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true,
        customFormatErrorFn(err) {
            if (!err.originalError) {
                return err;
            }
            const data = err.originalError.data;
            const message = err.message || "An error occurred";
            const code = err.originalError.code || 500; 
            return {
                message: message,
                status: code,
                data: data
            };
        }
    })
);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
})

mongoose
    .connect(
        ""
    )
    .then(result => {
        app.listen(8080);
      })
      .catch(err => console.log(err));
    
