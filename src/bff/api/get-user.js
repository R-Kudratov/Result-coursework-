import { transformUser } from '../transformers'

export const getUser = async (loginToFind) =>
	fetch(`http://localhost:3002/users?login=${loginToFind}`)
		.then((user) => user.json())
		.then(([loadedUser]) => loadedUser && transformUser(loadedUser))
