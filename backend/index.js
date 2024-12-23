const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");


app.use(cors({
    origin:"https://online-id-saksham.vercel.app"
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const userRoute = require("./routes/userRoute");
const projectRoute = require("./routes/projectRoute");

app.use("/api/v1",userRoute);
app.use("/api/v1",projectRoute);

const connectWithDB = require("./config/database");
connectWithDB();

app.get("/",(req,res)=>{
    res.send("Server has started");
})

app.listen(process.env.PORT,()=>{
    console.log(`Server started at Port No. ${process.env.PORT}`);
})
