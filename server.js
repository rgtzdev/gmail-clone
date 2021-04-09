var http = require('http'),
    path = require('path'),
    express = require('express'),
    router = express(),
    server = http.createServer(router)

router.use(express.static(path.join(__dirname, 'dist/salesloft-test')));

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/salesloft-test/index.html'));
});

const port = process.env.PORT || '4123';
router.set('port', port);

server.listen(port, () => console.log(`Running on localhost:${port}`));