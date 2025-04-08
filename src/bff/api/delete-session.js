export const deleteSession = async (sessionId) => {
	fetch(`http://localhost:3002/sessions/${sessionId}`, {
		method: 'DELETE',
	})
}
