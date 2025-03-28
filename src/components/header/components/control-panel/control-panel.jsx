import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '../../../../components'
import styled from 'styled-components'

const User = styled.div`
	align-self: flex-end;
`

const ControlButtons = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 10px;
`

const Button = styled.button`
	cursor: pointer;
	width: 100px;
	height: 32px;
	font-size: 18px;
`

const FakeButton = styled.div`
	cursor: pointer;
`

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate()
	return (
		<div className={className}>
			<User>
				<Link to="/login">
					<Button>Войти</Button>
				</Link>
			</User>
			<ControlButtons>
				<FakeButton onClick={() => navigate(-1)}>
					<Icon id="fa-backward" />
				</FakeButton>
				<Link to="/post">
					<Icon id="fa-file-lines" />
				</Link>
				<Link to="/users">
					<Icon id="fa-users" />
				</Link>
			</ControlButtons>
		</div>
	)
}

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
`
