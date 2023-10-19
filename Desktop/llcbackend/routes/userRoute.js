const express = require('express');
const router = express.Router();
const control = require('../controllers/userController');

router.get('/getAll', control.getAllUsers);
router.delete('/deleteuser/:id', control.deleteAllUsers);
router.get('/getAdmin', control.getAllAdmins);
router.get('/getTeacher', control.getAllTeachers);
router.get('/getStudent', control.getAllStudents);
router.get('/getAllId/:id', control.getUserByID);
module.exports = router;