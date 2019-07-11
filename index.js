const PORT = process.env.PORT || 3300;
const server = require("./api");

server.listen(PORT, () => {
  console.log(`Server up on Port: ${PORT}`);
});
