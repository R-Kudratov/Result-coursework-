import { transformUser } from '../transformers'

export const getUsers = () =>
	fetch('http://localhost:3002/users')
		.then((users) => users.json())
		.then((loadedUsers) => loadedUsers && loadedUsers.map(transformUser))
