import { useEffect, useState } from 'react'
import { useServerRequest } from '../../hooks'
import { UserRow, TableRow } from './components'
import { H2, Content } from '../../components'

import styled from 'styled-components'
import { ROLE } from '../../constants'

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([])
	const [roles, setRoles] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false)
	const requestServer = useServerRequest()

	useEffect(() => {
		Promise.all([requestServer('fetchUsers'), requestServer('fetchRoles')]).then(
			([usersResponse, rolesResponse]) => {
				if (usersResponse.error || rolesResponse.error) {
					setErrorMessage(usersResponse.error || rolesResponse.error)
					return
				}
				setUsers(usersResponse.response)
				setRoles(rolesResponse.response)
			},
		)
	}, [requestServer, shouldUpdateUserList])

	const onUserRemove = (userId) => {
		requestServer('removeUser', userId).then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList)
		})
	}

	return (
		<div className={className}>
			<Content errorMessage={errorMessage}>
				<H2>Пользователи</H2>
				<div>
					<TableRow>
						<div className="login-column">Логин</div>
						<div className="registered-at-column">Дата регистрации</div>
						<div className="role-column">Роль</div>
					</TableRow>
					{users.map(({ id: userId, login, registeredAt, roleId }) => (
						<UserRow
							key={userId}
							userId={userId}
							login={login}
							registeredAt={registeredAt}
							roleId={roleId}
							roles={roles.filter(({ id: roleId }) => roleId !== ROLE.GUEST)}
							onUserRemove={() => onUserRemove(userId)}
						/>
					))}
				</div>
			</Content>
		</div>
	)
}

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 600px;
	margin: 0 auto;
	font-size: 18px;
`
