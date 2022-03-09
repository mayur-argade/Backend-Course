const jwt = require("jsonwebtoken")
// model is optional here

const auth = (req, res, next) =>{
    console.log(req.cookies);
    const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "")  ;

    if(!token){
        return res.status(403).send("token is missing")

    }

    try {
        
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        console.log(decode);

    } catch (error) {
        return res.status(401).send("token is not valid")
    }
    return next();
}

module.exports = auth;