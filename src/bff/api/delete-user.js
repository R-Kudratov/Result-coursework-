export const deleteUser = (userId) =>
	fetch(`http://localhost:3002/users/${userId}`, {
		method: 'DELETE',
	})
