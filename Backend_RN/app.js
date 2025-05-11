import express from 'express'
import cors from 'cors'
import UserModel from './schema/UserSchema.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { connectdb } from './database/database.js';

const app = express()
const PORT = process.env.PORT || 2000;
const JWT_SECRET = 'very-secret-key'

app.use(express.json())
app.use(cors())
dotenv.config();
connectdb()

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})


app.post('/signup', async (req, res) => {
    const { name, email, mobile, password } = req.body;

    const oldUser = await UserModel.findOne({ email: email });
    if (oldUser) {
        return res.status(400).send({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    UserModel.create({ name, email, mobile, password: hashedPassword })
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({ message: err.message }));
});


app.post('login', async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email }); 
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    if( await bcrypt.compare(password, user.password)){
        const token = jwt.sign({email: user.email}, JWT_SECRET);
        res.json({token: token})
    } else {
        return res.status(400).json({ message: "Invalid email or password" });
    }
})