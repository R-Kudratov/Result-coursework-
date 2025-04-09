import { deletePost, deleteComment, getComments } from '../api'
import { sessions } from '../sessions'
import { ROLE } from '../constants'

export const removePost = async (hash, postId) => {
	const accessedRoles = [ROLE.ADMIN]

	const access = await sessions.access(hash, accessedRoles)

	if (!access) {
		return {
			error: 'Доступ запрещен',
			response: null,
		}
	}

	await deletePost(postId)

	const comments = await getComments(postId)

	await Promise.all(
		comments.map(({ id: commentId }) => {
			deleteComment(commentId)
		}),
	)

	return {
		error: null,
		response: true,
	}
}
