import styled from 'styled-components'

import { Logo, ControlPanel, Description } from './components'

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Logo />
		<Description />
		<ControlPanel />
	</header>
)

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	top: 0;
	width: 1200px;
	height: 120px;
	padding: 20px 40px;
	background: #fff;
	box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.25);
`
