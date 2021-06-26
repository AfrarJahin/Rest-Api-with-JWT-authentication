const express = require('express'); //adds all package into this express

require('dotenv').config();
const app = express(); //execute express

// routes
// app.get('/' , (req, res)=>{
//     res.json({
//         success: 1,
//         messege : "API working"
//     })
// });


// app.get('/p' , (req, res)=>{
//     res.send("this is post page");
// });



const userRouter = require('./api/user/user.router.js');
app.use(express.json());
app.use("/api/user",userRouter);



// how do we start Listening the server
app.listen(process.env.APP_PORT,()=>{
    console.log("server running: ", process.env.APP_PORT)
});


// "firstName" :"Afrar",
// "lastName" : "jahin",
// "gender" : "F",
// "email":"afrarjahin001@gmail.com",
// "password":"123",
// "number" : "1233"
