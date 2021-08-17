import React from "react";
import NumberFormat from "react-number-format";
import { formatTime } from "./App";

const TimeInput = ({ value, set }) => (
	<NumberFormat
		format="##:##"
		placeholder="mm:ss"
		mask={["m", "m", "s", "s"]}
		defaultValue={formatTime(value)}
		onValueChange={(v) => {
			if (`${v.value}`.length === 4) {
				let times = v.formattedValue.split(":");
				let time = Number(times[0]) * 60 + Number(times[1]);
				console.log(time);
				set(time);
			}
		}}
	/>
);

export const Settings = ({ options, setOptions, acceptOptions }) => (
	<div className="settings">
		Settings: Work
		<TimeInput
			value={options.work}
			set={(val) => {
				setOptions({
					...options,
					work: val,
				});
			}}
		/>
		Break
		<TimeInput
			value={options.break}
			set={(val) => {
				setOptions({
					...options,
					break: val,
				});
			}}
		/>
		Long break
		<TimeInput
			value={options.long}
			set={(val) => {
				setOptions({
					...options,
					long: val,
				});
			}}
		/>
		<button onClick={(e) => acceptOptions()}>Accept</button>
	</div>
);
