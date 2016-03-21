'use strict';

var React = require('react');
var Coverflow = require('../../react-coverflow2.jsx')

var Exemple = React.createClass({
	getInitialState: function() {
		return ({
			height: "",
			width: "",
			margin: ""
		})
	},
	render: function() {
		return (
			<div>
				<form>
					<input type="text" name="height" value={this.state.height} onChange={this.handleChange} />
					<input type="text" name="width" value={this.state.width} onChange={this.handleChange} />
					<input type="text" name="margin" value={this.state.margin} onChange={this.handleChange} />
				</form>
				<Coverflow />
			</div>
		);
	},
	handleChange: function(e) {
		e.preventDefault();
		this.setState({[e.name]: e.value});
	}
});


module.exports = Exemple;