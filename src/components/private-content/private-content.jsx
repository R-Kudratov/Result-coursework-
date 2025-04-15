import { useSelector } from 'react-redux'
import { Error } from '../error/error.jsx'
import { selectUserRole } from '../../selectors'
import { checkAccess } from '../../utils'
import { ERROR } from '../../constants/error.js'

export const PrivateContent = ({ serverError = null, access, children }) => {
	const userRole = useSelector(selectUserRole)

	const accessError = checkAccess(access, userRole) ? null : ERROR.ACCESS_DENIED

	const error = serverError || accessError

	return error ? <Error errorMessage={error} /> : children
}
