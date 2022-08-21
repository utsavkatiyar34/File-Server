const http = require("http");
const fs = require("fs");

const port = process.env.PORT || 8090;

const server = http.createServer((req, res) => {
  if (req.url == "/favicon.ico") {
    res.statusCode = 204;
  } 
  else {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    let path="."+req.url;
    
    fs.readdir(path, { "encoding": "utf8" }, (error, files) => {
        if (error) {
            const cont = fs.readFileSync(path.toString());
            res.end(cont);
        } 
        else {
            let resp = '';
            if (files.length == 0) {
                resp += "<h1>OOPS! No Directories avaliable</h1>"
            }
            files.forEach((element) => {
                resp += `<li style="font-size:3vw"><a href = ${element + "/"}>${element}</a></li>`
            })
            res.end(`<div style="width: 50%; margin: auto; margin-top: 5vh; border: 2px solid purple; padding: 2vw">
            <h1 style= "text-align :center">FILES</h1>
            <div>${resp}</div></div>`);
        }
      });
   }
 });

server.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
