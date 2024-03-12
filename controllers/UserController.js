import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import User from '../models/User';

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new User({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash,
            token: null,
        });

        const user = await doc.save();

        const { passwordHash, ...userData } = user._doc;

        res.json(userData);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to register',
        });
    };
};

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: 'User is not found',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPass) {
            return res.status(404).json({
                message: 'Wrong login or password',
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            }, 
            'secret123',
            {
                expiresIn: '30d',
            },
        );

        user.token = token;
        await user.save();

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to login',
        });
    };
};

export const addToFavorites = async (req, res) => {
    try {
        const { userId, recipeId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({
                message: 'Recipe not found',
            });
        }

        user.favorites.push(recipeId);
        await user.save();

        res.json({
            message: 'Recipe added to favorites successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to add recipe to favorites',
        });
    }
};

export const removeFromFavorites = async (req, res) => {
    try {
        const { userId, recipeId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        user.favorites.pull(recipeId);
        await user.save();

        res.json({
            message: 'Recipe removed from favorites successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to remove recipe from favorites',
        });
    }
};

