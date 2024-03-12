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
            calories: {
                type: Number,
                required: true,
            },
            protein: {
                type: Number,
                required: true,
            },
            carbohydrates: {
                type: Number,
                required: true,
            },
            fat: {
                type: Number,
                required: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Recipe', RecipeSchema);