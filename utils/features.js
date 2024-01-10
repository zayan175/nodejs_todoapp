const jwt = require ('jsonwebtoken')
const sendCookie = (users,resp,message,statusCode= 200)=>{
    const token = jwt.sign({_id: users._id},process.env.JWT_SECRET)

    resp.status(200).json({
        success : true,
        message,
        token
        })
}

module.exports =sendCookie;
