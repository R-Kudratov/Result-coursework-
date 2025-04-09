import { Icon } from '../../../../components'
import styled from 'styled-components'

const SpecialPanelContainer = ({ className, publishedAt, editButton }) => (
	<div className={className}>
		<div className="published-at">
			<Icon id="fa-calendar" fontSize="18px" margin="0 10px 0 0" />
			{publishedAt}
		</div>
		<div className="control-buttons">
			{editButton}
			<Icon id="fa-trash" fontSize="18px" button={true} />
		</div>
	</div>
)

export const SpecialPanel = styled(SpecialPanelContainer)`
	margin: ${({ margin = '0 0 20px' }) => margin};
	display: flex;
	justify-content: space-between;

	& .published-at {
		display: flex;
		align-items: center;
	}

	& .control-buttons {
		display: flex;
	}
`
