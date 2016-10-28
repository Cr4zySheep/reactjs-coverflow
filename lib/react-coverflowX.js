'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = (_temp = _class = function (_Component) {
	_inherits(Coverflow, _Component);

	function Coverflow(props) {
		_classCallCheck(this, Coverflow);

		var _this = _possibleConstructorReturn(this, (Coverflow.__proto__ || Object.getPrototypeOf(Coverflow)).call(this, props));

		_this.state = {
			position: _this.props.startPosition,
			shouldUpdate: false
		};
		return _this;
	}

	_createClass(Coverflow, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this._loadCSS();
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this._loadCSS();
			var coverflow = _reactDom2.default.findDOMNode(this.refs.coverflow);
			var elements = coverflow.getElementsByClassName("react-coverflow-X_Element");

			var offset = [];

			_lodash2.default.forEach(elements, function (e, key) {
				offset.push(e.offsetLeft);
			});

			var translateX = "translateX(" + (coverflow.offsetWidth / 2 - elements[this.state.position].offsetWidth / 2 - offset[this.state.position]) + "px)";
			_lodash2.default.forEach(elements, function (e, key) {
				var rotateY = this.state.position > key ? " rotateY(40deg)" : this.state.position < key ? " rotateY(-40deg)" : "";
				e.style.transform = translateX + rotateY;
				if (this.props.animationSpeed) e.style.transition = "transform " + this.props.animationSpeed + "s";
			}.bind(this));

			this.setState({
				offset: offset,
				elements: elements,
				coverflow: coverflow
			});
			window.addEventListener('resize', this._handleResize.bind(this));
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			if (!this.state.shouldUpdate) return;

			this.setState({ shouldUpdate: false });
			this._handleResize.apply(this);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(newProps) {
			if (newProps.margin) this.setState({ shouldUpdate: true });
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				_extends({ ref: 'coverflow',
					className: 'react-coverflow-X_Main'
				}, this.props, {
					onWheel: this.props.enableScroll ? this._handleWheel.bind(this) : "",
					onTouchStart: this._handleTouchStart.bind(this),
					onTouchMove: this._handleTouchMove.bind(this) }),
				_react2.default.createElement(
					'div',
					{ className: 'react-coverflow-X_Coverflow' },
					_lodash2.default.map(this.props.children, function (element, i) {
						return _react2.default.createElement(
							'figure',
							{ key: i, className: "react-coverflow-X_Element" + (i == this.state.position ? " active" : ""), style: this.props.margin ? { margin: "auto " + this.props.margin } : {} },
							element
						);
					}.bind(this))
				)
			);
		}
	}, {
		key: 'previous',
		value: function previous() {
			if (this.state.position > 0) {
				var position = this.state.position - 1;
				this.setState({ position: position });
				this._animation(position);
			}
		}
	}, {
		key: 'next',
		value: function next() {
			if (this.state.position < this.state.offset.length - 1) {
				var position = this.state.position + 1;
				this.setState({ position: position });
				this._animation(position);
			}
		}
	}, {
		key: 'goAt',
		value: function goAt(pos) {
			if (pos < 0) pos = 0;else if (pos >= this.state.offset.length) pos = this.state.offset.length - 1;

			this.setState({ position: pos });
			this._animation(pos);
		}
	}, {
		key: 'getPosition',
		value: function getPosition() {
			return this.state.position;
		}
	}, {
		key: '_handleWheel',
		value: function _handleWheel(e) {
			e.preventDefault();

			if (e.deltaY < 0) {
				this.previous();
			} else if (e.deltaY > 0) {
				this.next();
			}
		}
	}, {
		key: '_handleTouchStart',
		value: function _handleTouchStart(e) {
			e.preventDefault();

			this.setState({
				touchStart: e.nativeEvent.touches[0].clientX
			});
		}
	}, {
		key: '_handleTouchMove',
		value: function _handleTouchMove(e) {
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
		}
	}, {
		key: '_handleResize',
		value: function _handleResize() {
			var offset = [];

			_lodash2.default.forEach(this.state.elements, function (e, key) {
				offset.push(e.offsetLeft);
			});

			this.setState({ offset: offset });
			this._animation(this.state.position, offset);
		}
	}, {
		key: '_animation',
		value: function _animation(position, o) {
			var offset = o ? o : this.state.offset;

			var translateX = "translateX(" + (this.state.coverflow.offsetWidth / 2 - this.state.elements[position].offsetWidth / 2 - offset[position]) + "px)";
			_lodash2.default.forEach(this.state.elements, function (e, key) {
				var rotateY = position > key ? " rotateY(40deg)" : position < key ? " rotateY(-40deg)" : "";
				e.style.transform = translateX + rotateY;
			}.bind(this));
		}
	}, {
		key: '_loadCSS',
		value: function _loadCSS() {
			if (!this.constructor.cssLoaded && typeof document != "undefined") {
				this.constructor.cssLoaded = true;

				var css = ".react-coverflow-X_Main { position: relative; margin: 0; padding: 0; background-color: rgba(0, 0, 0, 0.1); overflow: hidden; } .react-coverflow-X_Coverflow { width: 100%; height: 100%; display: flex; -webkit-transform-style: preserve-3d; transform-style: preserve-3d; -webkit-perspective: 500px; perspective: 500px; } .react-coverflow-X_Element { position: relative; -webkit-box-reflect: below 1px -webkit-linear-gradient(bottom,rgba(0,0,0,.6),rgba(0,0,0,.1) 20%,transparent 30%,transparent); margin: auto 20px; transition: transform 0.7s; }";
				var head = document.head || document.getElementsByTagName('head')[0];
				var style = document.createElement('style');

				style.type = 'text/css';
				if (style.styleSheet) {
					style.styleSheet.cssText = css;
				} else {
					style.appendChild(document.createTextNode(css));
				}
				head.appendChild(style);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			window.removeEventListener('resize', this._handleResize);
		}
	}]);

	return Coverflow;
}(_react.Component), _class.defaultProps = {
	enableScroll: true,
	startPosition: 0
}, _temp);