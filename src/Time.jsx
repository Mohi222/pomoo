import React from "react";
import { formatTime } from "./App";

export const Time = ({ time }) => {
	return (
		<div className="time">
			<h1>{formatTime(time)}</h1>
		</div>
	);
};
