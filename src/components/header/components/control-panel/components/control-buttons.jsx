import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '../../../../../components'
import styled from 'styled-components'

const FakeBackButton = styled.div`
	cursor: pointer;
`

const ControlButtonsContainer = ({ className }) => {
	const navigate = useNavigate()

	return (
		<div className={className}>
			<FakeBackButton onClick={() => navigate(-1)}>
				<Icon id="fa-backward" />
			</FakeBackButton>
			<Link to="/post">
				<Icon id="fa-file-lines" />
			</Link>
			<Link to="/users">
				<Icon id="fa-users" />
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
