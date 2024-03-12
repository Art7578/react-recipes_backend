import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        ingredients: {
            type: Array,
            required: true,
        },
        instructions: {
            type: String,
            required: true,
        },
        prep_time: {
            type: String,
            required: true,
        },
        cook_time: {
            type: String,
            required: true,
        },
        total_time: {
            type: String,
            required: true,
        },
        servings: {
            type: Number,
            required: true,
        },
        difficulty: {
            type: String,
            required: true,
        },
        nutritional_info: {
            type: Array,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Recipe', RecipeSchema);