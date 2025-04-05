import { Routes, Route } from 'react-router-dom'
import { Authorization, Registration, Users } from './pages'
import { Header, Footer } from './components'
import styled from 'styled-components'

const Page = styled.div`
	padding: 120px 0;
	text-align: center;
`

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1200px;
	min-height: 100%;
	background-color: #ffffff;
	margin: 0 auto;
`

export const Blog = () => {
	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<div>Главная</div>} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post/:postId" element={<div>Статья</div>} />
					<Route path="/post" element={<div>Новая статья</div>} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Page>
			<Footer />
		</AppColumn>
	)
}
