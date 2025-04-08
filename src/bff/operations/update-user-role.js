import { setUserRole } from '../api'
import { sessions } from '../sessions'
import { ROLE } from '../constants'

export const updateUserRole = async (hash, userId, newUserRoleId) => {
	const accessedRoles = [ROLE.ADMIN]

	const access = await sessions.access(hash, accessedRoles)

	if (!access) {
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
