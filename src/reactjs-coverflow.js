import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

module.exports = class Coverflow extends Component {
  static defaultProps = {
    enableScroll: true,
    startPosition: 0
  }
  constructor(props) {
    super(props);
    this.state = {
      position: this.props.startPosition,
      shouldUpdate: false
    };
  }
  componentWillMount() {
    this._loadCSS();
  }
  componentDidMount() {
    this._loadCSS();
    const coverflow = ReactDOM.findDOMNode(this.refs.coverflow);
    const elements = coverflow.getElementsByClassName("reactjs-coverflow_Element");

    let offset = [];

    _.forEach(elements, (e) => {
        offset.push(e.offsetLeft);
    });

    const translateX = "translateX(" + ((coverflow.offsetWidth / 2) - (elements[this.state.position].offsetWidth / 2) - offset[(this.state.position)]) + "px)";
    _.forEach(elements, (e, key) => {
      const rotateY = this.state.position > key ? " rotateY(40deg)" : this.state.position < key ? " rotateY(-40deg)" : "";
      e.style.transform = translateX + rotateY;
      if (this.props.animationSpeed) e.style.transition = "transform " + this.props.animationSpeed + "s";
    });

    this.setState({
      offset: offset,
      elements: elements,
      coverflow: coverflow
    });
    window.addEventListener('resize', this._handleResize.bind(this));
  }
  componentDidUpdate() {
    if (!this.state.shouldUpdate) return;

    this.setState({shouldUpdate: false});
    this._handleResize.apply(this);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.margin) this.setState({shouldUpdate: true});
  }
  render() {
    return (
      <div ref="coverflow"
      id={this.props.id}
      className={"reactjs-coverflow_Main" + (this.props.className ? (" " + this.props.className) : "")}
      style={this.props.style}
      onWheel={this.props.enableScroll ? this._handleWheel.bind(this) : ""}
      onTouchStart={this._handleTouchStart.bind(this)}
      onTouchMove={this._handleTouchMove.bind(this)}>
        <div className="reactjs-coverflow_Coverflow">
          {_.map(this.props.children, (element, i) => {
            return (
              <figure key={i} className={"reactjs-coverflow_Element" + (i == this.state.position ? " active" : "")} style={this.props.margin ? {margin: "auto " + this.props.margin} : {}}>
                {element}
              </figure>
            );
          })}
        </div>
      </div>
    );
  }
  previous() {
    if (this.state.position > 0) {
      const position = this.state.position - 1;
      this.setState({position: position});
      this._animation(position);
    }
  }
  next() {
    if (this.state.position < (this.state.offset.length - 1)) {
      const position = this.state.position + 1;
      this.setState({position: position});
      this._animation(position);
    }
  }
  goAt(pos) {
    if (pos < 0) pos = 0;
    else if (pos >= this.state.offset.length) pos = this.state.offset.length - 1;

    this.setState({position: pos});
    this._animation(pos);
  }
  getPosition() {
    return this.state.position
  }
  _handleWheel(e) {
    e.preventDefault();

    if (e.deltaY < 0) {
      this.previous();
    }
    else if (e.deltaY > 0) {
      this.next();
    }
  }
  _handleTouchStart(e) {
    e.preventDefault();

    this.setState({
      touchStart: e.nativeEvent.touches[0].clientX
    });
  }
  _handleTouchMove(e) {
    e.preventDefault();

    const clientX = e.nativeEvent.touches[0].clientX;
    const lastX = this.state.touchStart;

    const move = clientX - lastX;
    const width = this.state.elements[this.state.position].offsetWidth / 2;

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
  _handleResize() {
    let offset = [];

    _.forEach(this.state.elements, (e) => {
        offset.push(e.offsetLeft);
    });

    this.setState({offset: offset});
    this._animation(this.state.position, offset);
  }
  _animation(position, o) {
    const offset = o ? o : this.state.offset;
    const elementsNumber = this.state.elements.length;

    const translateX = "translateX(" + ((this.state.coverflow.offsetWidth / 2) - (this.state.elements[position].offsetWidth / 2) - offset[(position)]) + "px)";
    _.forEach(this.state.elements, (e, key) => {
      const rotateY = position > key ? " rotateY(40deg)" : position < key ? " rotateY(-40deg)" : "";
      e.style.transform = translateX + rotateY;
      e.style.zIndex = elementsNumber - Math.abs(position - key);
    });
  }
  _loadCSS() {
    if (!this.constructor.cssLoaded && typeof document != "undefined") {
      this.constructor.cssLoaded = true;

      const css = ".reactjs-coverflow_Main{position:relative;margin:0;padding:0;background-color:rgba(0,0,0,.1);overflow:hidden}.reactjs-coverflow_Coverflow{width:100%;height:100%;display:flex;-webkit-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-perspective:500px;perspective:500px;align-items:center}.reactjs-coverflow_Element{position:relative;-webkit-box-reflect:below 1px -webkit-linear-gradient(bottom,rgba(0,0,0,.6),rgba(0,0,0,.1) 20%,transparent 30%,transparent);margin:auto 20px;transition:transform .7s}";
      const head = document.head || document.getElementsByTagName('head')[0];
      let style = document.createElement('style');

      style.type = 'text/css';
      if (style.styleSheet){
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
      head.insertBefore(style, head.firstChild);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
  }
};
