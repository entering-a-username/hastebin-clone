const express = require("express");
const mongoose = require("mongoose");
const Document = require("./models/Document");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL);

// routes
app.get("/", (req, res) => {
    res.render("new");
})

app.post("/save", async (req, res) => {
    const value = req.body.value;

    try {
        const document = await Document.create({ value });
        res.redirect(`/${document.id}`);
    } catch (err) {
        res.render("new", { value });
    }
})

app.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const document = await Document.findById(id);

        res.render('display', {history: document.history, value: document.value, id });
    } catch (err) {
        res.redirect("/");
    }
})

app.get("/:id/edit", async (req, res) => {
    const id = req.params.id;
    

    try {
        const document = await Document.findById(id);
        document.history.push({value: document.value});
        // document.value = value;
        await document.save(); // inco?
        res.render('new', {history: document.history, value: document.value });
    } catch (err) {
        res.redirect(`/${id}`);
    }
})

app.listen(3030);