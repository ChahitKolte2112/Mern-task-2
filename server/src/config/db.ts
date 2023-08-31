
import mongoose from  'mongoose';
const connectDB = async (connectionURL : string) => {
    try {
        const conn = await mongoose.connect(connectionURL);
        console.log(
            `MongoDB Connected :${conn.connection.host}`
        );
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
export default connectDB;

