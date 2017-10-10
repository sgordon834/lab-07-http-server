'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;
const url = require('url');
const bodyParser = require('body-parser');

let sendResponse = function(res, status, body) {
  res.writeHead(status, {'Content-Type' : 'text/plain'});
  res.write(body);
  res.end();
};

const server = http.createServer((req, res) => {
  req.url = url.parse(req.url);
    // console.log(req.getHeader('Content-Type'));
  if (req.method === 'GET' && req.url.pathname === '/') {
      sendResponse(res, 200, 'wow such GET, much request');
    } else if (req.method === 'GET' && req.url.pathname === '/query') {
      sendResponse(res, 200, req.url.query);
    } else if (req.method === 'POST' && req.url.pathname === '/') {
      let body = '';
      req.on('data', function(data) {
        body += data.toString();
        });

        req.on('end', function() {
          let json;
          try {
              json = JSON.parse(body);
          } catch(e) {
            return sendResponse(res, 400, 'bad json!');
          }
          console.log(json);
          sendResponse(res, 200, 'got the JSON');
        });
    } else {
      sendResponse(res, 404, 'bad request');
    }
});

server.listen(PORT, () => {
    console.log('Server running on port', PORT);
});