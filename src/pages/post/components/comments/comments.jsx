import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCommentAsync } from '../../../../actions'
import { useServerRequest } from '../../../../hooks'
import { Icon } from '../../../../components'
import { Comment } from './components'
import { ROLE } from '../../../../constants'
import { selectUserId, selectUserLogin, selectUserRole } from '../../../../selectors'
import styled from 'styled-components'

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('')
	const dispatch = useDispatch()
	const userId = useSelector(selectUserId)
	const userRole = useSelector(selectUserRole)
	const userLogin = useSelector(selectUserLogin)
	const requestServer = useServerRequest()
	const isGuest = userRole === ROLE.GUEST

	const onNewCommentAdd = (userId, userLogin, postId, content) => {
		dispatch(addCommentAsync(requestServer, userId, userLogin, postId, content))
		setNewComment('')
	}

	return (
		<div className={className}>
			{!isGuest && (
				<div className="new-comment">
					<textarea
						name="comment"
						value={newComment}
						placeholder="Введите текст комментария"
						onChange={({ target }) => setNewComment(target.value)}
					></textarea>
					<Icon
						id="fa-paper-plane"
						margin="0 0 0 10px"
						fontSize="18px"
						button={true}
						onClick={() =>
							onNewCommentAdd(userId, userLogin, postId, newComment)
						}
					/>
				</div>
			)}

			<div className="comments">
				{comments.map(({ id, authorLogin, content, publishedAt }) => (
					<Comment
						key={id}
						postId={postId}
						id={id}
						author={authorLogin}
						content={content}
						publishedAt={publishedAt}
					/>
				))}
			</div>
		</div>
	)
}

export const Comments = styled(CommentsContainer)`
	margin: 20px auto;
	width: 580px;

	& .new-comment {
		display: flex;
		width: 100%;
		height: 120px;
	}

	& .new-comment textarea {
		resize: none;
		width: 550px;
		font-size: 18px;
		padding: 10px;
	}
`
