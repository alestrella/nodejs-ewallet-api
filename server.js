const mongoose = require("mongoose");

const app = require("./src/app");

const { DB_HOST, PORT } = require("./src/config");

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => console.log(`Use our API on port:${PORT}`));
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
