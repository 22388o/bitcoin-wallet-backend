import express from "express";
import * as https from "https-proxy-agent";
import { HttpsProxyAgent } from "https-proxy-agent";
import bodyParser from "body-parser";
import apiPaths from "./routs/api.mjs";
import cors from "cors";

const app = express();
const PORT = 8000;

// app.use(urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api", apiPaths);

app.listen(PORT, () => {
  console.log(`Server is running on http://192.168.0.102:${PORT}`);
}); //starts local host
