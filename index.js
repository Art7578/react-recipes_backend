import express from "express";
import multer from "multer";
import cors from 'cors';
import dotenv from "dotenv";
import mongoose from 'mongoose';

import { registerValidation, loginValidation, recipeCreateValidation } from "./validation.js";
import { checkAuth } from "./utils/checkAuth.js";
import { handleErrors } from "./utils/handleErrors.js";
import { register, login, addToFavorites, removeFromFavorites } from "./controllers/UserController.js";
import { create, getAll, getOne, remove, update } from "./controllers/RecipeController.js";

dotenv.config();
const {DB_HOST, PORT} = process.env;

mongoose
    .connect(DB_HOST, { dbName: 'recipes_book' })
    .then(() => console.log("DB connection OK!"))
    .catch((error) => console.log("DB error", error));

const app = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

app.use(express.json());
app.use(cors());
app.use('/upload', express.static('uploads'));

app.post('/auth/register', registerValidation, handleErrors, register);
app.post('/auth/login', loginValidation, handleErrors, login);

app.post('/add-to-favorites', addToFavorites);
app.post('/remove-from-favorites', removeFromFavorites);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/upload/${req.file.originalname}`,
    });
});

app.post('/recipes', 
    checkAuth, 
    recipeCreateValidation, 
    handleErrors, 
    create
);
app.get('/recipes', getAll);
app.get('/recipes/:id', getOne);
app.delete('/recipes/:id', checkAuth, remove);
app.patch('/recipes/:id',
    checkAuth,
    recipeCreateValidation,
    handleErrors,
    update
);

app.listen(3001, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("Server OK!")
})