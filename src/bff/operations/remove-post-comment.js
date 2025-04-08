import { deleteComment, getComments, getPost } from '../api'
import { sessions } from '../sessions'
import { ROLE } from '../constants'

export const removePostComment = async (hash, id, postId) => {
	const accessedRoles = [ROLE.ADMIN, ROLE.MODERATOR]

	const access = await sessions.access(hash, accessedRoles)

	if (!access) {
		return {
			error: 'Доступ запрещен',
			response: null,
		}
	}

	await deleteComment(id)

	const post = await getPost(postId)
	const comments = await getComments(postId)

	return {
		error: null,
		response: {
			...post,
			comments,
		},
	}
}
