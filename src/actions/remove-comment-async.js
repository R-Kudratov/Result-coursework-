import { setPostData } from './set-post-data'

export const removeCommentAsync = (requestServer, id, postId) => (dispatch) => {
	requestServer('removePostComment', id, postId).then(({ response }) => {
		dispatch(setPostData(response))
	})
}
