// server URL: https://litlens.onrender.com

const dotenv = require("dotenv").config();
const http = require("http");
const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

async function getServices(client) {
    const db = client.db("LitLens");
    const collection = db.collection("services");

    const results = await collection.find({}).toArray();
    return results;
}

const server = http.createServer(async function (req, res) {

    if (req.url === "/") {
        fs.readFile(path.join(__dirname, "index.html"), "utf8", function (err, data) {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("error loading page");
            }
            else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            }
        });
    }

    else if (req.url === "/api") {
        try {
            const data = await getServices(client);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ services: data }));
        }
        catch (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("error getting data");
        }
    }

    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("not found");
    }

});

async function main() {
    try {
        await client.connect();
        console.log("connected to mongodb");

        server.listen(PORT, function () {
            console.log("server running");
        });
    }
    catch (err) {
        console.log(err);
    }
}

main();