import { deleteUser } from '../api'
import { sessions } from '../sessions'
import { ROLE } from '../constants'

export const removeUser = async (userSession, userId) => {
	const accessedRoles = [ROLE.ADMIN]

	if (!sessions.access(userSession, accessedRoles)) {
		return {
			error: 'Доступ запрещен',
			response: null,
		}
	}

	deleteUser(userId)

	return {
		error: null,
		response: true,
	}
}
