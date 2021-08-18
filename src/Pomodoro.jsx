import React, { useState, useEffect } from "react";
import { showNotification } from "./App";
import { Time } from "./Time";
import { Progress } from "./Progress";
import { Title } from "./Title";
import { Buttons } from "./Buttons";
import { Settings } from "./Settings";
const getStorageItem = (item) => {
	return Number(localStorage.getItem(item));
};

const Pomodoro = () => {
	const [options, setOptions] = useState({
		work: getStorageItem("work") || 1500,
		break: getStorageItem("break") || 300,
		long: getStorageItem("long") || 900,
		longInvertal: getStorageItem("longInvertal") || 8,
		showSettings: false,
	});
	const [time, setTime] = useState(options.work);
	const [started, setStarted] = useState(false);
	const [session, setSession] = useState("work");
	const [compeleted, setCompeleted] = useState(0);
	const [remained, setRemained] = useState(options.longInvertal);

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
			if (remained === 0) setRemained(options.longInvertal);
		}

		showNotification(`time for ${session}`);
	};

	const reset = () => {
		setStarted(false);
		setCompeleted(0);
		setRemained(options.longInvertal);
		setSession("work");
		setTime(options.work);
	};

	const acceptOptions = () => {
		setStarted(false);
		setRemained(options.longInvertal);
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
			<Progress
				compeleted={compeleted}
				remained={remained}
				longInvertal={options.longInvertal}
			></Progress>{" "}
			<Buttons
				started={started}
				setStarted={setStarted}
				reset={reset}
			></Buttons>
			<Settings
				options={options}
				setOptions={setOptions}
				acceptOptions={acceptOptions}
			></Settings>
		</div>
	);
};

export default Pomodoro;
