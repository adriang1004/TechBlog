const express = require('express');
const router = express.Router();
const { Post } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('home', { 
            posts, 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
