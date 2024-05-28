import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide a username"],
            unique: true
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
        },
        isVerified: {
            type: Boolean,  //email verified or not we checked here.
            default: false
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        forgotPasswordToken: String,
        forgotPasswordTokenExpire: Date,
        verifyToken: String,
        verifyExpireToken: Date,
    }
)

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;