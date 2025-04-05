import { sessions } from '../sessions'
import { getUser, addUser } from '../api'

export const register = async (registerLogin, registerPassword) => {
	const existedUser = await getUser(registerLogin)

	if (existedUser) {
		return {
			error: 'Такой пользователь уже есть',
			response: null,
		}
	}

	const user = await addUser(registerLogin, registerPassword)
	return {
		error: null,
		response: {
			id: user.id,
			login: user.login,
			roleId: user.role_id,
			session: sessions.create(user),
		},
	}
}
