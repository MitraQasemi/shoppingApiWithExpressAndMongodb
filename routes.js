const formidable = require('formidable');
const url = require('url');
//express 
const express = require('express');
const router = express.Router();
module.exports = router;
//body parser
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
//database
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/products");
const Schema = mongoose.Schema;
const productData = new Schema({
    name: String,
    description: String,
    quantity: String,
    category: String,
    image: [],
    description: String,
    price: String
})
const productDataModel = mongoose.model('products', productData);
//Routes
//list
router.get("/product", (req, res, next) => {
    productDataModel.find()
        .then((duc) => { res.send(duc) })
        .catch(error => console.log(error))
})
//find
router.get("/product/:id", (req, res) => {
    productDataModel.findById(req.params.id)
        .then((duc) => { res.send(duc); })
        .catch(error => console.log(error))
})
//add
router.post("/product", (req, res) => {
    let data = new productDataModel(req.body);
    data.save();
    res.send("done");
})
//delete
router.delete("/product/:id", (req, res) => {
    productDataModel.findByIdAndRemove(req.params.id)
        .then((duc) => { res.send("done") })
        .catch(error => console.log(error))
})
//update
router.put("/product/:id", (req, res) => {
    productDataModel.findByIdAndUpdate(req.params.id, req.body)
        .then((duc) => { res.end("done") })
        .catch(error => console.log(error));
})
//set image
router.post("/setImage/:id", (req, res) => {
    const form = formidable({
        uploadDir: 'images',
        keepExtensions: true,
        filename: (name, ext) => {
            return name + ext;
        }
    });
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            return;
        }
        productDataModel.findById(req.params.id)
            .then((duc) => {
                duc.image.push(`http://localhost:3000/${files.file.originalFilename}`);
                duc.save();
            });
    })
    res.end("done");
})
