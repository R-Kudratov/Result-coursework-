import { setUserRole } from '../api'
import { sessions } from '../sessions'
import { ROLE } from '../constants'

export const updateUserRole = async (userSession, userId, newUserRoleId) => {
	const accessedRoles = [ROLE.ADMIN]

	if (!sessions.access(userSession, accessedRoles)) {
		return {
			error: 'Доступ запрещен',
			response: null,
		}
	}

	setUserRole(userId, newUserRoleId)

	return {
		error: null,
		response: true,
	}
}
