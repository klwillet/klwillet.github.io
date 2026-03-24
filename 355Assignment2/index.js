const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 222;

const server = http.createServer((req, res) => {
    if (req.url === "/"){
        fs.readFile(path.join(__dirname, "index.html"),
        (err, content)=>{
            if(err) throw err;
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end(content)
        });
    }
    else if (req.url === "/api"){
        fs.readFile(path.join(__dirname, "db.json"), "utf8", 
        (err, content)=>{
                if(err) throw err;
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(content)
        });
    } 
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
