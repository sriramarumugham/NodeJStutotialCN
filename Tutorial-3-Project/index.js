const http = require("http");
const fs = require("fs");

const port = 8000;

function requestHandler(req, res) {
  console.log(req.url);
  res.writeHead(200, "content-type:text/html");
  let filePath = "";
  switch (req.url) {
    // music-player.today.css
    case "/":
      filePath = "./public/music-player.today.html";
      break;
    case "/music-player.today-page-2.css":
      filePath = "./public/music-player.today-page-2.css";
      break;

    case "/music-player.today.css":
      filePath = "./public/music-player.today.css";
      break;

    case "/music-player.today-page-2.html":
      filePath = "./public/music-player.today-page-2.html";
      break;

    default:
      res.end("<h1>404</h1>");
  }

  fs.readFile(filePath, function (err, data) {
    if (err) {
      console.log("err", err);

      return res.end("<h1>Error</h1>");
    }
    return res.end(data);
  });
}
const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    console.log("err", err);
    return;
  }
  console.log("server is up and runnig on port", port);
});
