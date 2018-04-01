import React, {Component} from 'react';

import './Preloader.css';


class Preloader extends Component {

	render() {
		return (
			<div className="c-preloader">
				<span className='dot'/>
				<span className='dot'/>
				<span className='dot'/>
				<span className='dot'/>
				<span className='dot'/>
			</div>
		);
	}
}

export default Preloader;
