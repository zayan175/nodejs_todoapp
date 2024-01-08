const app = require('./app.js');
const connectDB = require('./data/database.js');
const PORT = process.env.PORT || 5000

connectDB();


app.listen(PORT,(req,resp)=>{
    
    console.log(`Server is Working on port : ${process.env.PORT} in ${process.env.NODE_ENV } Mode`)
})
