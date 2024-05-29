import { RequestHandler } from "express";
import { IUser, User } from "../models/user";
import { comparePasswords, hashPassword, signUserToken, verifyUser } from "../services/auth";
import mongoose from "mongoose";


export const register: RequestHandler = async (req, res, next) => {

  try {

    let allUsers = await User.find();

    const newUser: IUser = new User({

        userId: allUsers.length + 1,
        username: req.body.username,
        password: await hashPassword(req.body.password),
        city_state: req.body.city_state,
        country: req.body.country
    });

      // user must fill out all fields to be properly registered
      if (!newUser.username || !newUser.password || !newUser.city_state || !newUser.country) {
        return res.status(400).send('Username, password, city, and country are required');
      }

      //if theres already a username that registered:
      const existingUser = await User.findOne({
        where: { username: req.body.username }
      });
      if (existingUser) {
        return res.status(400).send('Username already exists');
     }
    
     //if everything is correct and working, the new user shold be saved:
     const savedUser = await newUser.save();
        res.status(201).json(savedUser); 

  } catch (error) {
    console.error("Error registering new user:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


export const login: RequestHandler = async (req, res, next) => {

  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username
      // where: { username: req.body.username }
   });

  if (existingUser) {
      let passwordsMatch = await comparePasswords(password, existingUser.password);
      
      if (passwordsMatch) {
          let token = await signUserToken(existingUser);
          return res.status(200).json({ token, existingUser });
      }
      else {
          return res.status(401).json('Invalid password');
      }
    }
    else {
        return res.status(401).json('Invalid username');
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


export const allUsers: RequestHandler = async (req, res, next) => {

  try {
      const userList = await User.find()
      res.status(200).json(userList);

      if (userList.length === 0) {
        console.log("There currently is no users.");
      } else {
        console.log("Error loading user list.");
      }
  } 
  catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  } 
}


export const findUser: RequestHandler = async (req, res, next) => {

  try {
    const { userId } = req.params;

    const searchUser = await User.findOne({ userId });

    if (searchUser) {
      return  res.status(200).json({searchUser});

    } else {
        return res.status(400).json('Cannot find user using the params.id')
    }
  } catch (error) {
      console.error("Error searching user by user id:", error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
}


export const editUserInfo: RequestHandler = async (req, res, next) => {
  try {
   
    const user: IUser | null = await verifyUser(req);
      if (!user) {
        return res.status(404).send('User not found');
      } else {

        const { userId } = req.params;

        const updatedUser: Partial<IUser> = {
       
          password: req.body.password ? await hashPassword(req.body.password) : user.password,
          city_state: req.body.city_state || user.city_state,
          country: req.body.country || user.country
      };

      console.log("req.body:", req.body);
      console.log("updatedUser:", updatedUser);

      if (!updatedUser) {
        return res.status(404).send('Could not update user info');
      }

      let result = await User.findOneAndUpdate({ userId: userId}, updatedUser, { new: true })
      res.status(200).json(result);
    }

  } catch (error) {
    console.error("Error editing user information:", error);
    res.status(500).json({ message: 'Internal Server Error: Error editing user information' });
  }
}


export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
      let id = req.params.id;

      let deleted = await User.findByIdAndDelete(id)
      console.log(deleted);

      if (deleted) {
          res.status(200).json('User successfully deleted');
      } else {
          res.status(404).render('error', { message: 'Cannot find user'})
      }
 
  } catch (error) {
    console.error("Error deleting user by id:", error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}