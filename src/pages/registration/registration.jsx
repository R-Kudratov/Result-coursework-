import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'

import { server } from '../../bff'
import { setUser } from '../../actions'
import { Input, Button, H2, AuthFormError, yupAuthSchema } from '../../components'

import styled from 'styled-components'

const regFormSchema = yup.object().shape({
	...yupAuthSchema,
	passcheck: yup
		.string()
		.required('Подтвердите пароль')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
})

const RegistrationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	})

	const [serverError, setServerError] = useState(null)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onSubmit = ({ login, password }) => {
		server.register(login, password).then(({ error, response }) => {
			if (error) {
				setServerError(`Ошибка запроса ${error}`)
				return
			} else {
				dispatch(setUser(response))
				sessionStorage.setItem('userData', JSON.stringify(response))
				reset()
				navigate('/')
			}
		})
	}

	const formError =
		errors.login?.message || errors.password?.message || errors.passcheck?.message
	const errorMessage = formError || serverError

	return (
		<div className={className}>
			<H2 margin="40px 0">Регистрация</H2>
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
				<Input
					type="password"
					placeholder="Повторите пароль"
					{...register('passcheck', { onChange: () => setServerError(null) })}
				/>
				<Button type="submit" disabled={!!formError}>
					Зарегистрироваться
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	)
}

export const Registration = styled(RegistrationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`
