import React, { useState } from "react";
import { getDistance, convertDistance } from "geolib";
import menuIcon from "../imgs/menu-icon.png";
import "./sideMenu.css";

const SideMenu = ({ setMarkers }) => {
	const [collasped, setCollasped] = useState(false);
	const [coordinatesA, setCoordinatesA] = useState("");
	const [coordinatesB, setCoordinatesB] = useState("");
	const [conversion, setConversion] = useState("km");
	const [labelOneStyle, setLabelOneStyle] = useState();
	const [labelTwoStyle, setLabelTwoStyle] = useState();
	const [calculateButtonStyle, setCalculateStyle] = useState();
	const [prevSearches, setPrevSearches] = useState([]);

	const toggleCollasp = () => {
		setCollasped(!collasped);
	};

	const updateMarkers = () => {
		const latOne = coordinatesA.split(",")[0];
		const longOne = coordinatesA.trim().split(",")[1];
		const latTwo = coordinatesB.split(",")[0];
		const longTwo = coordinatesB.trim().split(",")[1];

		const length = getDistance(
			{ latitude: latOne, longitude: longOne },
			{ latitude: latTwo, longitude: longTwo }
		);

		const distance = convertDistance(length, conversion).toFixed(3);

		setMarkers([
			{ geocode: [Number(latOne), Number(longOne)] },
			{
				geocode: [Number(latTwo), Number(longTwo)],
				popup: `The distance from (${latOne}, ${longOne}) to (${latTwo}, ${longTwo}) is
					${distance}${conversion}`,
			},
		]);

		setPrevSearches([
			...prevSearches,
			{
				from: coordinatesA,
				to: coordinatesB,
				distance: `${distance}${conversion}`,
			},
		]);

		setCoordinatesA("");
		setCoordinatesB("");
	};

	const labelTransition = {
		top: "-1.5rem",
	};

	return (
		<div className='root'>
			<div>
				<button onClick={toggleCollasp} className='menu-button'>
					<img src={menuIcon} alt='Menu Icon' />
				</button>
			</div>
			<div
				style={collasped ? { width: "0" } : { width: "20rem" }}
				className={"question-container"}
			>
				<h3>
					Input latitude and longitude <br /> coordinates to calculate distance.
				</h3>
				<div className='inputs'>
					<h5>From:</h5>
					<label className='input-wrapper' htmlFor='coordinatesA'>
						<span style={labelOneStyle}>Latitude, Longitude</span>
						<input
							type='text'
							name='coordinatesA'
							className='input-fields'
							value={coordinatesA}
							onChange={(e) => setCoordinatesA(e.target.value)}
							onFocus={() => setLabelOneStyle(labelTransition)}
						/>
					</label>
				</div>
				<div className='inputs'>
					<h5>To:</h5>
					<label className='input-wrapper' htmlFor='coordinatesB'>
						<span style={labelTwoStyle}>Latitude, Longitude</span>
						<input
							type='text'
							name='coordinatesB'
							className='input-fields'
							value={coordinatesB}
							onChange={(e) => setCoordinatesB(e.target.value)}
							onFocus={() => setLabelTwoStyle(labelTransition)}
						/>
					</label>
				</div>
				<div className='radio-group'>
					<label className='radio-wrapper'>
						<span
							style={
								conversion === "km"
									? {
											boxShadow:
												"rgb(204, 219, 232) -1px 1px 4px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
									  }
									: {}
							}
							className='radio-button'
						>
							<input
								type='radio'
								value='km'
								className='radio-input'
								id='km'
								checked={conversion === "km"}
								onChange={(e) => setConversion(e.target.value)}
							/>
							<span>km</span>
						</span>
					</label>
					<label className='radio-wrapper'>
						<span
							style={
								conversion === "mi"
									? {
											boxShadow:
												"rgb(204, 219, 232) 1px 1px 4px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
									  }
									: {}
							}
							className='radio-button'
						>
							<input
								type='radio'
								value='mi'
								className='radio-input'
								id='mi'
								checked={conversion === "mi"}
								onChange={(e) => setConversion(e.target.value)}
							/>
							<span>mi</span>
						</span>
					</label>
				</div>
				<div className='calculate-btn-container'>
					<button
						disabled={coordinatesA === "" || coordinatesB === ""}
						onClick={updateMarkers}
						className='calculate-btn'
						style={calculateButtonStyle}
						onMouseDown={() =>
							setCalculateStyle({
								boxShadow:
									"0 4px 6px -1px rgba(0, 0, 0, 0.1) inset, 0 2px 4px -1px rgba(0, 0, 0, 0.06) inset",
							})
						}
						onMouseUp={() => setCalculateStyle()}
					>
						Calculate
					</button>
				</div>
				<div>
					<h3>Previous Searches</h3>
					{prevSearches?.map(({ from, to, distance }) => (
						<div className='prev-searches'>
							<h5>From:</h5>
							<p>{from}</p>
							<h5>To:</h5>
							<p>{to}</p>
							<h5>Distance</h5>
							<p>{distance}</p>
						</div>
					))}
				</div>
			</div>
			<div onClick={() => setCollasped(true)} className={"mobil-mask"} />
		</div>
	);
};

export default SideMenu;
