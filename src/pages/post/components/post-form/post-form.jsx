import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePostAsync } from '../../../../actions'
import { useServerRequest } from '../../../../hooks/use-server-request.js'
import { Input, Icon } from '../../../../components'
import { SpecialPanel } from '../special-panel/special-panel.jsx'
import { sanitizeContent } from './utils'
import styled from 'styled-components'

const PostFormContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const requestServer = useServerRequest()

	const imageRef = useRef(null)
	const titleRef = useRef(null)
	const contentRef = useRef(null)

	const onSave = () => {
		const newImageUrl = imageRef.current.value
		const newTitle = titleRef.current.value
		const newContent = sanitizeContent(contentRef.current.innerHTML)

		dispatch(
			savePostAsync(requestServer, {
				id,
				imageUrl: newImageUrl,
				title: newTitle,
				content: newContent,
			}),
		).then(() => {
			navigate(`/post/${id}`)
		})
	}

	return (
		<div className={className}>
			<Input ref={imageRef} defaultValue={imageUrl} placeholder="Изображение" />
			<Input ref={titleRef} defaultValue={title} placeholder="Заголовок" />
			<SpecialPanel
				publishedAt={publishedAt}
				margin="20px 0"
				editButton={
					<Icon
						id="fa-floppy-disk"
						fontSize="21px"
						margin="-3px 10px 0 0"
						button={true}
						onClick={() => onSave()}
					/>
				}
			/>
			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="post-text"
			>
				{content}
			</div>
		</div>
	)
}

export const PostForm = styled(PostFormContainer)`
	display: flex;
	flex-direction: column;

	& .post-text {
		white-space: pre-wrap;
		padding: 5px;
	}
`
