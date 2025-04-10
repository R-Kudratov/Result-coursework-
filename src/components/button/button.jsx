import styled from 'styled-components'

const ButtonContainer = ({ children, className, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	)
}

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid #000;
	cursor: ${({ disabled = false }) => (disabled ? 'default' : 'pointer')};
	width: ${({ width = '100%' }) => width};
	height: 32px;
	font-size: 18px;
`
