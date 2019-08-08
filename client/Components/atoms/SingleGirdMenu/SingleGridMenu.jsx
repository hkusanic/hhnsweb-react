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
					<Card hoverable style={{textAlign: 'center'}}
					cover={<img style={{height: "100px" , width: "100px" , borderRadius: "50%",backgroundColor: "#A9BCF5", margin: "auto" }} src={props.image} alt="" />}>
						<Meta
							title={props.menu}
							description={props.description}
							className="tour-default-title CommonFontFamily gridMenuText"
						/>
					</Card>
				</Link>
			</article>
		</div>
	);
};

export default SingleGridMenu;
