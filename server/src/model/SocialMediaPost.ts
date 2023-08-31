import mongoose, { mongo } from "mongoose";
const postSchmea = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    title:{
        type: String,
        required:[true,"Please add a title"]
    },
    image:{
        type:String,
        default:""

    },
    description:{
        type:String,
        default:'Not Found'

    }
    ,
    comments :[
        {
            userId : {
                type :mongoose.Schema.Types.ObjectId,
                required:true
            },
            comment:{
                type :String,
                required:true
            },
           
        }, {
            timestamps:true
        }
    ],
    likes:[
        { 
            userId : {
                type :mongoose.Schema.Types.ObjectId,
                required:true,
            } 
        }
    ]
},{
    timestamps:true
}
);
export default mongoose.model('Post',postSchmea);