import { deleteUser } from '../api'
import { sessions } from '../sessions'
import { ROLE } from '../constants'

export const removeUser = async (hash, userId) => {
	const accessedRoles = [ROLE.ADMIN]

	const access = await sessions.access(hash, accessedRoles)

	if (!access) {
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
