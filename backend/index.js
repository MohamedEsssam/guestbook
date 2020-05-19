const express = require("express");
const app = express();

require("./startup/config")();
require("./startup/cors")(app);
require("./startup/connectDB");
require("./startup/routes")(app);

app.listen(8000, () => {
  console.log("app listening on port 8000!");
});
