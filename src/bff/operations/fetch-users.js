import { getUsers } from '../api'
import { sessions } from '../sessions'
import { ROLE } from '../constants'

export const fetchUsers = async (userSession) => {
	const accessedRoles = [ROLE.ADMIN]

	if (!sessions.access(userSession, accessedRoles)) {
		return {
			error: 'Доступ запрещен',
			response: null,
		}
	}

	const roles = await getUsers()
	return {
		error: null,
		response: roles,
	}
}
