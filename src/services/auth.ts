import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';


const secret = 'finalProject2024';

export const hashPassword = async (plainTextPassword: string) => {
    const saltRound = 5;
    const hash = await bcrypt.hash(plainTextPassword, saltRound);
    return hash;
}

export const comparePasswords = async (plainTextPassword: string, hashPassword: string) => {
    return await bcrypt.compare(plainTextPassword, hashPassword);
}

export const signUserToken = async (user: any) => {
    let token = jwt.sign(
        { userId: user.userId },
        secret,
        { expiresIn: '1hr' }
    );
    return token;
}

export const verifyUser = async (req: Request) => {

    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        try {
            let decoded: any = await jwt.verify(token, secret);
            return User.findOne({ userId: decoded.userId });
        } catch (err) {
            return null;
        }
    } else {
        return null;
    }
}