import mongoose from "mongoose";
import bcyrpt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    isAdmin:{
        type: Boolean,
        require: true,
        default: false
    },
}, {
    timeStamps: true
})


userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcyrpt.compare(enteredPassword, this.password)
}


userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcyrpt.genSalt(10)
    this.password = await bcyrpt.hash(this.password, salt)
})


const User = mongoose.model('User', userSchema)

export default User