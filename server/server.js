const express = require ("express");
const app = express();

app.get("/", (req, res)=>{
    res.status(200).send("Welcome to our website");
});

app.get("/login", (req, res)=>{
    res.status(200).send("Login page");
});

app.get("/Signup", (req, res)=>{
    res.status(200).send("Signup page");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`server is running on port number ${PORT}`);
});