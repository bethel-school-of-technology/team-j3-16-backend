import { RequestHandler } from "express";
import { ITestimony, Testimony } from "../models/testimony";
import { verifyUser } from "../services/auth";



export const allTestimonies: RequestHandler = async (req, res, next) => {
    try {

        let allTesty = await Testimony.find();

        if (allTesty.length === 0) {
            return res.status(404).json({ message: 'No testimonies found - please add one.' });
        } else {
            
            return res.status(200).json(allTesty);
        }
    } catch (error) {
        console.error("Error fetching all testimonies:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getOneTestimony: RequestHandler = async (req, res, next) => {
    try {
        let userId = req.params.postedBy;
        let testyId = req.params.testyId;

        let thisTesty = await Testimony.findOne({ postedBy: userId, testyId: testyId });

        if (thisTesty) {
            return res.status(200).json(thisTesty);
        } else {
            return res.status(404).json({ message: 'No testimony found by this id.' });
        }
       
    } catch (error) {
        console.error("Error fetching this particular testimony:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const addTestimony: RequestHandler = async (req, res, next) => {

    try {
        let user = await verifyUser(req);
        if (!user) {
            return res.status(403).json({ error: 'User not authenticated' });
        }

        let allTesty = await Testimony.find();

        const newTesty = new Testimony({
            testyId: allTesty.length + 1,
            testimony: req.body.testimony, 
            testyDate: new Date(),
            postedBy: user.userId
        });

        const savedTesti = await newTesty.save();
        res.status(201).json(savedTesti); 

    } catch (error) {
        console.error("Error adding new testimony:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const editTestimony: RequestHandler = async (req, res, next) => {
    try {
        let user = await verifyUser(req);
        if (!user) {
            return res.status(403).json({ error: 'User not authenticated' });
        } else {

        let testyId = req.params.testyId;

        const updatedTesty: Partial<ITestimony> = {
            testimony: req.body.testimony
        };
        let edited = await Testimony.findOneAndUpdate( {testyId: testyId}, updatedTesty, { new: true })
        res.status(201).json(edited); 
        }
    } catch (error) {
        console.error("Error editing testimony:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const deleteTestimony: RequestHandler = async (req, res, next) => {
    try {
        let testyId = req.params.testyId;

        let deleted = await Testimony.findOneAndDelete({ testyId: testyId})

        if (deleted) {
            res.status(200).json('Testimony successfully deleted');
        } else {
            res.status(404).render('error', { message: 'Cannot find testimony'})
        }
   
} catch (error) {
    console.error("Error fetching testimony:", error);
    return res.status(500).json({ message: 'Internal Server Error' });
}
}