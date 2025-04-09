import { updatePost } from '../api'
import { sessions } from '../sessions'
import { ROLE } from '../constants'

export const savePost = async (hash, newPostData) => {
	const accessedRoles = [ROLE.ADMIN]

	const access = await sessions.access(hash, accessedRoles)

	if (!access) {
		return {
			error: 'Доступ запрещен',
			response: null,
		}
	}

	const updatedPost = await updatePost(newPostData)

	return {
		error: null,
		response: updatedPost,
	}
}
