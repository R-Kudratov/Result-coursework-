import { ACTION_TYPES } from '../actions'

const initialPostState = {
	id: null,
	title: null,
	imageUrl: null,
	content: null,
	published_at: null,
	comments: [],
}

export const postReducer = (state = initialPostState, action) => {
	switch (action.type) {
		case ACTION_TYPES.SET_POST_DATA:
			return {
				...state,
				...action.payload,
			}
		default:
			return state
	}
}
