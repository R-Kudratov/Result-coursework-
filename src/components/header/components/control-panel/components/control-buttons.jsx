import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '../../../../../components'
import styled from 'styled-components'

const ControlButtonsContainer = ({ className }) => {
	const navigate = useNavigate()

	return (
		<div className={className}>
			<Icon id="fa-backward" button={true} onClick={() => navigate(-1)} />
			<Link to="/post">
				<Icon id="fa-file-lines" button={true} />
			</Link>
			<Link to="/users">
				<Icon id="fa-users" button={true} />
			</Link>
		</div>
	)
}

export const ControlButtons = styled(ControlButtonsContainer)`
	display: flex;
	justify-content: space-between;
	width: 100px;
	margin-top: 10px;
`
