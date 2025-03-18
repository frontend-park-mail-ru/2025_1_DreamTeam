const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const {url} = req;
    const fileName = url === '/' ? '/settings.html' : url;
    const filePath = `./public${fileName}`;

    try {
        const file = fs.readFileSync(filePath);

        // Определяем расширение файла и устанавливаем соответствующий Content-Type
        const extname = path.extname(filePath).toLowerCase();
        let contentType = 'text/html'; // по умолчанию
        if (extname === '.svg') {
            contentType = 'image/svg+xml';
        } else if (extname === '.css') {
            contentType = 'text/css';
        } else if (extname === '.js') {
            contentType = 'application/javascript';
        }

        res.writeHead(200, {'Content-Type': contentType});
        res.end(file);
    } catch (error) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('not okay');
    }
});


server.listen(8001, 'localhost', () => {});