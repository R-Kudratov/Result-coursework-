import { generateDate } from '../utils'

export const addComment = (userId, authorLogin, postId, content) =>
	fetch('http://localhost:3002/comments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify({
			author_id: userId,
			author_login: authorLogin,
			post_id: postId,
			content: content,
			published_at: generateDate(),
		}),
	})
