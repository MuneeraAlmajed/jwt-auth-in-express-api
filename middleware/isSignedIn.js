const jwt = require("jsonwebtoken");


const isSignedIn = (req,res,next) => {
try{
     const bearerToken = req.headers.authorization;

     if(!bearerToken) throw new Error ('Login Required');

     const token = bearerToken.split(' ')[1];

      const payload = jwt.verify(token, process.env.JWT_SECRET);

      req.user = payload;

      next();

}catch(err){
    res.status(401).json({err: 'Login Required'});
}
}

module.exports = isSignedIn;