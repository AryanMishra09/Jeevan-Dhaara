import jwt from "jsonwebtoken";

async function authMiddleware(req, res, next){
    try{

        const authorizationHeader = req.headers["authorization"];

        if (!authorizationHeader) {
            console.log("Authorization header is missing");
            return res.status(401).send({
                success: false,
                message: "Authorization header is missing",
            });
        }

        const token = req.headers["authorization"].split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
            if(error){
                console.log("Error in authMiddleware line 8: ",error);
                return res.status(401).send({
                    success:false,
                    message:"Auth failed",
                    error
                });
            }else{
                req.body.userId = decode.userId;
                next();
            }
        })
    }catch(error){
        console.log("Error in authMiddleware: ",error);
        res.status(401).send({
            success:false,
            error,
            message:"Auth failed"
        });
    }
}

export default authMiddleware;