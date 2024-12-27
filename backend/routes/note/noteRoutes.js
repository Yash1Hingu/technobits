'use strict';

const express = require('express');
const upload = require('../../config/multer-config');
const noteList = require('../../controller/note/noteController');

const router = new express.Router();

router.get('/notes', noteList.list_all_notes);
router.post('/notes', noteList.create_note);
router.post('/upload-image', upload.single('image'), noteList.upload_a_image);


router.get('/note/:noteId', noteList.read_a_note);
router.put('/note/:noteId', noteList.update_a_note);
router.delete('/note/:noteId', noteList.delete_a_post);

module.exports = router;