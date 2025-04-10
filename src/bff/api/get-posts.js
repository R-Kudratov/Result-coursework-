import { transformPost } from '../transformers'

export const getPosts = (page, limit) =>
	fetch(`http://localhost:3002/posts?_page=${page}&_limit=${limit}`)
		.then((posts) => Promise.all([posts.json(), posts.headers.get('Link')]))
		.then(([loadedPosts, links]) => ({
			posts: loadedPosts && loadedPosts.map(transformPost),
			links,
		}))
