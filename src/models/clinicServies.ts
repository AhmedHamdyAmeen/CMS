import mongoose from "mongoose";

let schema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    name:{
        type: String,
        required:true
    },
    // patients: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "patients"        
    // }, //editing by transfer from array of object
    cost: {
        type: Number,
        required:true        
    }

})

 export default mongoose.model("clinicservies",schema)

