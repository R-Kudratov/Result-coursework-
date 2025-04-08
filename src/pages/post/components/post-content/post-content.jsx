import { H2, Icon } from '../../../../components'
import styled from 'styled-components'

const PostContentContainer = ({ className, post: { title, imageUrl, content, publishedAt } }) => {
	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<H2 margin="0 0 20px">{title}</H2>
			<div className="special-panel">
				<div className="published-at">
					<Icon id="fa-calendar" fontSize="18px" margin="0 10px 0 0" />
					{publishedAt}
				</div>
				<div className="control-buttons">
					<Icon id="fa-file-pen" fontSize="18px" margin="0 10px 0 0" />
					<Icon id="fa-trash" fontSize="18px" />
				</div>
			</div>
			<div className="post-text">{content}</div>
		</div>
	)
}

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .special-panel {
		margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
	}

	& .published-at {
		display: flex;
		align-items: center;
	}

	& .control-buttons {
		display: flex;
	}
`
