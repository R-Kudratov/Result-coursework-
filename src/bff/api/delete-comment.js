export const deleteComment = async (id) => {
	fetch(`http://localhost:3002/comments/${id}`, {
		method: 'DELETE',
	})
}
