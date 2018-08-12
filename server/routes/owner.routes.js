import { Router } from 'express';
import * as OwnerController from '../controllers/owner.controller';
const router = new Router();

// Get all Posts
router.route('/posts').get(OwnerController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(OwnerController.getPost);

// Add a new Post
router.route('/posts').post(OwnerController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(OwnerController.deletePost);

export default router;
