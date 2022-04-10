const  mongoose  = require("mongoose");
const POSTMODEL = require("../models/Post");

// get request
const getPosts = async (req, res) => {
  try {
    //    res.send("I am get post");

    const getPost = await POSTMODEL.find();
    res.status(200).json(getPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
// module.exports=getPosts;

// post request
const createPost = (req, res) => {
  const post = req.body;
  const newPost = new POSTMODEL(post);
  try {
    newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// patch request
const patchPosts = async (req, res) => {
  const { postId: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const updatePost=await POSTMODEL.findByIdAndUpdate(_id, post, { new: true });

  res.json(updatePost)
};
//like post request
const likePost=async(req,res)=>{
  const { postId } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(404).send("No post with that id");

    const post=await POSTMODEL.findById(postId);
    const updatedPost=await POSTMODEL.findByIdAndUpdate(id,{likeCount:post.likeCount+1},{new:true});
    res.json(updatedPost);
}
// delete request
const deletePosts = async (req, res) => {
  const { postId } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(404).send("No post with that id");
 await POSTMODEL.findByIdAndRemove(postId);
 res.json({message:"Post delete successfully!"})   
// try{
//   const deletePost=await POSTMODEL.remove({_id:req.params.postId});
//    res.json(deletePost);
// }
// catch(err){
//    res.json({message:err});
// }

};


// export 
module.exports = {
  deletePosts: deletePosts,
  getPosts: getPosts,
  createPost: createPost,
  patchPosts: patchPosts,
  likePost:likePost,
};
