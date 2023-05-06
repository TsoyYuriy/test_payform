import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const name = 'info'

export const makePayment = createAsyncThunk(`${name}/makePayment`, 

	async (data) => {
		try {
			const resp = await axios.post('/create-payment', data);
			if (resp.status === 200) {
				const data = await resp.data
				return data
			}
		} catch (err) {
			console.log(err);
		}
	}
)

const initialState = {
	infoCheck: {}
}

export const paymentSlice = createSlice({
	name,
	initialState,
	reducers: {
		showCheck(state, action) {
			state.infoCheck = action.payload
		}
	},
	extraReducers: {
		[makePayment.fulfilled]: (state, action) => {
			state.infoCheck = action.payload;
		},
	}
})
