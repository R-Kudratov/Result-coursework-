import { transformComment } from '../transformers'

const ALL_COMMENTS_URL = 'http://localhost:3002/comments'
const POST_COMMENTS_URL = 'http://localhost:3002/comments?post_id='

export const getComments = async (postId) => {
	const url = postId ? POST_COMMENTS_URL + postId : ALL_COMMENTS_URL

	return fetch(url)
		.then((loadedComments) => loadedComments.json())
		.then((loadedComments) => loadedComments && loadedComments.map(transformComment))
}
