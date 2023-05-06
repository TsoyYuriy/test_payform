
import React from 'react'
import { useSelector } from 'react-redux'
import './check.css'

const Check = () => {

	const {infoCheck} = useSelector(state => state.payment);

	return (
		<div className='check'>
			<h1 className="title">Чек</h1>
			<div>
				<p className='check__text'>Оплата в размере: {infoCheck.amount} {infoCheck.currency}</p>
				<p className='check__text'>Товар: {infoCheck.description} </p>
				<p className='check__text'>Дата оплаты: {infoCheck.date}</p>
				<p className='check__text'>Компания: {infoCheck.legal_entity}</p>
			</div>
		</div>
	)
}

export default Check
