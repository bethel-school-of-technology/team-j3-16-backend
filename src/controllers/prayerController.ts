import { RequestHandler } from "express";
import { IPrayer, Prayer } from "../models/prayer";
import { verifyUser } from "../services/auth";
import { IUser } from "../models/user";


export const getAllPrayers: RequestHandler = async (req, res, next) => {
    try {

        let allReqs = await Prayer.find();

        if (allReqs.length === 0) {
            return res.status(200).json({ message: 'No requests found - please add one.' });
        } else {
            
            return res.status(200).json(allReqs);
        }
    } catch (error) {
        console.error("Error fetching prayer requests:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getOnePrayer: RequestHandler = async (req, res, next) => {
    try {
        let userId = req.params.postedBy; 
        let prayerId = req.params.prayerId;

        let thisReq = await Prayer.findOne({ postedBy: userId, prayerId: prayerId });
        console.log(userId);

        if (thisReq) {
            return res.status(200).json(thisReq);
        } else {
            return res.status(404).json({ message: 'No request found by id.' });
        }
       
    } catch (error) {
        console.error("Error fetching prayer request:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
  

export const addPrayer: RequestHandler = async (req, res, next) => {

    try {
        let user = await verifyUser(req);
        if (!user) {
            return res.status(403).json({ error: 'User not authenticated' });
        }
        console.log(user);

        let allReq = await Prayer.find();

        const newReq = new Prayer({
            prayerId: allReq.length + 1,
            prayerReq: req.body.prayerReq, 
            postDate: new Date(),
            postedBy: user.userId
        });

        const savedReq = await newReq.save();
        res.status(201).json(savedReq); 

    } catch (error) {
        console.error("Error adding new prayer request:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const editPrayer: RequestHandler = async (req, res, next) => {
    try {
        let user = await verifyUser(req);
        if (!user) {
            return res.status(403).json({ error: 'User not authenticated' });
        } else {
            
        let { prayerId } = req.params;

        const updatedReq: Partial<IPrayer> = {
            prayerReq: req.body.prayerReq
        };

        let edited = await Prayer.findOneAndUpdate( {prayerId: prayerId}, updatedReq, { new: true })
        res.status(201).json(edited); 
        }


    } catch (error) {
        console.error("Error adding new prayer request:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const deletePrayer: RequestHandler = async (req, res, next) => {
    try {
        let user = await verifyUser(req);
        if (!user) {
            return res.status(403).json({ error: 'User not authenticated' });
        } else {

            let userId = req.params.userId;
            let prayerId = req.params.prayerId;

            let deleted = await Prayer.findOneAndDelete({ prayerId: prayerId })

            if (deleted) {
                res.status(200).json('Request successfully deleted');
            } else {
                res.status(404).render('error', { message: 'Cannot find request'})
            }
        }
   
    } catch (error) {
        console.error("Error fetching prayer request:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}