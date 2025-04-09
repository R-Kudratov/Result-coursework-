import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { Authorization, Registration, Users, Post } from './pages'
import { Header, Footer, Modal } from './components'
import { setUser } from './actions'
import styled from 'styled-components'

const Page = styled.div`
	padding: 120px 0 20px;
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
	const dispatch = useDispatch()

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData')

		if (!currentUserDataJSON) {
			return
		}

		const currentUserData = JSON.parse(currentUserDataJSON)

		dispatch(setUser(currentUserData))
	}, [dispatch])

	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<div>Главная</div>} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="/post/:id/edit" element={<Post />} />
					<Route path="/post" element={<div>Новая статья</div>} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppColumn>
	)
}
