import React, { useReducer } from 'react';
import guestContext from './guestContext';
import guestReducer from './guestReducer';
import { TOGGLE_FILTER, SEARCH_GUEST, CLEAR_SEARCH, ADD_GUEST, REMOVE_GUEST, UPDATE_GUEST, EDIT_GUEST, CLEAR_EDIT } from '../types';


const initialState = {
	filterGuest: false,
	search: null,
	edit: null,
	guests: [
		{
			id: 1,
			name: "Jake Smith",
			phone: "333 444 9999",
			dietary: "Vegan",
			isConfirmed: true
		},
		{
			id: 2,
			name: "Paul Smith",
			phone: "333 444 9999",
			dietary: "Non-Veg",
			isConfirmed: false
		}
	]
}

const GuestState = ({ children }) => {

	const [state, dispatch] = useReducer(guestReducer, initialState);

	// ACTIONS
	const addGuest = (guest) => {
		guest.id = Date.now();
		guest.isConfirmed = false;
		dispatch({
			type: ADD_GUEST,
			payload: guest
		});
	}

	const removeGuest = (id) => {
		dispatch({
			type: REMOVE_GUEST,
			payload: id
		})
	}

	const updateGuest = (guest) => {
		dispatch({
			type: UPDATE_GUEST,
			payload: guest
		})
	}

	const editGuest = (guest) => {
		dispatch({
			type: EDIT_GUEST,
			payload: guest
		})
		// console.log(state);
	}
	const clearEdit = () => {
		dispatch({
			type: CLEAR_EDIT,
		})
	}

	const toggleFilter = () => {
		dispatch({
			type: TOGGLE_FILTER
		})
	}

	const searchGuest = (guest) => {
		dispatch({
			type: SEARCH_GUEST,
			payload: guest
		})
	}

	const clearSearch = () => {
		dispatch({
			type: CLEAR_SEARCH
		})
	}

	return(
		<guestContext.Provider
			value={{
				guests: state.guests,
				filterGuest: state.filterGuest,
				search: state.search,
				edit: state.edit,
				toggleFilter,
				searchGuest,
				clearSearch,
				addGuest,
				removeGuest,
				updateGuest,
				editGuest,
				clearEdit
			}}
		>
		{ children }
		</guestContext.Provider>
	);
}

export default GuestState;