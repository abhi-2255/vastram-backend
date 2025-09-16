import mongoose,{Document, Schema} from "mongoose"

interface IUser extends Document{
    firstName:string;
    lastName: string;
    mobile: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const userSchema = new Schema<IUser>({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    mobile: {type:String, required:true, unique:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    confirmPassword: {type:String, required:true},
},{timestamps:true})


const User = mongoose.model<IUser>("User",userSchema)
export default User;