import { H2 } from '../h2/h2.jsx'
import styled from 'styled-components'

const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

export const Content = ({ errorMessage, children }) =>
	errorMessage ? (
		<Div>
			<H2>Ошибка</H2>
			<div>{errorMessage}</div>
		</Div>
	) : (
		children
	)
