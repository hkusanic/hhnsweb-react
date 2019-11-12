import React from "react";
import { Upload, Icon, message } from "antd";

const { Dragger } = Upload;

const props = {
	name: "file",
	multiple: false,
	action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
	onChange(info) {
		const { status } = info.file;
		if (status !== "uploading") {
			console.log(info.file, info.fileList);
		}
		if (status === "done") {
			message.success(`${info.file.name} file uploaded successfully.`);
		} else if (status === "error") {
			message.error(`${info.file.name} file upload failed.`);
		}
	}
};

class Step7 extends React.Component {
	render() {
		return (
			<div>
				{/* <form>
					<div>Photograph</div>
					<input type="file"></input>
				</form> */}
				<Dragger {...props}>
					<p className="ant-upload-drag-icon">
						<Icon type="inbox" />
					</p>
					<p className="ant-upload-text">
						Click or drag file to this area to upload
					</p>
				</Dragger>
				,<button onClick={this.props.prevPage}>Previous</button>
				<button onClick={this.props.submitForm}>Review and Submit</button>
			</div>
		);
	}
}

export default Step7;
