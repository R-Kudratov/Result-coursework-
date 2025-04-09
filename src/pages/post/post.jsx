import { useEffect, useLayoutEffect } from 'react'
import { useMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useServerRequest } from '../../hooks'
import { loadPostAsync, RESET_POST_DATA } from '../../actions'
import { selectPost } from '../../selectors'
import { Comments, PostContent, PostForm } from './components'
import styled from 'styled-components'

const PostContainer = ({ className }) => {
	const dispatch = useDispatch()
	const params = useParams()
	const isEditing = useMatch('/post/:id/edit')
	const isCreating = useMatch('/post')
	const requestServer = useServerRequest()
	const post = useSelector(selectPost)

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA)
	}, [dispatch, isCreating])

	useEffect(() => {
		if (isCreating) return

		dispatch(loadPostAsync(requestServer, params.id))
	}, [isCreating, dispatch, requestServer, params.id])

	return (
		<div className={className}>
			{isCreating || isEditing ? (
				<PostForm post={post}></PostForm>
			) : (
				<>
					<PostContent post={post}></PostContent>
					<Comments comments={post.comments} postId={post.id}></Comments>
				</>
			)}
		</div>
	)
}

export const Post = styled(PostContainer)`
	padding: 40px 80px;
`
