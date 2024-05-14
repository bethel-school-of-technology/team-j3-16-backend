import { RequestHandler } from "express";
import { IPrayer, Prayer } from "../models/prayer";


export const getAllPrayers: RequestHandler = async (req, res, next) => {
    try {

        let allReqs = await Prayer.find();

        if (allReqs.length === 0) {
            return res.status(404).json({ message: 'No requests found.' });
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
        let prayerId = req.params.prayerId;

        let thisReq = await Prayer.findOne({ prayerId: prayerId });

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

        let allReq = await Prayer.find();

        const newReq: IPrayer = new Prayer({
            prayerId: allReq.length + 1,
            prayerReq: req.body.prayerReq, 
            postDate: new Date()
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
        let reqId = req.params.prayerId;

        const updatedReq: IPrayer = new Prayer({
            prayerReq: req.body.prayerReq, 
            postDate: Date
        });
        res.status(201).json(updatedReq); 

    } catch (error) {
        console.error("Error adding new prayer request:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const deletePrayer: RequestHandler = async (req, res, next) => {
    try {
        let prayerId = req.params.prayerId;
        console.log(prayerId);

        let deleted = await Prayer.findOneAndDelete({ prayerId: prayerId })

        if (deleted) {
            res.status(200).json('Request successfully deleted');
        } else {
            res.status(404).render('error', { message: 'Cannot find request'})
        }
   
} catch (error) {
    console.error("Error fetching prayer request:", error);
    return res.status(500).json({ message: 'Internal Server Error' });
}
}