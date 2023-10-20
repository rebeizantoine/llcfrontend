const Meme = require('../model/meme');
const postMeme = async (req, res) => {
    console.log(req.body);
    try {
        const insertedData = await Meme.create(req.body);
        res.status(200).json({
            success: true,
            message: 'Data added successfully',
            data: insertedData,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Data not added successfully ',
            error: error,
        });
    }
};
const getMeme = async (req, res) => {
    try {
        const whyus = await Meme.find({});
        res.status(200).json({
            data: whyus,
        });
    } catch (error) {
        res.status(200).json({
            success: false,
            message: 'Unable to get data',
            error: error,
        });
    }
};
const updateMeme = async (req, res) => {
    try {
        const whyus = await Meme.findByIdAndUpdate(req.params.ID, req.body);
        res.status(200).json({
            success: true,
            message: 'Data updated successfully.',
            data: whyus,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to update data',
            error: error,
        });
    }
};
const deleteMeme = async (req, res) => {
    try {
        const whyus = await Meme.deleteOne({ _id: req.params.ID });
        res.status(200).json({
            success: true,
            message: 'Data deleted successfully',
            data: whyus,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error occurred while deleting the data',
            error: error,
        });
    }
};

module.exports = {
    postMeme,getMeme,updateMeme,deleteMeme,
};