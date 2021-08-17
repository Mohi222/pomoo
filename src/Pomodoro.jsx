import React, { useState, useEffect } from "react";
import { showNotification } from "./App";
import { Time } from "./Time";
import { Progress } from "./Progress";
import { Title } from "./Title";
import { Buttons } from "./Buttons";
import { Settings } from "./Settings";

const Pomodoro = () => {
	const [options, setOptions] = useState({
		work: 1500,
		break: 300,
		long: 900,
		longInvertal: 4,
	});
	const [time, setTime] = useState(options.work);
	const [started, setStarted] = useState(false);
	const [session, setSession] = useState("work");
	const [compeleted, setCompeleted] = useState(0);
	const [remained, setRemained] = useState(4);

	const changeSession = () => {
		if (session == "work") {
			setCompeleted(compeleted + 1);
			setRemained(remained - 1);
			if (remained === 0) {
				setSession("long break");
				setTime(options.long);
			} else {
				setSession("break");
				setTime(options.break);
			}
		} else {
			setSession("work");
			setTime(options.work);
			if (remained === 0) setRemained(4);
		}

		showNotification(`time for ${session}`);
	};

	const acceptOptions = () => {
		setStarted(false);
		console.log(options);
		switch (session) {
			case "work":
				setTime(options.work);
				break;
			case "long break":
				setTime(options.long);
				break;
			case "break":
				setTime(options.break);
				break;

			default:
				break;
		}
	};

	useEffect(() => {
		if (!started) {
			return;
		}
		let interval = setInterval(() => {
			if (time > 0) setTime(time - 1);
			else {
				changeSession();
			}
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, [started, time]);

	return (
		<div className="pomodoro">
			<Title session={session}></Title>
			<Time time={time}></Time>
			<Progress compeleted={compeleted} remained={remained}></Progress>{" "}
			<Buttons started={started} setStarted={setStarted}></Buttons>
			<Settings
				options={options}
				setOptions={setOptions}
				acceptOptions={acceptOptions}
			></Settings>
		</div>
	);
};

export default Pomodoro;
