import { getRoles } from '../api'
import { sessions } from '../sessions'
import { ROLE } from '../constants'

export const fetchRoles = async (hash) => {
	const accessedRoles = [ROLE.ADMIN]

	const access = await sessions.access(hash, accessedRoles)

	if (!access) {
		return {
			error: 'Доступ запрещен',
			response: null,
		}
	}

	const roles = await getRoles()
	return {
		error: null,
		response: roles,
	}
}
