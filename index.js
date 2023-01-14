const express = require("express");
var cors = require('cors')
const connect = require("./src/configs/db");

const  {register,login} = require("./src/controllers/auth.user.controller")
const {AdminRegister,Adminlogin} = require("./src/controllers/auth.admin.controller")
const userController = require("./src/controllers/user.controller");
const latestTrekController = require("./src/controllers/latestTrek.controller")
const upcomingTrekController = require("./src/controllers/upComing.controller")
const popularTrekController = require("./src/controllers/popularTrek.controller")
const contactUs = require("./src/controllers/contactUs.controller")
const Query = require("./src/controllers/query.controller")




const app = express();
app.use(cors({ origin:"*"}))


app.use(express.json());
app.post("/register",register)
app.post("/login" ,login)

app.post("/adminRegister",AdminRegister)
app.post("/adminLogin",Adminlogin)


app.use("/users", userController);
app.use("/latestTrek", latestTrekController);
app.use("/upcomingTrek", upcomingTrekController);
app.use("/popularTrek", popularTrekController);
app.use("/contactUs", contactUs);
app.use("/query", Query);






app.use("/showImage" , function(req,res) {
  let filename = req.param("download");
  return res.download(`src/upload/${filename}`);
} )
// /showImage?download=filename




app.set("view engine","hbs")
app.get("/",(req,res)=>{
  res.render("index")
})

const PORT=process.env.PORT || 2345

app.listen(PORT, async () => {
  try {
    await connect();
  } catch (err) {
    console.error(err.message);
  }
  console.log("listening on port 2345");
});
