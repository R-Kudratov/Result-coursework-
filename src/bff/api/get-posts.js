import { transformPost } from '../transformers'

export const getPosts = () =>
	fetch('http://localhost:3002/posts')
		.then((posts) => posts.json())
		.then((loadedPosts) => loadedPosts.map(transformPost))
