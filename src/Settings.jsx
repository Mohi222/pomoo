import React from "react";
import NumberFormat from "react-number-format";
import { formatTime } from "./App";
import { RiSettings3Fill } from "react-icons/ri";

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

const SettingsList = (props) => (
	<div>
		Work
		<TimeInput
			value={props.options.work}
			set={(val) => {
				props.setOptions({ ...props.options, work: val });
				localStorage.setItem("work", val);
			}}
		/>
		Break
		<TimeInput
			value={props.options.break}
			set={(val) => {
				props.setOptions({ ...props.options, break: val });
				localStorage.setItem("break", val);
			}}
		/>
		Long break
		<TimeInput
			value={props.options.long}
			set={(val) => {
				props.setOptions({ ...props.options, long: val });
				localStorage.setItem("long", val);
			}}
		/>
		Long invertal
		<input
			type="number"
			value={props.options.longInvertal}
			max="8"
			min="1"
			onChange={(e) => {
				let val = Number(e.target.value);
				props.setOptions({
					...props.options,
					longInvertal: val,
				});
				localStorage.setItem("longInvertal", val);
			}}
		></input>
		<button onClick={(e) => props.acceptOptions()}>Accept</button>
	</div>
);

export const Settings = ({ options, setOptions, acceptOptions }) => (
	<div className="settings">
		<RiSettings3Fill
			onClick={() => {
				setOptions({ ...options, showSettings: !options.showSettings });
			}}
		/>
		{options.showSettings ? (
			<SettingsList
				options={options}
				setOptions={setOptions}
				acceptOptions={acceptOptions}
			></SettingsList>
		) : (
			""
		)}
	</div>
);
