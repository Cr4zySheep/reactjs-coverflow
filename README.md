React Coverflow
===
[![npm version](https://badge.fury.io/js/reactjs-coverflow.svg)](http://badge.fury.io/js/reactjs-coverflow)

[![NPM](https://nodei.co/npm/reactjs-coverflow.png)](https://nodei.co/npm/reactjs-coverflow/)

---
(Inspired from https://github.com/andyyou/react-coverflow)

React Coverflow is a React component for building cover flow style carousel in a convenient way.

Features of `reactjs-coverflow`

* Flexbox styles of CSS 3.
* Support scroll in the component.
* Support navigation buttons optional
* Using css-module
* Support mobile
* Support different div's size

## Getting started

Install `reactjs-coverflow` using npm.

```
$ npm install reactjs-coverflow
```

The required stylesheet using `css-module` and include in package(js file), so you don't need include other stylesheet.

## Usage

```
var React = require('react');
var Coverflow = require('reactjs-coverflow');

module.exports = React.createClass({
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
```

#### Options

* startPosition [number]: Start at 0, determine the starting element of your coverflow
* enableScroll [boolean]: Enable scrolling feature.
* margin [string]: margin between elements in coverflow

#### Refs

You can get some function of your coverflow with a ref proprety
* next(): go to next slide
* previous(): go to previous slide
* goAt(number): go to {number slide} (Begin at 0 !)
* getPosition(): get position of current slide (Begin at 0)

You can use it to create some button

#### CSS
```
.react-coverflow-X_Main {
	position: relative;
	margin: 0;
    padding: 0;
    background-color: rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.react-coverflow-X_Coverflow {
	width: 100%;
	height: 100%;
	display: flex;
	-webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-perspective: 500px;
    perspective: 500px;
}

.react-coverflow-X_Element {
	position: relative;
	-webkit-box-reflect: below 1px -webkit-linear-gradient(bottom,rgba(0,0,0,.6),rgba(0,0,0,.1) 20%,transparent 30%,transparent);
}
```

You can easely overwrite style propreties.

## Contributors

* [Bastorx](https://github.com/Bastorx)

Use [Github issues](https://github.com/andyyou/react-coverflow/issues) for requests

`reactjs-coverflow` is a community project and wouldn't be what it is without contributions! We encourage and support contributions. The `reactjs-coverflow` source code is released under the MIT License.

Feel free to fork and improve/enhance `reactjs-coverflow` any way you want. If you feel that `reactjs-coverflow` will benefit from your changes, please open a pull request.

## Development

If you want to custom the component there are some commands that can help you.

#### Warning (babel-cli, babel-preset-es2015 and babel-preset-react must to be installed)
```
$npm install -g babel babel-cli babel-preset-es2015 babel-preset-react
```

```
# Compile component to lib/
$ npm run compil

# Build source of site
$ npm run build-test

# Run server (default port: 3001)
$ npm run test

# You can run all this command with the following command:
$ npm run full
```

## Release History
* 2016-03-30 v0.1 First Version


## To Do
* 0.2.0 possibility to use margin in CSS (with media queries), add :active class proprety, upgrade css :not-active = opacity(0.85) *FINAL VERSION*
