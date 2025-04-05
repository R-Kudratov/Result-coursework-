export const getRoles = async () => fetch(`http://localhost:3002/roles`).then((roles) => roles.json())
