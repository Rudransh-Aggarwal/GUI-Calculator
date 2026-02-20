const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { result: null });
});

app.post("/calculate", (req, res) => {
    const { num1, num2, operation } = req.body;
    let result;

    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    switch (operation) {
        case "add":
            result = n1 + n2;
            break;
        case "sub":
            result = n1 - n2;
            break;
        case "mul":
            result = n1 * n2;
            break;
        case "div":
            result = n2 !== 0 ? n1 / n2 : "Cannot divide by zero";
            break;
        default:
            result = "Invalid Operation";
    }

    res.render("index", { result });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});