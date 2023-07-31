const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === 'GET') {
    if (url === '/') {
      // Handle the home page
      return serveHTMLPage('home.html', res);
    } else if (url === '/about') {
      // Handle the about page
      return serveHTMLPage('about.html', res);
    } else if (url === '/contact') {
      // Handle the contact page
      return serveHTMLPage('contact.html', res);
    } else if (url === '/products') {
      // Handle the products page
      return serveHTMLPage('products.html', res);
    } else if (url.startsWith('/product/')) {
      // Handle single product page
      const productId = url.split('/')[2];
      return serveHTMLPage('product.html', res);
    } else {
      // Handle unknown endpoints
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 - Not Found');
    }
  } else {
    // Handle other HTTP methods
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('405 - Method Not Allowed');
  }
});

function serveHTMLPage(pageName, res) {
  const filePath = path.join(__dirname, pageName);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 - Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
}

const port = 3001;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});