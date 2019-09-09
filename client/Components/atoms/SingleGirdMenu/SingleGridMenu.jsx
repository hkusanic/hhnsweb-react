import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const SingleGridMenu = props => {
	return (
		<div className="col-sm-6 col-lg-3 wow-outer page1">
			<article>
				<Card className="singleGrid_card">
					<Link
						to={props.link}
						className="tour-default-figure"
						onClick={props.handleNavigationClick}
					>
						<div className="singlegrid_div">
							<img
								className="singleGrid_img"
								src={props.image}
								alt="Menu Image"
							/>
							<div className="singleGrid_menu">{props.menu}</div>
						</div>
					</Link>
				</Card>
			</article>
		</div>
	);
};

export default SingleGridMenu;
