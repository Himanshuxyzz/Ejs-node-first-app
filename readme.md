###Backend Mastery

**Vanila web server node js**

>syntax:
`const http = require("http");`
`const port = 5000;`
`const server = http.createServer((req,res) => {`
`res.end("<h1>Hello from vanilla server</h1>");`
`});`
`server.listen(port, () => {`
  `console.log(`server is running at ${port} `);`
`});`

**Sending response back to the client from server**

>syntax:
`if (req.url == '/') {`
`res.end("<h1>Hello from vanilla server</h1>");`
`}`



