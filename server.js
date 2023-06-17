const express = require("express");
const app = express();
// change to port 3000
const port = 3001;

app.use(express.json());

const categoriesRoutes = require("./routes/categoryRoute");

app.use("/api/v1/uber/category", categoriesRoutes);

app.listen(port, () => console.log(`App listening on port ${port}`));
