'use strict';

var React = require('react');
var Coverflow = require('../../lib/react-coverflowX')

var Exemple = React.createClass({
	getInitialState: function() {
		return {
			margin: 20
		};
	},
	render: function() {
		return (
			<div>
				<form>
					<Coverflow ref="coverflow"
					style={{width: "100vw", height:"500px"}}
					margin={(this.state.margin || 0) + "px"}
					startPosition={4}
					enableScroll={true}>
					    <div style={{width: '150px', height: '150px', backgroundColor: 'pink'}} />
					    <div style={{width: '150px', height: '150px', backgroundColor: 'yellow'}} />
					    <div style={{width: '150px', height: '150px', backgroundColor: 'green'}} />
					    <div style={{width: '150px', height: '150px', backgroundColor: 'orange'}} />
					    <div style={{width: '150px', height: '150px', backgroundColor: 'blue'}} />
					    <div style={{width: '150px', height: '150px', backgroundColor: 'purple'}} />
					    <div style={{width: '100px', height: '150px', backgroundColor: '#000000'}} />
						<div style={{width: '200px', height: '150px', backgroundColor: 'pink'}} />
					</Coverflow>

					<input type="text" name="margin" onChange={this.handleChange} />
					<button onClick={this.prev} type="button">Prev</button>
					<button onClick={this.next} type="button">Next</button>
					<button onClick={this.getPosition} type="button">GetPosition</button>
					<button onClick={this.goAt.bind(null, 4)} type="button">Go At 5</button>
				</form>
			</div>
		);
	},
	handleMarginChange: function(e) {
		e.preventDefault();
		this.setState({margin: parseFloat(e.currentTarget.value)});
	},
	prev: function(e) {
		e.preventDefault();
		this.refs.coverflow.previous();
	},
	next: function(e) {
		e.preventDefault();
		this.refs.coverflow.next();
	},
	getPosition: function(e) {
		e.preventDefault();
		console.log(this.refs.coverflow.getPosition());
	},
	goAt: function(num, e) {
		e.preventDefault();
		this.refs.coverflow.goAt(4);
	}
});


module.exports = Exemple;