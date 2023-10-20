const express = require('express');
const router = express.Router();
const controllerMeme = require('../control/controlmeme');
router.post('/addmeme', controllerMeme.postMeme);
router.get('/getmeme',controllerMeme.getMeme);
router.put('/update/:ID', controllerMeme.updateMeme);
router.delete('/delete/:ID', controllerMeme.deleteMeme);
module.exports = router;