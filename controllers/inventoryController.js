import mongoose from "mongoose";
import inventoryModel from "../models/inventoryModel.js";
import userModel from "../models/userModel.js";


//Create inventory: 

async function createInventoryController(req,res){
    try{
        const {email} = req.body;
        //validation 
        const user = await userModel.findOne({email: email})
        if(!user){
            return res.status(401).send({
                success:false,
                message:"User not found"
            });
        }
        // if(inventoryType==="in" && user.role !== "donar" ){
        //     return res.status(401).send({
        //         success:false,
        //         message:"Not a donar account"
        //     });
        // }
        // if(inventoryType==="out" && user.role !== "hospital"){
        //     return res.status(401).send({
        //         success:false,
        //         message:"Not a Hospital"
        //     });
        // }
        if (req.body.inventoryType == "out") {
          const requestedBloodGroup = req.body.bloodGroup;
          const requestedQuantityOfBlood = req.body.quantity;
          const organisation = new mongoose.Types.ObjectId(req.body.userId);
          //calculate Blood Quanitity
          const totalInOfRequestedBlood = await inventoryModel.aggregate([
            {
              $match: {
                organisation,
                inventoryType: "in",
                bloodGroup: requestedBloodGroup,
              },
            },
            {
              $group: {
                _id: "$bloodGroup",
                total: { $sum: "$quantity" },
              },
            },
          ]);
          // console.log("Total In", totalInOfRequestedBlood);
          const totalIn = totalInOfRequestedBlood[0]?.total || 0;
          //calculate OUT Blood Quanitity
    
          const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
            {
              $match: {
                organisation,
                inventoryType: "out",
                bloodGroup: requestedBloodGroup,
              },
            },
            {
              $group: {
                _id: "$bloodGroup",
                total: { $sum: "$quantity" },
              },
            },
          ]);
          const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;
    
          //in & Out Calc
          const availableQuanityOfBloodGroup = totalIn - totalOut;
          //quantity validation
          if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
            return res.status(500).send({
              success: false,
              message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
            });
          }
          req.body.hospital = user?._id;
        } else {
          req.body.donar = user?._id;
        }

        //save record

        const inventory = new inventoryModel(req.body);
        await inventory.save();
        return res.status(201).send({
            success:true,
            message: "New blood record added"
        })

    }catch(error){
        console.log("Error in createINventoryController: ",error);
        return res.status(500).send({
            success:false,
            message:"Error in create inventory API",
            error,
        });
    }
}

//get all blood records:

const getInventoryController = async (req, res) => {
    try {
      const inventory = await inventoryModel
        .find({
          organisation: req.body.userId,
        })
        .populate("donar")
        .populate("hospital")
        .sort({ createdAt: -1 });
      return res.status(200).send({
        success: true,
        messaage: "get all records successfully",
        inventory,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error In Get All Inventory",
        error,
      });
    }
};

//get Hospital blood records:

const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find( req.body.filters )
      .populate("donar")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      messaage: "get hospital consumer records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get Consumer Inventory",
      error,
    });
  }
};

//Get blood records of 5:

const getRecentInventoryController = async (req,res)=>{
  try {
    const inventory = await inventoryModel.find({
      organisation: req.body.userId
    }).limit(5).sort({createdAt: -1})
    return res.status(200).send({
      success:true,
      message: "recent inventory data",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success:false,
      message: 'Error in Recent Inventory',
      error
    })
  }
}

//Get Donar Record:

const getDonarsController = async (req,res)=>{
  try {
    const organisation = req.body.userId;

    //find donars:
    const donorId = await inventoryModel.distinct("donar", {
      organisation
    });
    // console.log(donorId);

    const donars = await userModel.find({_id: {$in:donorId}});

    return res.status(200).send({
      success:true,
      message: "Donar record fetched successfully",
      donars
    });

  } catch (error) {
    console.log("Error in getDonarController in inventoryController.js : ",error);
    return res.status(500).send({
      success:false,
      message:"Error in Donar Records",
      error
    })
  }
} 

// Get Hospitals Record:

const getHospitalController = async (req, res) => {
  try {
    const organisation = req.body.userId;

    //get hospital id:

    const hospitalId = await inventoryModel.distinct("hospital", {
      organisation
    });

    //find hospital:

    const hospitals = await await userModel.find({_id: {$in: hospitalId}});
    
    return res.status(200).send({
      success:true,
      message: "Hospital data fetched Successfully",
      hospitals
    });

  } catch (error) {
    console.log("Error in getHospitalController in inventoryController.js: ",error);
    return res.status(500).send({
      success:false,
      message: "Error in get Hospital API",
      error
    });
  }
}

//Get ORG profiles: 

const getOrganisationController = async (req, res) => {
  try {
    const donar = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", {
      donar
    });
    // find org:
    const organisations = await userModel.find({_id : {$in : orgId}});

    return res.status(200).send({
      success:true,
      message: "ORG data fetched Successfully",
      organisations
    });

  } catch (error) {
    console.log("Error in getOrganisationController in inventoryController.js : ",error);
    return res.status(500).send({
      success : false,
      message : "Error in ORG API",
      error
    });
  }
}

//Get ORG for Hospital: 

const getOrganisationForHospitalController = async (req, res) => {
  try {
    const hospital = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", {
      hospital
    });
    // find org:
    const organisations = await userModel.find({_id : {$in : orgId}});

    return res.status(200).send({
      success:true,
      message: "hospital ORG data fetched Successfully",
      organisations
    });

  } catch (error) {
    console.log("Error in getOrganisationForHospitalController in inventoryController.js : ",error);
    return res.status(500).send({
      success : false,
      message : "Error in Hospital ORG API",
      error
    });
  }
}

export {
  createInventoryController, 
  getInventoryController, 
  getDonarsController, 
  getHospitalController, 
  getOrganisationController, 
  getOrganisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController
};