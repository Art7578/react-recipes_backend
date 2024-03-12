import Recipe from "../models/Recipes";

export const create = async (req, res) => {
    try {
        const doc = new Recipe ({
            title: req.body.title,
            description: req.body.description,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            prep_time: req.body.prep_time,
            cook_time: req.body.cook_time,
            total_time: req.body.total_time,
            servings: req.body.servings,
            difficulty: req.body.difficulty,
            nutritional_info: req.body.nutritional_info,
            imageUrl: req.body.imageUrl,
            user: req.userId,
        });

        const recipe = await doc.save();

        res.json(recipe);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to create recipe',
        });
    };
};

export const getAll = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('user').exec();

        res.json(recipes)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get recipe',
        });
    };
};

export const getOne = async (req, res) => {
    try {
        const recipeId = req.params.id;

        const getOneRecipe = await Recipe.findOneAndUpdate(
            {
                _id: recipeId,
            },
            {
                new: true, 
            }
        )
        .populate('user'); 

        if (!getOneRecipe) {
            return res.status(404).json({
                message: 'Recipe not found',
            });
        }

        res.json(getOneRecipe);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get recipe',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const recipeId = req.params.id;

        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

        if (!deletedRecipe) {
            return res.status(404).json({
                message: 'Recipe not found',
            });
        }

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to delete recipe',
        });
    }
};

export const update = async (req, res) => {
    try {
        const recipeId = req.params.id;

        const updatedRecipe = await Recipe.updateOne(
            {
                _id: recipeId,
            },
            {
                title: req.body.title,
                description: req.body.description,
                ingredients: req.body.ingredients,
                instructions: req.body.instructions,
                prep_time: req.body.prep_time,
                cook_time: req.body.cook_time,
                total_time: req.body.total_time,
                servings: req.body.servings,
                difficulty: req.body.difficulty,
                nutritional_info: req.body.nutritional_info,
                imageUrl: req.body.imageUrl,
                user: req.userId,
            }
        );

        res.json({
            success: true,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to update recipe',
        });
    }
}