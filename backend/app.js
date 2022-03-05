require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');
const app = express();
const port = 4001;

(async function main() {
    await mongoose.connect(process.env.mongodbConnectionString);
    console.log("Connected to MongoDB");

    app.use(express.json());
    app.use(cors());
    app.use(
        express.urlencoded({
            extended: true,
        })
    );
    app.get('/', (req, res) => {
        res.json({
            message: 'Hello From Server'
        });
    });
    app.use("/v1", require("./src/routes/v1/index"));

    app.listen(port, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("App listening at port: " + port);
        }
    });
})();

process.on("uncaughtException", async (error) => {
    console.log("uncaughtException", error);
});
