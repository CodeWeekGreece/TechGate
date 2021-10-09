import React from "react";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import "leaflet/dist/leaflet.css";

const Map = props => {
    console.log(props);

    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    
    L.Marker.prototype.options.icon = DefaultIcon;

    return (
        <MapContainer center={props.location} zoom={20} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={props.location}>
                <Popup>
                    {props.message}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;