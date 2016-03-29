'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
//var css = require('stylesheets/react-coverflow2');

var Coverflow = React.createClass({
	getDefaultProps: function() {
		return {
			animationSpeed: 0.7,
			enableScroll: true,
			startPosition: 0,
			margin: "25px"
		}
	},
	getInitialState: function() {
		return {
			position: this.props.startPosition
		};
	},
	componentWillMount: function() {
		if (this.constructor.cssLoaded) return;
		this.constructor.cssLoaded = true;

		var css = ".react-coverflow-2_Main { position: relative; margin: 0; padding: 0; background-color: rgba(0, 0, 0, 0.1); overflow: hidden; } .react-coverflow-2_Coverflow { width: 100%; height: 100%; display: flex; -webkit-transform-style: preserve-3d; transform-style: preserve-3d; -webkit-perspective: 500px; perspective: 500px; } .react-coverflow-2_Element { position: relative; -webkit-box-reflect: below 1px -webkit-linear-gradient(bottom,rgba(0,0,0,.6),rgba(0,0,0,.1) 20%,transparent 30%,transparent); }";
    	var	head = document.head || document.getElementsByTagName('head')[0],
    		style = document.createElement('style');

    		style.type = 'text/css';
			if (style.styleSheet){
  				style.styleSheet.cssText = css;
			} else {
  				style.appendChild(document.createTextNode(css));
			}
		head.appendChild(style);
	},
	componentDidMount: function() {
		var coverflow = ReactDOM.findDOMNode(this.refs.coverflow);
		var elements = coverflow.getElementsByClassName("react-coverflow-2_Element");

		var width = [];

		_.forEach(elements, function(e, key) {
			if (key > 0) {
				width.push(width[key - 1] + e.offsetWidth + (parseFloat(this.props.margin) * 2));
			}
			else {
				width.push(e.offsetWidth + (parseFloat(this.props.margin) * 2));
			}
		}.bind(this));

		var translateX = "translateX(" + ((coverflow.offsetWidth / 2) - (width[0] / 2) - (this.state.position > 0 ? width[(this.state.position) - 1] : 0)) + "px)";
		_.forEach(elements, function(e, key) {
			var rotateY = this.state.position > key ? " rotateY(40deg)" : this.state.position < key ? " rotateY(-40deg)" : "";
			e.style.transform = translateX + rotateY;
			e.style.transition = "all " + this.props.animationSpeed + "s";
		}.bind(this));

		this.setState({
			width: width,
			elements: elements,
			coverflow: coverflow
		});
	},
	render: function() {
		return (
			<div ref="coverflow"
			className="react-coverflow-2_Main"
			{...this.props}
			onWheel={this.props.enableScroll ? this._handleWheel : ""}
			onTouchStart={this._handleTouchStart}
           	onTouchMove={this._handleTouchMove}>
				<div className="react-coverflow-2_Coverflow">
					{_.map(this.props.children, function(element, i) {
						return (
							<figure key={i} className="react-coverflow-2_Element" style={{margin: "auto " + this.props.margin}}>
								{element}
							</figure>
						);
					}.bind(this))}
				</div>
			</div>
		);
	},
	previous: function() {
		if (this.state.position > 0) {
			var position = this.state.position - 1;
			this.setState({position: position});
			this._animation(position);
		}
	},
	next: function() {;
		if (this.state.position < (this.state.width.length - 1)) {
			var position = this.state.position + 1;
			this.setState({position: position});
			this._animation(position);
		}
	},
	goAt: function(pos) {
		if (pos < 0) pos = 0;
		else if (pos >= this.state.width.lenght) pos = this.state.width.lenght - 1;

		this.setState({position: pos});
		this._animation(pos);
	},
	getPosition: function() {
		return this.state.position
	},
	_handleWheel: function(e) {
		e.preventDefault();

	    if (e.deltaY < 0) {
	    	this.previous();
	    }
	    else if (e.deltaY > 0) {
	    	this.next();
	    }
	},
	_handleTouchStart(e) {
		e.preventDefault();

		this.setState({
			touchStart: e.nativeEvent.touches[0].clientX
		});
	},
	_handleTouchMove(e) {
		e.preventDefault();

		var clientX = e.nativeEvent.touches[0].clientX;
		var lastX = this.state.touchStart;

		var move = clientX - lastX;
		var width = this.state.position > 0 ? this.state.width[(this.state.position)] - this.state.width[(this.state.position - 1)] : this.state.width[0];
		width /= 2;

		if (Math.abs(move) >= width) {
			this.setState({
				touchStart: e.nativeEvent.touches[0].clientX
			});
		  	if (move > 0) {
		    	this.previous();
		  	} else if (move < 0) {
		    	this.next();
		  	}
		}
	},
	_animation: function(position) {
		var translateX = "translateX(" + ((this.state.coverflow.offsetWidth / 2) - (this.state.width[0] / 2) - (position > 0 ? this.state.width[(position) - 1] : 0)) + "px)";
		_.forEach(this.state.elements, function(e, key) {
			var rotateY = position > key ? " rotateY(40deg)" : position < key ? " rotateY(-40deg)" : "";
			e.style.transform = translateX + rotateY;
		}.bind(this));
	}
});


module.exports = Coverflow;