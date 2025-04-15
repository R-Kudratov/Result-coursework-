import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useServerRequest } from '../../hooks'
import { checkAccess } from '../../utils'
import { UserRow, TableRow } from './components'
import { H2, PrivateContent } from '../../components'
import { ROLE } from '../../constants'
import { selectUserRole } from '../../selectors'

import styled from 'styled-components'

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([])
	const [roles, setRoles] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false)
	const requestServer = useServerRequest()
	const userRole = useSelector(selectUserRole)

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) return

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
	}, [requestServer, shouldUpdateUserList, userRole])

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) return
		requestServer('removeUser', userId).then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList)
		})
	}

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
			<div className={className}>
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
							roles={roles.filter(
								({ id: roleId }) => roleId !== ROLE.GUEST,
							)}
							onUserRemove={() => onUserRemove(userId)}
						/>
					))}
				</div>
			</div>
		</PrivateContent>
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
