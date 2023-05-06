import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { yupResolver } from "@hookform/resolvers/yup";
import "./payment.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { makePayment } from "../../store/paymentSlice";
import { format } from "date-fns";

const schema = yup
	.object({
		pan: yup
			.string()
			.required("Номер карты обязателен")
			.matches(/^\d{16}$/, "Номер карты должен содержать 16 цифр"),
		holder: yup
			.string()
			.required("Владелец карты обязателен")
			.matches(
				/^[a-zA-Z\s]+$/,
				"Владелец карты должен содержать только латинские буквы"
			),
		expire: yup.string().required("Срок действия обязателен"),
		cvv: yup
			.string()
			.required("CVV обязателен")
			.matches(/^\d{3}$/, "CVV должен состоять из трех цифр"),
	})
	.required();

const Payment = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const navigate = useNavigate();
	const dispatch = useDispatch()

	const onSubmit = async (data) => {
		console.log(data);
		const mock = new MockAdapter(axios);

		mock.onPost("/create-payment").reply(200, {
			status: 200,
			id: "1234567890",
			amount: 1000,
			description: "За печеньку",
			currency: "тенге",
			date: format(new Date(), 'dd.MM.yyyy'),
			legal_entity: "ТОО «Сладкий мир»",
		});


		dispatch(makePayment(data))
		navigate('/check')

	};
	return (
		<div>
			<h1 className="title">Платежная форма</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form__inner">
					<label className="label">
						<input
							className="input input__pan"
							type="text"
							{...register("pan")}
							placeholder="Номер карты"
						/>
						{errors.pan && <p className="error">{errors.pan.message}</p>}
					</label>

					<label className="label">
						<input
							className="input"
							type="text"
							{...register("expire")}
							placeholder="MM.YY"
						/>
						{errors.expire && <p className="error">{errors.expire.message}</p>}
					</label>

					<label className="label">
						<input
							className="input"
							type="text"
							{...register("cvv")}
							placeholder="CVV"
						/>
						{errors.cvv && <p className="error">{errors.cvv.message}</p>}
					</label>

					<label className="label">
						<input
							className="input"
							type="text"
							{...register("holder")}
							placeholder="Владелец карты"
						/>
						{errors.holder && <p className="error">{errors.holder.message}</p>}
					</label>
				</div>

				<button className="btn" type="submit">Оплатить</button>
			</form>
		</div>
	);
};

export default Payment;
