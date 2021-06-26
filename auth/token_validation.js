const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken : (req, res, next)=>{
       let token = req.get("authorization");
        if(token)
        {
            token = token.slice(7);
            verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded_object)=>{
                if(err)
                {
                    // res.json(err);
                    res.json({
                        success : 0,
                        message : "Invalid token" + err
                    });
                }
                else
                {
                    next();
                }
            })
        }
        else
        {
            res.json({
                success : 0,
                message : "Accessed denied"
            });
        }
    }
};