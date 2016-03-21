'use strict';

var React = require('react');

var oldBrowserHtml = '<!--[if lt IE 9]> \
        <p className="browsehappy"> \
            You are using an <strong>outdated</strong> browser. \
            Please <a href="http://browsehappy.com/">upgrade your browser</a> \
            to improve your experience. \
        </p> \
    <![endif]-->';

var Html = React.createClass({
	render: function() {
		return (
			<html lang="fr">
				<head>
					<title>React Coverflow 2</title>
					<meta charSet="utf-8" />
					<meta httpEquiv="Content-type" content="text/html; charset=UTF-8" />
					<meta httpEquiv="Content-style-type" content="text/css" />
					<meta httpEquiv="Content-language" content="fr" />
					<meta name="title" content="React Coverflow 2" />
					<meta name="author" content="Bastien CHEVALLIER" />
					<meta name="description" content="React coverflow component" />
					<meta name="keywords" content="react, coverflow, 2, bastien, chevallier, developer, fullstack" />
					<meta name="content-language" content="fr" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
				</head>
				<body>
					<h1>React Coverflow 2</h1>
					<div id="app" />
                	<div className="oldBrowser" dangerouslySetInnerHTML={{__html: oldBrowserHtml}} />

                	<script src="./app.js"></script>
				</body>
			</html>
		);
	}
});


module.exports = Html;