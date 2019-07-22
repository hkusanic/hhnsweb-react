import * as React from 'react';
import { Modal, Typography, Button } from 'antd';

class ModalNotification extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			showModal: false,
			loaded: false,
		};
	}

	componentDidMount () {
		const { shownotificationModal } = this.props;

		this.setState({
			showModal: shownotificationModal,
			loaded: true,
		});
	}

	handleCancelAction = () => {
		const { handleModalClose } = this.props;
	
		this.setState(
		  {
			showModal: false
		  },
		  () => {
			if (handleModalClose) {
			  handleModalClose(false);
			}
		  }
		);
	  };

	render () {
		const { loaded, showModal } = this.state;
		const {
			error,
			notificationTitle,
			notificationBody,
			isConfirm,
		} = this.props;

		const { Text } = Typography;

		if (!this.state || !loaded) {
			return <div>Error...</div>;
		}

		return (
			<div>
				<Modal
					title={notificationTitle}
					centered
					footer={null}
					visible={showModal}
					onOk={this.handleOkAction}
					onCancel={this.handleCancelAction}
					className="ModalNotificationContainer"
					destroyOnClose
					maskClosable={false}
				>
					<Text>{notificationBody}</Text>
					<Text>{error}</Text>
					<div className="modalButtonDiv">
							<React.Fragment>
								<Button
									transparent
									onClick={this.handleCancelAction}
								>Ok</Button>
							</React.Fragment>
					</div>
				</Modal>
			</div>
		);
	}
}

export default ModalNotification;
