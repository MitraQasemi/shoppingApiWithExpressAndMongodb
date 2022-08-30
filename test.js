const http = require('http');
const fs = require('fs');
let arrayOfProducts = [];

const server = http.createServer((req, res) => {
    const routeResponseMap = {
        "/showList": (req, res) => {
            res.writeHead(200, { "Content-Type": "application/json" });
            try {
                const data = fs.readFileSync("products.json", "utf-8");
                const jsonData = JSON.parse(data);
                res.write(JSON.stringify(jsonData));
                res.end();
            } catch (error) {
                console.log(error);
            }
        },
        "/addProduct": (req, res, id, newProduct) => {
            res.writeHead(200, { "Content-Type": "application/json" });
            try {
                const data = fs.readFileSync("products.json", "utf-8");
                const jsonData = JSON.parse(data);
                jsonData.push(newProduct);
                fs.writeFileSync("products.json", JSON.stringify(jsonData));
            } catch (error) {
                console.log(error);
            }
        },
        "/deleteProduct": (req, res, id) => {
            res.writeHead(200, { "Content-Type": "application/json" });
            try {
                const data = fs.readFileSync("products.json", "utf-8");
                const jsonData = JSON.parse(data);
                index = jsonData.findIndex(x => x.id === id);
                jsonData.splice(index, 1);
                fs.writeFileSync("products.json", JSON.stringify(jsonData));
            } catch (error) {
                console.log(error);
            }
        },
        "/getById": (req, res, id) => {
            res.writeHead(200, { "Content-Type": "application/json" });
            try {
                const data = fs.readFileSync("products.json", "utf-8");
                const jsonData = JSON.parse(data);
                index = jsonData.findIndex(x => x.id === id);
                res.end(JSON.stringify(jsonData[index]));
            } catch (error) {
                console.log(error);
            }
        },
        "/updateById": (req, res, id, newProduct) => {
            res.writeHead(200, { "Content-Type": "application/json" });
            try {
                const data = fs.readFileSync("products.json", "utf-8");
                const jsonData = JSON.parse(data);
                index = jsonData.findIndex(x => x.id === id);
                jsonData[index] = newProduct;
                fs.writeFileSync("products.json", JSON.stringify(jsonData));
            } catch (error) {
                console.log(error);
            }
        }
    };
    if ((routeResponseMap[req.url])) {
        res.end(routeResponseMap[req.url](req, res, id = 3, { "name": "chip", "price": 15000, "id": 3 }));
    }
}).listen(3000);