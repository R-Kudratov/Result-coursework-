export const getUsers = () =>
	fetch('http://localhost:3002/users').then((users) => users.json())
