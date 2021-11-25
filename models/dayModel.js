import mongoose from 'mongoose';

const daySchema = mongoose.Schema({   
    _id: String,
    creator: String
});

const DayModel = mongoose.model('LoggedDays', daySchema);

export default DayModel;