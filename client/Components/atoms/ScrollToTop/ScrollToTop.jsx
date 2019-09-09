import React from 'react';

export class ScrollToTop extends React.Component {
	componentDidUpdate (prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			window.scrollTo({ top: 0, left: 0 });
		}
	}
	render () {
		return this.props.children;
	}
}

export default ScrollToTop;
