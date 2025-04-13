import { transformPost } from '../transformers'

export const getPosts = (searchPhrase, page, limit) =>
	fetch(
		`http://localhost:3002/posts?title_like=${searchPhrase}&_page=${page}&_limit=${limit}`,
	)
		.then((posts) => Promise.all([posts.json(), posts.headers.get('Link')]))
		.then(([loadedPosts, links]) => ({
			posts: loadedPosts && loadedPosts.map(transformPost),
			links,
		}))
