'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

module.exports = React.createClass({
	getDefaultProps: function() {
		return {
			animationSpeed: 0.7,
			enableScroll: true,
			startPosition: 0
		}
	},
	getInitialState: function() {
		return {
			position: this.props.startPosition,
			shouldUpdate: false
		};
	},
	componentWillMount: function() {
		this._loadCSS();
	},
	componentDidMount: function() {
		this._loadCSS();
		var coverflow = ReactDOM.findDOMNode(this.refs.coverflow);
		var elements = coverflow.getElementsByClassName("react-coverflow-X_Element");

		var offset = [];

		_.forEach(elements, function(e, key) {
				offset.push(e.offsetLeft);
		});

		var translateX = "translateX(" + ((coverflow.offsetWidth / 2) - (elements[this.state.position].offsetWidth / 2) - offset[(this.state.position)]) + "px)";
		_.forEach(elements, function(e, key) {
			var rotateY = this.state.position > key ? " rotateY(40deg)" : this.state.position < key ? " rotateY(-40deg)" : "";
			e.style.transform = translateX + rotateY;
			e.style.transition = "transform " + this.props.animationSpeed + "s";
		}.bind(this));

		this.setState({
			offset: offset,
			elements: elements,
			coverflow: coverflow
		});
	},
	componentDidUpdate: function() {
		if (!this.state.shouldUpdate) return;

		this.setState({shouldUpdate: false});
		var offset = [];

		_.forEach(this.state.elements, function(e, key) {
				offset.push(e.offsetLeft);
		});

		this.setState({offset: offset});
		this._animation(this.state.position, offset);
	},
	componentWillReceiveProps: function(newProps) {
		if (newProps.margin) this.setState({shouldUpdate: true});
	},
	render: function() {
		return (
			<div ref="coverflow"
			className="react-coverflow-X_Main"
			{...this.props}
			onWheel={this.props.enableScroll ? this._handleWheel : ""}
			onTouchStart={this._handleTouchStart}
           	onTouchMove={this._handleTouchMove}>
				<div className="react-coverflow-X_Coverflow">
					{_.map(this.props.children, function(element, i) {
						return (
							<figure key={i} className={"react-coverflow-X_Element" + (i == this.state.position ? " active" : "")} style={this.props.margin ? {margin: "auto " + this.props.margin} : {}}>
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
		if (this.state.position < (this.state.offset.length - 1)) {
			var position = this.state.position + 1;
			this.setState({position: position});
			this._animation(position);
		}
	},
	goAt: function(pos) {
		if (pos < 0) pos = 0;
		else if (pos >= this.state.offset.length) pos = this.state.offset.length - 1;

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
	_handleTouchStart: function(e) {
		e.preventDefault();

		this.setState({
			touchStart: e.nativeEvent.touches[0].clientX
		});
	},
	_handleTouchMove: function(e) {
		e.preventDefault();

		var clientX = e.nativeEvent.touches[0].clientX;
		var lastX = this.state.touchStart;

		var move = clientX - lastX;
		var width = this.state.elements[this.state.position].offsetWidth / 2;

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
	_animation: function(position, offset) {
		var offset = offset ? offset : this.state.offset;

		var translateX = "translateX(" + ((this.state.coverflow.offsetWidth / 2) - (this.state.elements[position].offsetWidth / 2) - offset[(position)]) + "px)";
		_.forEach(this.state.elements, function(e, key) {
			var rotateY = position > key ? " rotateY(40deg)" : position < key ? " rotateY(-40deg)" : "";
			e.style.transform = translateX + rotateY;
		}.bind(this));
	},
	_loadCSS: function() {
		if (!this.constructor.cssLoaded && typeof document != "undefined") {
			this.constructor.cssLoaded = true;

			var css = ".react-coverflow-X_Main { position: relative; margin: 0; padding: 0; background-color: rgba(0, 0, 0, 0.1); overflow: hidden; } .react-coverflow-X_Coverflow { width: 100%; height: 100%; display: flex; -webkit-transform-style: preserve-3d; transform-style: preserve-3d; -webkit-perspective: 500px; perspective: 500px; } .react-coverflow-X_Element { position: relative; -webkit-box-reflect: below 1px -webkit-linear-gradient(bottom,rgba(0,0,0,.6),rgba(0,0,0,.1) 20%,transparent 30%,transparent); margin: auto 20px; }";
	    	var	head = document.head || document.getElementsByTagName('head')[0],
	    		style = document.createElement('style');

	    		style.type = 'text/css';
				if (style.styleSheet){
	  				style.styleSheet.cssText = css;
				} else {
	  				style.appendChild(document.createTextNode(css));
				}
			head.appendChild(style);
		}
	}
});