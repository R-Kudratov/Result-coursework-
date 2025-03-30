import { useSelector } from 'react-redux'
import { ControlButtons, LoginButton, UserBlock } from './components'
import { ROLE } from '../../../../constants'
import { selectUserRole } from '../../../../selectors'
import styled from 'styled-components'

const ControlPanelContainer = ({ className }) => {
	const roleId = useSelector(selectUserRole)

	console.log(roleId)

	return (
		<div className={className}>
			{roleId === ROLE.GUEST ? <LoginButton /> : <UserBlock />}
			<ControlButtons />
		</div>
	)
}

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	width: 260px;
`
