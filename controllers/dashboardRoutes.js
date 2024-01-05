const express = require('express');
const router = express.Router();
const { Post } = require('../models');

router.get('/dashboard', async (req, res) => {
    try {
        const userPostsData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
        });

        const userPosts = userPostsData.map((post) => post.get({ plain: true }));

        res.render('dashboard', { userPosts });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
