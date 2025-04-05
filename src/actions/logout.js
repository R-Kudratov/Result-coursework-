import { ACTION_TYPES } from './action-types'
import { server } from '../bff'
export const logout = (session) => {
	server.logout(session)

	return {
		type: ACTION_TYPES.LOGOUT,
	}
}
