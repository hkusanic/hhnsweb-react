import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const SingleGridMenu = props => {
	return (
		<div class="col-sm-6 col-lg-3 wow-outer page1">
			<article
				class="tour-default wow fadeInUpSmall page1"
				data-wow-delay=".1s"
			>
				<Link
					to={props.link}
					class="tour-default-figure"
					onClick={props.handleNavigationClick}
				>
					<Card hoverable cover={<img src={props.image} alt="" />}>
						<Meta
							title={props.menu}
							className="tour-default-title CommonFontFamily gridMenuText"
						/>
					</Card>
				</Link>
			</article>
		</div>
	);
};

export default SingleGridMenu;
