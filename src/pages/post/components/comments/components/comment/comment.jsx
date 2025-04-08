import { Icon } from '../../../../../../components'
import styled from 'styled-components'

const CommentContainer = ({ className, author, content, publishedAt }) => {
	return (
		<div className={className}>
			<div className="comment">
				<div className="info-panel">
					<div className="author">
						<Icon id="fa-circle-user" fontSize="18px" margin="0 10px 0 0" />
						{author}
					</div>
					<div className="published-at">
						<Icon id="fa-calendar" fontSize="18px" margin="0 10px 0 0" />
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			<Icon id="fa-trash" button={true} fontSize="18px" margin="5px 0 0 10px" />
		</div>
	)
}

export const Comment = styled(CommentContainer)`
	display: flex;
	margin-top: 10px;
	width: 100%;

	& .comment {
		border: 1px solid #000;
		border-radius: 3px;
		padding: 5px 10px;
		width: 550px;
	}

	& .info-panel {
		display: flex;
		justify-content: space-between;
	}

	& .author {
		display: flex;
		align-items: center;
	}

	& .published-at {
		display: flex;
		align-items: center;
	}

	& .comment-text {
	}
`
