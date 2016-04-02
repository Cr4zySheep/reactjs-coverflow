'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

module.exports = React.createClass({
	displayName: 'exports',

	getDefaultProps: function getDefaultProps() {
		return {
			animationSpeed: 0.7,
			enableScroll: true,
			startPosition: 0,
			margin: "25px"
		};
	},
	getInitialState: function getInitialState() {
		return {
			position: this.props.startPosition
		};
	},
	componentWillMount: function componentWillMount() {
		this._loadCSS();
	},
	componentDidMount: function componentDidMount() {
		this._loadCSS();
		var coverflow = ReactDOM.findDOMNode(this.refs.coverflow);
		var elements = coverflow.getElementsByClassName("react-coverflow-X_Element");

		var width = [];

		_.forEach(elements, function (e, key) {
			if (key > 0) {
				width.push(e.offsetLeft - elements[0].offsetLeft);
			} else {
				width.push(0);
			}
		}.bind(this));

		var translateX = "translateX(" + (coverflow.offsetWidth / 2 - (elements[this.state.position].offsetWidth / 2 + elements[0].offsetLeft) - width[this.state.position]) + "px)";
		_.forEach(elements, function (e, key) {
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
	componentWillReceiveProps: function componentWillReceiveProps(newProps) {
		if (newProps.margin) {
			_.forEach(elements, function (e, key) {
				if (key > 0) {
					width.push(e.offsetLeft - elements[0].offsetLeft);
				} else {
					width.push(0);
				}
			}.bind(this));
			_animation(this.state.position);
		}
	},
	render: function render() {
		return React.createElement(
			'div',
			_extends({ ref: 'coverflow',
				className: 'react-coverflow-X_Main'
			}, this.props, {
				onWheel: this.props.enableScroll ? this._handleWheel : "",
				onTouchStart: this._handleTouchStart,
				onTouchMove: this._handleTouchMove }),
			React.createElement(
				'div',
				{ className: 'react-coverflow-X_Coverflow' },
				_.map(this.props.children, function (element, i) {
					return React.createElement(
						'figure',
						{ key: i, className: 'react-coverflow-X_Element', style: { margin: "auto " + this.props.margin } },
						element
					);
				}.bind(this))
			)
		);
	},
	previous: function previous() {
		if (this.state.position > 0) {
			var position = this.state.position - 1;
			this.setState({ position: position });
			this._animation(position);
		}
	},
	next: function next() {
		;
		if (this.state.position < this.state.width.length - 1) {
			var position = this.state.position + 1;
			this.setState({ position: position });
			this._animation(position);
		}
	},
	goAt: function goAt(pos) {
		if (pos < 0) pos = 0;else if (pos >= this.state.width.lenght) pos = this.state.width.lenght - 1;

		this.setState({ position: pos });
		this._animation(pos);
	},
	getPosition: function getPosition() {
		return this.state.position;
	},
	_handleWheel: function _handleWheel(e) {
		e.preventDefault();

		if (e.deltaY < 0) {
			this.previous();
		} else if (e.deltaY > 0) {
			this.next();
		}
	},
	_handleTouchStart: function _handleTouchStart(e) {
		e.preventDefault();

		this.setState({
			touchStart: e.nativeEvent.touches[0].clientX
		});
	},
	_handleTouchMove: function _handleTouchMove(e) {
		e.preventDefault();

		var clientX = e.nativeEvent.touches[0].clientX;
		var lastX = this.state.touchStart;

		var move = clientX - lastX;
		var width = this.state.position > 0 ? this.state.width[this.state.position] - this.state.width[this.state.position - 1] : this.state.width[0];
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
	_animation: function _animation(position) {
		console.log(this.state.elements[position].offsetWidth);
		var translateX = "translateX(" + (this.state.coverflow.offsetWidth / 2 - (this.state.elements[position].offsetWidth / 2 + this.state.elements[0].offsetLeft) - this.state.width[position]) + "px)";
		_.forEach(this.state.elements, function (e, key) {
			var rotateY = position > key ? " rotateY(40deg)" : position < key ? " rotateY(-40deg)" : "";
			e.style.transform = translateX + rotateY;
		}.bind(this));
	},
	_loadCSS: function _loadCSS() {
		if (!this.constructor.cssLoaded && typeof document != "undefined") {
			this.constructor.cssLoaded = true;

			var css = ".react-coverflow-X_Main { position: relative; margin: 0; padding: 0; background-color: rgba(0, 0, 0, 0.1); overflow: hidden; } .react-coverflow-X_Coverflow { width: 100%; height: 100%; display: flex; -webkit-transform-style: preserve-3d; transform-style: preserve-3d; -webkit-perspective: 500px; perspective: 500px; } .react-coverflow-X_Element { position: relative; -webkit-box-reflect: below 1px -webkit-linear-gradient(bottom,rgba(0,0,0,.6),rgba(0,0,0,.1) 20%,transparent 30%,transparent); }";
			var head = document.head || document.getElementsByTagName('head')[0],
			    style = document.createElement('style');

			style.type = 'text/css';
			if (style.styleSheet) {
				style.styleSheet.cssText = css;
			} else {
				style.appendChild(document.createTextNode(css));
			}
			head.appendChild(style);
		}
	}
});