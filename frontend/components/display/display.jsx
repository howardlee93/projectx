import React from 'react';

import { withRouter } from 'react-router-dom';


class Display extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			term:" "
		}
		this.handleClick = this.handleClick.bind(this);

	}

	handleClick(e){
		e.preventDefault();
		this.props.openModal("loading");
		let cityName = e.target.id;
		console.log(cityName);

		
		if(cityName.includes("_")){
			cityName = cityName.split("_").join(" ");
		}

		clearTimeout(this.timer);
		const that = this;
		 this.timer = setTimeout( ()=>{
		 	that.setState({
		 		term: cityName
		 	}, ()=>(
		 		that.props.searchRestaurants(that.state.term)
		 		.then(() => that.props.closeModal()
				).then(() => 		
				that.setState({
		 			term:" "
		 		})
				).then(()=> that.props.history.push('/restaurants'))
			));
		},800)
	}

	render(){
		return(
			<div className="cities">
				<h4>Featured</h4>
				<section className="city-list">
				 <div
            		className="city-col"
            		id="new_york"
            		onClick={this.handleClick}>
            		New York
          		</div>

		        <div
		           className="city-col"
		           id="los_angeles"
		           onClick={this.handleClick}>
		           Los Angeles
		        </div>

		         <div
		            className="city-col"
		            id="chicago"
		            onClick={this.handleClick}>
		            Chicago
		         </div>

		        <div
		            className="city-col"
		            id="san_francisco"
		            onClick={this.handleClick}>
		            San Francisco
		        </div>

		        <div
		            className="city-col"
		            id="washington"
		            onClick={this.handleClick}>
		            Washington DC
		        </div>

		        <div
		            className="city-col"
		            id="seattle"
		            onClick={this.handleClick}>
		            Seattle
		        </div>
		        </section>

			</div>
			);
	}

}


export default withRouter(Display);


