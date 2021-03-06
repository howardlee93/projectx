// reservation_form.jsx 

import React from 'react';

class ReservationForm extends React.Component{
	constructor(props){
		super(props);

		this.state = {

			user_id: "",
	      	restaurant_id: this.props.match.params.restaurantId,
	      	seats: 1,
	      	time: "12:00",
	      	date: ""
		};



		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.renderErrors = this.renderErrors.bind(this);

    	//helper methods
    	this.timePicker = this.timePicker.bind(this);
    	this.seatsBuilder = this.seatsBuilder.bind(this);

	}

	componentWillUnmount(){
		this.props.clearErrors();	
	}

	update(field){
		return e=>
			this.setState({
				[field]: e.currentTarget.value
			});
	}

	handleFormSubmit(e){
		e.preventDefault();

		if (this.props.currentUser){
			this.state.customerId = this.props.currentUser.id;
		}
		let fetchInfo = {
			user_id: this.state.customerId,
			restaurant_id: this.state.restaurant_id,
			seats: this.state.seats,
			date: this.state.date,
			time: this.state.time 
		};

		this.props.createReservation(fetchInfo).then(()=>{
			this.props.clearErrors();
			this.props.history.push(`/users/${this.props.currentUser.id}`);
		});

	}

	renderErrors(){
		return(
			<ul className="error-ul">
			{this.props.errors.map((error,i)=> (
				<li key={`error-${i}`}>
				{error}
				</li>
				))}
			</ul>
			);
	}

	timePicker(){
		let timeArr = [];
		let openTime = this.props.restaurants[this.state.restaurant_id].open_time;
		openTime = parseInt(openTime.split(":")[0]);
		let closeTime = this.props.restaurants[this.state.restaurant_id].close_time;
		closeTime = parseInt(closeTime.split(":"[0]));

		for (let i = openTime; i < closeTime; i++){
			timeArr.push(i);
		}

		let selectTime = timeArr.map(time => (
			<option key={time} value={time}>
			{" "}
			 {time < 10 ? "0" + time + ":00" : time + ":00"}
			</option>
			));
		return selectTime;
	}

	seatsBuilder(){
		let numPpl = [];
		for (let i = 1; i < 21; i ++){
			numPpl.push(i);
		}
		let numList = numPpl.map(num => (
			<option key={num} value={num}>
				{num === 1 ? num + " person" : num + " people"}
			</option>
			));
		return numList;

	}

	render(){
		let date = new Date();
		let minDate = date.toISOString().slice(0, 10);

		return(
			<div>
			<h4> Make a reservation</h4>
			{this.renderErrors()}
			<form>
			 <select
            	className="reservation-input  input-1"
            	onChange={this.update("seats")}
          	>
            	{this.seatsBuilder()}
          	</select>

          	<select
            	className="reservation-input  input-2"
            	onChange={this.update("time")}
          	>
            	{this.timePicker()}
          	</select>

          	<input
            	type="date"
            	min={minDate}
            	value={this.state.date}
            	placeholder="YYYY-MM-DD"
            	onChange={this.update("date")}
            	className="reservation-input  input-2"
          	/>

          	{this.props.currentUser ? (
          		<input 
          			type="submit"
          			onClick={this.handleFormSubmit}
          			value="Book a table"
          			className="submit-button"
              		id="reservation-submit"
          			/>
          		) : (
          		<input
          		type="submit"
          			onClick={this.handleFormSubmit}
          			value="Book a table"
          			className="submit-button"
              		id="reservation-submit"
          			/> 
          		)}

          		{this.props.currentUser ? (
          			<p>
          			<i/>Booked{" "}
          			{parseInt(this.state.restaurant_id.slice(0,1)) *2 + 80} times 
          			today.
          			</p>
          			) : (
          			<p> Please Log In to make a reservation!</p>
          			)}
          		</form>
			</div>
			);
	}
}


export default ReservationForm;


  
