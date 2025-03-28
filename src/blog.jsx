import { Routes, Route } from 'react-router-dom'
import styled from 'styled-components'

import { Header, Footer } from './components'

const Content = styled.div`
	padding: 120px 0;
	text-align: center;
`

const H2 = styled.h2`
	text-align: center;
`

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1200px;
	min-height: 100%;
	background-color: #fff;
	margin: 0 auto;
`

export const Blog = () => {
	return (
		<AppColumn>
			<Header />
			<Content>
				<H2>Блог</H2>
				<Routes>
					<Route path="/" element={<div>Главная</div>} />
					<Route path="/login" element={<div>Авторизация</div>} />
					<Route path="/register" element={<div>Регистрация</div>} />
					<Route path="/users" element={<div>Пользователи</div>} />
					<Route path="/post/:postId" element={<div>Статья</div>} />
					<Route path="/post" element={<div>Новая статья</div>} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Content>
			<Footer />
		</AppColumn>
	)
}
