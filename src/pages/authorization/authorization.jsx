import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'

import { server } from '../../bff'
import { setUser } from '../../actions'
import { Input, Button, H2 } from '../../components'

import styled from 'styled-components'

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Введите логин')
		.matches(/^\w+$/, 'Логин может состоять только из букв и цифр')
		.min(3, 'Логин должен быть не менее 3 символов')
		.max(15, 'Логин должен быть не более 15 символов'),
	password: yup
		.string()
		.required('Введите пароль')
		.matches(/^[\w#$%]+$/, 'Пароль может состоять только из букв, цифр и знаков #, $, %')
		.min(6, 'Пароль должен быть не менее 6 символов')
		.max(30, 'Пароль должен быть не более 30 символов'),
})

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 20px 0;
	font-size: 18px;
`

const ErrorMessage = styled.div`
	margin-top: 10px;
	padding: 10px;
	font-size: 18px;
	background-color: rgb(255, 191, 191);
`

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	})

	const [serverError, setServerError] = useState(null)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onSubmit = ({ login, password }) => {
		server.authorize(login, password).then(({ error, response }) => {
			console.log(response)
			if (error) {
				setServerError(`Ошибка запроса ${error}`)
				return
			} else {
				dispatch(setUser(response))
				reset()
				navigate('/')
			}
		})
	}

	const formError = errors.login?.message || errors.password?.message
	const errorMessage = formError || serverError

	return (
		<div className={className}>
			<H2 margin="40px 0">Авторизация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин"
					{...register('login', { onChange: () => setServerError(null) })}
				/>
				<Input
					type="password"
					placeholder="Пароль"
					{...register('password', { onChange: () => setServerError(null) })}
				/>
				<Button type="submit" disabled={!!formError}>
					Авторизоваться
				</Button>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				<StyledLink to="/register"> Регистрация </StyledLink>
			</form>
		</div>
	)
}

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`
