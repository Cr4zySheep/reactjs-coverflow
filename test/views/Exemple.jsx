'use strict';

var React = require('react');
var Coverflow = require('../../lib/react-coverflow2')

var Exemple = React.createClass({
	render: function() {
		return (
			<div>
				<form>
					<Coverflow ref="coverflow"
					style={{width: "100vw", height:"500px"}}
					margin="30px"
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

					<button onClick={this.prev} type="button">Prev</button>
					<button onClick={this.next} type="button">Next</button>
				</form>
			</div>
		);
	},
	prev: function(e) {
		e.preventDefault();
		this.refs.coverflow.previous();
	},
	next: function(e) {
		e.preventDefault();
		this.refs.coverflow.next();
	}
});


module.exports = Exemple;