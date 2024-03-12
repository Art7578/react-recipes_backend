import { body } from "express-validator";

export const registerValidation = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Password must be at least six characters long').isLength({min: 6}),
    body('fullName', 'Name must contain at least three letters').isLength({min: 3})
];

export const loginValidation = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Password must be at least six characters long').isLength({min: 6}),
];

export const recipeCreateValidation = [
    body('title', 'Enter recipe title').isLength({ min: 3 }).isString(),
    body('description', 'Enter recipe description').isLength({ min: 10 }).isString(),
    body('ingredients', 'Enter recipe ingredients').isArray(),
    body('instructions', 'Enter recipe instructions').isString(),
    body('prep_time', 'Enter preparation time').isString(),
    body('cook_time', 'Enter cooking time').isString(),
    body('total_time', 'Enter total time').isString(),
    body('servings', 'Enter number of servings').isNumeric(),
    body('difficulty', 'Enter difficulty level').isString(),
    body('nutritional_info', 'Enter nutritional information').isArray(),
    body('imageUrl', 'Invalid image link').optional().isString(),
];