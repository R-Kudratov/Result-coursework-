import { ACTION_TYPES } from './action-types'
import { server } from '../bff'
export const logout = () => {
	server.logout()

	return {
		type: ACTION_TYPES.LOGOUT,
	}
}
