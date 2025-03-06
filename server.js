const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {

    const {url} = req;
    const fileName = url === '/' ? '/login.html' : url;
    try{
        file = fs.readFileSync(`./public${fileName}`);
    } catch (error) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('not okay');
        return;
    }
    res.writeHead(200);
    res.end(file);
    // res.end('okay');
});

server.listen(8001, '127.0.0.1', () => {});