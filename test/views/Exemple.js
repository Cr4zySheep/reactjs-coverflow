import React, { Component } from 'react';
import Coverflow from '../../lib/reactjs-coverflow';
var Coverflow2 = require('../../lib/reactjs-coverflow');

export default class Exemple extends Component {
	render() {
		console.log(Coverflow, Coverflow2);
		return (
			<div>
				<form>
					<Coverflow ref="coverflow"
					style={{width: "100vw", height:"500px"}}
					margin={(this.state && this.state.margin + "px") || undefined}
					startPosition={1}
					enableScroll={true}
					animationSpeed={3}>
					    <div style={{width: '150px', height: '150px', backgroundColor: 'pink'}} />
					    <div style={{width: '150px', height: '150px', backgroundColor: 'yellow'}} />
					    <div style={{width: '150px', height: '150px', backgroundColor: 'green'}} />
					    <div style={{width: '150px', height: '150px', backgroundColor: 'orange'}} />
					    <div style={{width: '150px', height: '150px', backgroundColor: 'blue'}} />
					    <div style={{width: '150px', height: '150px', backgroundColor: 'purple'}} />
					    <div style={{width: '100px', height: '150px', backgroundColor: '#000000'}} />
						<div style={{width: '200px', height: '150px', backgroundColor: 'pink'}} />
					</Coverflow>

					<input type="text" name="margin" onChange={this.handleMarginChange} />
					<button onClick={this.prev.bind(this)} type="button">Prev</button>
					<button onClick={this.next.bind(this)} type="button">Next</button>
					<button onClick={this.getPosition.bind(this)} type="button">GetPosition</button>
					<button onClick={this.goAt.bind(this, 4)} type="button">Go At 5</button>
				</form>
			</div>
		);
	}
	handleMarginChange(e) {
		e.preventDefault();
		this.setState({margin: parseFloat(e.currentTarget.value)});
	}
	prev(e) {
		e.preventDefault();
		this.refs.coverflow.previous();
	}
	next(e) {
		e.preventDefault();
		this.refs.coverflow.next();
	}
	getPosition(e) {
		e.preventDefault();
		console.log(this.refs.coverflow.getPosition());
	}
	goAt(num, e) {
		e.preventDefault();
		this.refs.coverflow.goAt(4);
	}
};
