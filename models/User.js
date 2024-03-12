import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        token: { 
            type: String, 
            default: null 
        },
        favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
    }, 
    {
        timestamps: true,
    }
);

export default mongoose.model('User', UserSchema);