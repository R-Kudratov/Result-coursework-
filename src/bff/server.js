import { getUser, addUser, sessions } from './'

export const server = {
	async logout(session) {
		sessions.remove(session)
	},
	async authorize(authLogin, authPassword) {
		const user = await getUser(authLogin)

		if (!user) {
			return { error: 'Такой пользователь не найден', response: null }
		}

		if (user.password !== authPassword) {
			return { error: 'Неверный пароль', response: null }
		}

		return {
			error: null,
			response: {
				id: user.id,
				login: user.login,
				role_id: user.role_id,
				session: sessions.create(user),
			},
		}
	},
	async register(registerLogin, registerPassword) {
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
				role_id: user.role_id,
				session: sessions.create(user),
			},
		}
	},
}
