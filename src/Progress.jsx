import React from "react";
import { RiCheckLine, RiArrowRightSLine, RiHeart3Line } from "react-icons/ri";

export const Progress = ({ compeleted, remained, longInvertal }) => (
	<ul className="progress">
		{[...Array(compeleted % longInvertal)].map((e, i) => (
			<li className="compeleted" key={i}>
				<RiCheckLine />
			</li>
		))}
		{remained !== 0 ? (
			[...Array(remained)].map((e, i) => (
				<li className="still" key={i}>
					{i === remained - 1 ? <RiHeart3Line /> : <RiArrowRightSLine />}
				</li>
			))
		) : (
			<li className="done">Session ended</li>
		)}
	</ul>
);
