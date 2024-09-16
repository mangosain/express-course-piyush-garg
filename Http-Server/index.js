const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  const log = `${Date.now()}: New Request Received on ${req.url}\n`;
  const parsedUrl = url.parse(req.url, true);
  console.log(parsedUrl);
  fs.appendFile("log.txt", log, (err, data) => {
    switch (parsedUrl.pathname) {
      case "/":
        res.end("Home Page");
        break;
      case "/about":
        const username = parsedUrl.query.name;
        res.end("About Us. Welcome " + username);
        break;
      case "/search":
        const sq = parsedUrl.query.search_query;
        res.end("Search Results for " + sq);
        break;
      default:
        res.end("404 Page Not Found");
    }
  });
});

server.listen(8000, () => {
  console.log("Server started at port 8000");
});
