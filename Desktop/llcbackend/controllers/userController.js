const dbb = require('../config/db');

const getAllUsers = async (req, res) => {
    try {
        const [result] = await dbb.query(`SELECT * FROM userss`);
        res.status(200).json({
            success: true,
            message: 'Users data retrieved successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to get new user',
            error,
        });
    }
};
const getAllAdmins = async (req, res) => {
    try {
        const [result] = await dbb.query(`SELECT email FROM userss WHERE role = "admin"`);
        res.status(200).json({
            success: true,
            message: 'Users data retrieved successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to get new user',
            error,
        });
    }
};
const getAllTeachers = async (req, res) => {
    try {
        const [result] = await dbb.query(`SELECT email FROM userss WHERE role = "teacher"`);
        res.status(200).json({
            success: true,
            message: 'Users data retrieved successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to get new user',
            error,
        });
    }
};
const getAllStudents = async (req, res) => {
    try {
        const [result] = await dbb.query(`SELECT email FROM userss WHERE role = "student"`);
        res.status(200).json({
            success: true,
            message: 'Users data retrieved successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to get new user',
            error,
        });
    }
};
const getUserByID = async (req, res) => {
    try {
        const [result] = await dbb.query(`SELECT * FROM userss WHERE user_id = ?`, [
            req.params.id,
        ]);
        res.status(200).json({
            success: true,
            message: 'User data retrieved successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to get user',
            error,
        });
    }
};
const deleteAllUsers = async (req, res) => {
    try {
        const [result] = await dbb.query(`DELETE FROM userss WHERE user_id = ?`, [
            req.params.id,
        ]);
        res.status(200).json({
            success: true,
            message: 'Users data deleted successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to get new user',
            error,
        });
    }
};
module.exports = { getAllUsers, getAllAdmins, getUserByID, deleteAllUsers, getAllTeachers, getAllStudents };