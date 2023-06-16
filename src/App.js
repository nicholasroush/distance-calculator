import "./App.css";
import "leaflet/dist/leaflet.css";
import {
	MapContainer,
	TileLayer,
	Polyline,
	Marker,
	Tooltip,
} from "react-leaflet";
import SideMenu from "./SideMenu/SideMenu";
import { useState } from "react";
import { Icon } from "leaflet";

function App() {
	const markerIcon = new Icon({
		iconUrl: require("./imgs/pin-icon.png"),
		iconSize: [38, 38],
	});
	const [markers, setMarkers] = useState([]);
	const markerLine = [];

	markers.map((marker) => markerLine.push(marker.geocode));

	return (
		<div className='App'>
			<div className='side-menu'>
				<SideMenu setMarkers={setMarkers} />
			</div>
			<MapContainer center={[40.73061, -73.935242]} zoom={3.25}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				{markers.map((marker) => (
					<Marker
						key={marker.geocode}
						position={marker.geocode}
						icon={markerIcon}
					>
						{marker.popup && (
							<Tooltip permanent style={{ height: "auto", width: "20rem" }}>
								<h3 className='popup-text'>{marker.popup}</h3>
							</Tooltip>
						)}
					</Marker>
				))}
				<Polyline smoothFactor={1} positions={markerLine} />
			</MapContainer>
		</div>
	);
}

export default App;
