import React, { useReducer } from 'react';
import guestContext from './guestContext';
import guestReducer from './guestReducer';
import { TOGGLE_FILTER, SEARCH_GUEST, CLEAR_SEARCH, ADD_GUEST, REMOVE_GUEST, UPDATE_GUEST, EDIT_GUEST, CLEAR_EDIT, GET_GUESTS, GUESTS_ERROR } from '../types';
import axios from 'axios';

const initialState = {
	filterGuest: false,
	search: null,
	edit: null,
	guests: [],
	errors: null
}

const GuestState = ({ children }) => {

	const [state, dispatch] = useReducer(guestReducer, initialState);

	// ACTIONS
	const addGuest = async (guest) => {
		// guest.id = Date.now();

		// Need to send a Header whenever we POST
		const config = {
			header: {
				'Content-Type': 'application/json'
			}
		}
		try {
			const res = await axios.post('/guests', guest, config)
			console.log(guest);
			console.log(res);
			dispatch({
				type: ADD_GUEST,
				payload: res.data
			});
		}
		catch(err) {
			dispatch({
				type: GUESTS_ERROR,
				payload: err.response.data
			})
		}
	}

	const getGuests = async () => {
		try {
			const res = await axios.get('/guests');
			dispatch({
				type: GET_GUESTS,
				payload: res.data
			})
		}
		catch(err) {
			dispatch({
				type: GUESTS_ERROR,
				payload: err.response.data
			})
		}
	}

	const removeGuest = async (id) => {
		try {
			await axios.delete(`/guests/${id}`)
			dispatch({
				type: REMOVE_GUEST,
				payload: id
			})
		}
		catch(err) {
			dispatch({
				type: GUESTS_ERROR,
				payload: err.response.data
			})
		}
	}

	const updateGuest = async (guest) => {
		const config = {
			header: {
				'Content-Type': 'application/json'
			}
		}
		// PUT for UPDATE data
		const res = await axios.put(`/guests/${guest._id}`, guest, config);
		try {
			dispatch({
				type: UPDATE_GUEST,
				payload: res.data
			});
		}
		catch(err) {
			dispatch({
				type: GUESTS_ERROR,
				payload: err.response.data
			});
		}
	
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
				clearEdit,
				getGuests
			}}
		>
		{ children }
		</guestContext.Provider>
	);
}

export default GuestState;