import React from "react";

export const Progress = ({ compeleted, remained }) => (
	<p className="progress">
		{[...Array(compeleted % 4)].map((e, i) => (
			<span className="compeleted" key={i}>
				+
			</span>
		))}
		{remained !== 0
			? [...Array(remained)].map((e, i) => (
					<span className="still" key={i}>
						-
					</span>
			  ))
			: "Session ended"}
	</p>
);
