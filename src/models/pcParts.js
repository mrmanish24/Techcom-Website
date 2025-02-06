import mongoose,{Schema} from "mongoose";

const pcPartsSchema = new Schema(
    {  
        category: String,
        name : String,
        price : Number
    }
)


const Pc_parts = mongoose.models.pc_parts|| mongoose.model("pc_parts",pcPartsSchema);

export default Pc_parts;