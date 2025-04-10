import { getPost, getComments } from '../api'

export const fetchPost = async (postId) => {
	const [post, comments] = await Promise.all([getPost(postId), getComments(postId)])

	return {
		error: null,
		response: { ...post, comments },
	}
}
