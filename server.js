const https = require('https');
const fs = require('fs');
const path = require('path');

// Ler certificados
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
};

// Servidor
const server = https.createServer(options, (req, res) => {
    console.log(`${req.method} ${req.url}`);

    let filePath = '.' + decodeURIComponent(req.url.split('?')[0]);
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('Arquivo não encontrado');
            } else {
                res.writeHead(500);
                res.end('Erro no servidor: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 8443;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 Servidor HTTPS rodando em:`);
    console.log(`   https://localhost:${PORT}`);
    console.log(`   https://[SEU_IP_LOCAL]:${PORT}`);
    console.log(`\n⚠️  IMPORTANTE: Aceite o certificado auto-assinado no navegador!\n`);
});