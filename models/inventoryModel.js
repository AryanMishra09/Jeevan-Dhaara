import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    inventoryType:{
        type:String,
        required:[true, "inventory type required"],
        enum : ["in", "out"],
    },
    bloodGroup:{
        type:String,
        required:[true, "blood group is required"],
        enum: ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-']
    },
    quantity:{
        type:Number,
        required:[true, "blood quantity is required"],
    },
    email:{
        type:String,
        required:[true, "Donar Email is required"]
    },
    organisation:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: [true, "organisation is required"]
    },
    hospital:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: function(){
            if(this.inventoryType === "out"){
                return true;
            }
            return false;
        } 
    },
    donar:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: function(){
            if(this.inventoryType === "in"){
                return true;
            }
            return false;
        }
    }
},{timestamps : true});

export default mongoose.model("Inventory", inventorySchema);