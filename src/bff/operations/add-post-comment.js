import { addComment, getComments, getPost } from '../api'
import { sessions } from '../sessions'
import { ROLE } from '../constants'

export const addPostComment = async (hash, userId, authorLogin, postId, content) => {
	const accessedRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER]

	const access = await sessions.access(hash, accessedRoles)

	if (!access) {
		return {
			error: 'Доступ запрещен',
			response: null,
		}
	}

	await addComment(userId, authorLogin, postId, content)

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
