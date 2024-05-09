import express from "express";
import houseVisited from "./routes/LastHouseRoutes.js";
import cors from "cors";
import router from "./router.js"
import bodyParser from "body-parser";
import { signUp, logIn } from "./controllers/AuthController.js"
import jwt from "jsonwebtoken";
import ip from "ip";

const app = express();
const ipAdress = ip.address();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(houseVisited);
app.use(signUp);
app.use(logIn);


app.listen(port, () => {
    console.log(`Server run : http://` + ip.address() + `:3000`);
});

export default app;