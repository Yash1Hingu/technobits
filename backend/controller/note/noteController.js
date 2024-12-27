'use strict';

const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const Note = mongoose.model('note');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.list_all_notes = (req, res) => {

    Note.find()
    .then(notes => {
            res.json(notes);
    })
    .catch(err => res.send({errormsg: err.message}));

}

exports.create_note = (req,res) => {
    let new_note = new Note(req.body);

    new_note.save()
        .then(note => res.status(201).json(note))
        .catch(err => res.status(500).send({errmsg: err}));
}

exports.read_a_note = (req, res) => {
    Note.findById(req.params.noteId)
        .then(note => {
            if (note) {
                res.json(note);
            } else {
                res.status(404).json({ message: "note not found" });
            }
        })
        .catch(err => res.send({ message: err.message }));
};

exports.update_a_note = (req, res) => {
    Note.findOneAndUpdate({ _id: req.params.noteId }, req.body, { new: true })
        .then(note => {
            if (note) {
                res.json(note);
            } else {
                res.status(404).send({ message: 'note not exits' });
            }
        })
        .catch(err => res.status(400).send(err));
};

exports.delete_a_post = (req, res) => {
    Note.findByIdAndDelete(req.params.noteId)
        .then(note => {
            if (note) {
                res.status(200).json({ message: 'note successfully deleted'});
            } else {
                res.status(404).json({ message: 'note not found' });
            }
        })
        .catch(err => res.status(400).send(err));
};

exports.upload_a_image = async (req, res) => {

    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'technobitnotes'
        });

        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            }
        });

        // Send the Cloudinary URL in the response
        res.json({ imageUrl: result.secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
}
