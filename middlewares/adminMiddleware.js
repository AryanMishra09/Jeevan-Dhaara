import userModel from "../models/userModel.js";

const adminMiddleware = async (req, res, next) => {
  try {
    console.log('User ID:', req.body.userId);
    const user = await userModel.findOne({ _id: req.body.userId, role: 'admin' });
    console.log('USER:', user);

    //check admin
    if (user?.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "AUth Fialed",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Auth Failed, ADMIN API",
      error,
    });
  }
};

export default adminMiddleware;






// import userModel from "../models/userModel.js"

// async function adminMiddleware(req,res,next){
//     try {
//         const user = await userModel.findById(req.body.userId);
//         console.log("USER: ".user)
//         //check admin
//         if(user?.role !== 'admin'){
//             return res.status(401).send({
//                 success:false,
//                 message:"Auth falied"
//             })
//         }else{
//             next();
//         }

//     } catch (error) {
//         console.log(error);
//         return res.status(401).send({
//             success:false,
//             message: 'Auth failde, Admin API',
//             error
//         })
//     }
// }

// export default adminMiddleware;