import { generateDate } from './generate-date'

export const addUser = (login, password) =>
	fetch('http://localhost:3002/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify({
			id: Date.now().toString(),
			login,
			password,
			registered_at: generateDate(),
			role_id: 2,
		}),
	})
