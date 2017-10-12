

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');

// const bodyParser = require('body-parser');

let sendResponse = function(res, status, body) {
  res.writeHead(status, {'Content-Type' : 'text/html'});
  res.write(body);
  res.end();
};

const server = module.exports = http.createServer((req, res) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
    // console.log(req.getHeader('Content-Type'));
    // console.log('req.url', req.url);
    // console.log('req.method', req.method);
  if (req.method === 'GET' && req.url.pathname === '/') {
      sendResponse(res, 200, cowsay.say({text: 'Hi!'}));
    } else if (req.method === 'GET' && req.url.pathname === '/cowsay') {
      sendResponse(res, 200, cowsay.say({text: req.url.query.text}));
    } else if (req.method === 'POST' && req.url.pathname === '/cowsay') {
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
          
          // sendResponse(res, 200, cowsay.say({ text: req.body.text}));
          sendResponse(res, 200, ('got the json'));
        });
    } else {
      sendResponse(res, 404, 'bad request');
    }
});
