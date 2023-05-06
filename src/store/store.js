import { configureStore } from "@reduxjs/toolkit";
import { paymentSlice } from "./paymentSlice";

export const store = configureStore({
	reducer: {
		payment: paymentSlice.reducer
	}
})