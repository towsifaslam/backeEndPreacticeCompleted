const app = require("./app");
const connectToDatabase = require("./config/db");
const logger = require("./controllers/logger");

const { port } = require("./secret");

//client error handling 

//liste api
app.listen(port, async () => {
  await connectToDatabase();
  console.log(`Server is running on port ${port}`);
});
