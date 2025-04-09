export const deletePost = (postId) =>
	fetch(`http://localhost:3002/posts/${postId}`, {
		method: 'DELETE',
	})
