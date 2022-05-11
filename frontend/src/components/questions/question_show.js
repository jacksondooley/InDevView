import React from "react";
import { withRouter } from "react-router-dom";

class QuestionShow extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<>
			<div className="question-show-page-container">
				<div >
					hello
				</div>
			</div>	
			</>
		)
	}
}

export default withRouter(QuestionShow);

