
const http = require('http');

const fs=require('fs');


// console.log(http);

const port = 8000;
// const server=http.createServer();

//creting a request handler

function requestHandler(req, res) {

  console.log(req.url);

 
  //fs system to read  file and send it as response
  fs.readFile('./index.html' , function(err, data){

    if(err){

        console.log("err" , err);

        return res.end('<h1>Error</h1>');

    }
    return res.end(data);

  })

  res.writeHead(200, {'content-type':'text/html'})

}
const server = http.createServer(requestHandler);

server.listen(port, function (err) {
  if (err) {
    console.log("error", err);
    return;
  } else {
    console.log("server is up and running on port", port);
  }
});

