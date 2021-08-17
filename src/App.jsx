import React, { useState } from "react";
import Pomodoro from "./Pomodoro";
import Push from "push.js";
import { intervalToDuration } from "date-fns";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	if (!Push.Permission.has()) Notification.requestPermission();
	return (
		<div>
			<Pomodoro />
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover={false}
			/>
		</div>
	);
}

export function showNotification(text) {
	if (Push.Permission.has()) {
		Push.create("Pomoo", {
			body: text,
			icon: "/icon.png",
			timeout: 4000,
			onClick: function () {
				window.focus();
				this.close();
			},
		});
	} else {
		toast.dark(text, {
			position: "bottom-center",
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
		});
	}
}

export function formatTime(time) {
	const makeTwoChar = (str) => `0${str}`.slice(-2);
	const { hours, minutes, seconds } = intervalToDuration({
		start: 0,
		end: time * 1000,
	});
	const formatted = `${hours !== 0 ? hours + ":" : ""}${makeTwoChar(
		minutes
	)}:${makeTwoChar(seconds)}`;
	return formatted;
}

export default App;
