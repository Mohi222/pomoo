import React from "react";

export const Buttons = (props) => (
	<div className="buttons">
		<button className="btn reset" onClick={() => props.reset()}>
			Reset
		</button>
		<button
			className={props.started ? "btn pause" : "btn start"}
			onClick={() => props.setStarted(!props.started)}
		>
			{props.started ? "Pause" : "Start"}
		</button>
	</div>
);
