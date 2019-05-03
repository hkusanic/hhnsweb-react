import React from 'react';
import { Card, Skeleton } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const SingleGridMenu = props => {
	return (
		<div class="col-sm-6 col-lg-3 wow-outer">


			<article class="tour-default wow slideInLeft" data-wow-delay=".1s">
				<Link
					to={props.link}
					class="tour-default-figure"
					onClick={props.handleNavigationClick}
				>
					{/* <Skeleton loading={true}> */}
					<Card
						hoverable
						style={{ width: 270 }}
						cover={
							<img
								src={props.image}
								alt=""
							/>
						}
					>
						<Meta
							title={props.menu}
							class="tour-default-title"
						/>
					</Card>
					{/* </Skeleton> */}
				</Link>
			</article>
		</div>
	);
};

export default SingleGridMenu;
