import React from "react";

export const Buttons = (props) => (
	<button
		className={props.started ? "pause" : "start"}
		onClick={() => props.setStarted(!props.started)}
	>
		<h4>{props.started ? "Pause" : "Start"}</h4>
	</button>
);
