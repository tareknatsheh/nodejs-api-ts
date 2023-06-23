import http, { IncomingMessage, Server, ServerResponse } from "http";
import path from "path";
import fs from "fs";

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const fileName: string = path.extname(req.url) ? req.url : req.url + ".html";
    let contentType: string = "text/html";
    
    // Set the correct content type
    switch (path.extname(req.url)) {
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".json":
            contentType = "application/json"
            break;
        case ".png":
            contentType = "image/png"
            break;
        case ".jpg":
            contentType = "image/jpg"
            break;
    }

    // Handle the request url
    switch (req.url) {
        case "/":
            fs.readFile(path.join(__dirname, "public", "index.html"), (error, data) => {
                if (error) throw error;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data)
            });
            break;
        case "/api/users":
            const users: { name: string, age: number }[] = [
                {
                    name: "Tarek",
                    age: 32
                },
                {
                    name: "Mona",
                    age: 35
                }
            ];
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users));
            break;
        default:
            fs.readFile(path.join(__dirname, "public", fileName), (error, data) => {
                if (error) {
                    if (error.code == "ENOENT") {
                        fs.readFile(path.join(__dirname, "public", "404.html"), (error, data) => {
                            if (error) throw error;
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.end(data);
                        });
                    }
                    else {
                        res.writeHead(500);
                        res.end("internal error:" + error.code);
                    }
                }
                else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(data)
                }
            });
    }
});

const PORT: number = parseInt(process.env.PORT) || 5000;
server.listen(PORT, () => console.log("Server running on port:", PORT));
