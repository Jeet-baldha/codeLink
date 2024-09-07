import LeetCode from "leetcode-query";
import express from 'express';


const router = new express.Router();


router.get('/:slug', async (req, res) => {
    try {
        const slug = req.params.slug;
        const leetcode = new LeetCode();
        const result = await leetcode.problem(slug);

        const  problem = {
            id:result.questionId,
            title:result.title,
            content:result.content,
        }

        res.status(200).send({success: true,problem:problem});

    } catch (error) {
        res.send(error.message);
    }
})

export default router;
