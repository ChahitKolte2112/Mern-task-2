import mongoose from "mongoose";

/*
    id        String   @id @default(cuid())
    name      String
    email     String   @unique
    mobileNum String   @unique
    password  String
    disabled  Boolean  @default(false)
    createdAt DateTime

*/
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a name"],
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true,
        },
        mobileNum:{
            type : String,
            required : [true,"Mobile number is required"],
            unique : true,

        },
        password: {
            type: String,
            required: [true, "Please add an passWord"],
        },
        disabled : {
            type:Boolean,
            default:false
        }, 
    },
    {
        timestamps: true,
    }
);
export default mongoose.model("User", userSchema);
