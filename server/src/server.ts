import express from "express";
import router from "./routers";
import "./types/express";
const app = express();
const port = 3000;
let cors = require("cors");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
