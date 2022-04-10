const express=require('express');
const router=express.Router();
const postController=require('../controller/postController')



// routes
router.get('/',postController.getPosts);
router.post('/',postController.createPost);
router.patch('/:postId',postController.patchPosts);
router.delete('/:postId',postController.deletePosts);
router.patch('/:postId/like',postController.likePost);

// export 
module.exports=router;

