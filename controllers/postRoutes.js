const express = require('express');
const router = express.Router();
const { Post } = require('../models');

router.post('/new', async (req, res) => {
    try {
        const newPostData = req.body;
        newPostData.user_id = req.session.user_id; 
        const newPost = await Post.create(newPostData);
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id, 
            },
        });

        if (updatedPost > 0) {
            res.status(200).json(updatedPost);
        } else {
            res.status(404).json({ message: 'Post not found or you do not have permission to edit it' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (deletedPost) {
            res.status(200).json(deletedPost);
        } else {
            res.status(404).json({ message: 'Post not found or you do not have permission to delete it' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
