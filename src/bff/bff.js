import { getUser, addUser } from './'
import { createSession } from './create-session'

export const server = {
	async authorize(authLogin, authPassword) {
		const user = getUser(authLogin)

		if (!user) {
			return { error: 'Такой пользователь не найден', response: null }
		}

		if (user.password !== authPassword) {
			return { error: 'Неверный пароль', response: null }
		}

		return {
			error: null,
			response: createSession(user.role_id),
		}
	},
	async register(registerLogin, registerPassword) {
		const user = getUser(registerLogin)

		if (user) {
			return {
				error: 'Такой пользователь уже есть',
				response: null,
			}
		}

		await addUser(registerLogin, registerPassword)

		return {
			error: null,
			response: createSession(3),
		}
	},
}
