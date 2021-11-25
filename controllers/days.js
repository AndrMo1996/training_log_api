import DayModel from "../models/dayModel.js";

export const getDays = async (req, res) => {
    try {
        const days = await DayModel.find();
        res.status(200).json(days);
    } catch (error) {
        res.status(404).json( { message: error.message });
    }
}

export const addDay = async (req, res) => {
    const day = req.body;
    const newDay = new DayModel(day);
    try {
        await newDay.save();
        res.status(201).json(newDay);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const deleteDay = async (req, res) => {
    const { id } = req.params;
    try {
        await DayModel.findByIdAndRemove(id);
        res.json({ message: 'deleted'});
    } catch (error) {
        res.json({ message: error.message});
    }
}