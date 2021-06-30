const express = require("express");
require("./db/conn");
const User = require("./models/usermessage");
const hbs = require("hbs");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

//setting the path
const staticpath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");
//middleware
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use(express.urlencoded({ extended: false }))
app.use(express.static(staticpath))
app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);


//routing
//app.get(path,callback)
app.get("/", (req, res) => {
    res.render("index");
})




app.post("/contact", async (req, res) => {
    try {
        // res.send(req.body);

        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    } catch (error) {
        res.status(500).send(error);
    }
})

// app.get("/about", (req, res) => {
//     res.render("about");
// })

// app.get("/govpolicy", (req, res) => {
//     res.render("govpolicy");
// })

// app.get("/crops", (req, res) => {
//     res.render("crops");
// })

// app.get("/bankdetails", (req, res) => {
//     res.render("bankdetails");
// })



//server create
app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})