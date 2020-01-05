import React, {Component , Fragment} from 'react';
import {Link} from 'react-router-dom';


export default class Footer extends Component{
	render(){
		return(
			<React.Fragment>

				{/*copyright*/}
				<Fragment className="nav nav-tabs bg-secondary px-3">
					<ul className="nav nav-tabs bg-secondary text-light py-3 px-3 justify-content-center font-weight-bold">
            			<li>
	        				&copy;2019 &nbsp;
	        				<span> |  
	        					<a href="https://www.github.com/tianyaliu95" className="text-light"> Tianya Liu </a> &nbsp;| &nbsp;
	        					<a href="mailto:tianyaliu1995@gmail.com" className="text-light"> Contact Me!</a>
	        				</span>
	    				</li>
           			</ul>
				</Fragment>

			</React.Fragment>
		)
	}
}
