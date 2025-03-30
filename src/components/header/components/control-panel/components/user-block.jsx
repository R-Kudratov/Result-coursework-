import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../../../actions'
import { Icon } from '../../../../../components'
import { selectUserSession, selectUserLogin } from '../../../../../selectors'
import styled from 'styled-components'

const UserName = styled.div`
	font-size: 18px;
	font-weight: 600;
	line-height: 24px;
`

const FakeLogoutButton = styled.div`
	cursor: pointer;
`

const UserBlockContainer = ({ className }) => {
	const dispatch = useDispatch()
	const login = useSelector(selectUserLogin)
	const session = useSelector(selectUserSession)

	return (
		<div className={className}>
			<UserName>{login}</UserName>
			<FakeLogoutButton onClick={() => dispatch(logout(session))}>
				<Icon id="fa-sign-out" margin="0 0 0 10px" />
			</FakeLogoutButton>
		</div>
	)
}

export const UserBlock = styled(UserBlockContainer)`
	display: flex;
	width: 200px;
	align-items: center;
	justify-content: flex-end;
`
