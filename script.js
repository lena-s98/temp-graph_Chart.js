async function fetchData() {
	// Fetches global average temperature rise
	const response = await fetch("datasets/ZonAnn.Ts+dSST.csv");
	const data = await response.text();

	// Fetches global average temperature per month
	const res = await fetch("datasets/GLB.Ts+dSST.csv");
	const secondData = await res.text();

	// Fetch germany average temperature data
	const gerResponse = await fetch("datasets/german-temp.csv");
	const gerData = await gerResponse.text();

	// Table for global average
	const table = data.split("\n").slice(1);

	const yearArr = table.map((row) => {
		const column = row.split(",");
		const year = column[0];
		return parseInt(year);
	});

	const tempArr = table.map((row) => {
		const column = row.split(",");
		const temp = column[1];
		return parseFloat(temp) + 14;
	});

	// Table for monthly average
	const monthTable = secondData.split("\n").slice(1);

	const august = monthTable.map((row) => {
		const column = row.split(",");
		const august = column[7];
		return parseFloat(august) + 14;
	});

	// Table for german average
	const gerTable = gerData.split("\n").slice(1);

	const gerYear = gerTable.map((row) => {
		const column = row.split(",");
		const gerYear = column[0];
		return parseInt(gerYear);
	});

	const gerTemp = gerTable.map((row) => {
		const column = row.split(",");
		const gerTemp = column[1];
		return parseFloat(gerTemp);
	});

	// Global Chart
	new Chart(document.getElementById("chart"), {
		type: "bar",
		data: {
			labels: yearArr,
			datasets: [
				{
					label: "Global Average Temperature 1880 - 2022",
					data: tempArr,
					backgroundColor: "#ffa940",
				},
				{
					label: "Global Average Temperature Of August 1880 - 2022",
					data: august,
					backgroundColor: "#9BD0F5",
				},
			],
		},
		options: {
			scales: {
				y: {
					beginAtZero: false,
					title: {
						text: "Temperature in °C",
						display: true,
					},
				},
			},
		},
	});

	// Chart for Germany
	new Chart(document.getElementById("germanChart"), {
		type: "bar",
		data: {
			labels: gerYear,
			datasets: [
				{
					label: "Average Temperature in Germany 1881 - 2022",
					data: gerTemp,
					backgroundColor: "#77c897",
				},
			],
		},
		options: {
			scales: {
				y: {
					beginAtZero: false,
					title: {
						text: "Temperature in °C",
						display: true,
					},
				},
			},
		},
	});
}

fetchData();
