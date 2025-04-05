export const sessions = {
	list: {},
	create(user) {
		const hash = Math.random().toFixed(50)

		this.list[hash] = user

		return hash
	},
	remove(hash) {
		delete this.list[hash]
	},
	access(hash, accessedRoles) {
		const user = this.list[hash]

		return !!user && accessedRoles.includes(user.roleId)
	},
}
