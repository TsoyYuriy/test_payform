import React from 'react';
import Payment from './components/Payment/Payment';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Check from './components/Check/Check';

function App() {
	return (
		<div className='App'>
		<Routes>
			<Route path='/' element={<Payment/>}/>
			<Route path='/check' element={<Check/>}/>
		</Routes>
		</div>
	);
}

export default App;

// (route: "/create-payment",
// request json: {pan:"", holder:"", expire:"", cvv2:""},
// response:{status: 200, id: "", amount:1000, description:"", currency:"", date:"",
// legal_entity(Это мерчант, к которому идёт ответ):""} ).
