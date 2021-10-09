import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";

import Nav from "../../components/nav/nav";
import Booking from "../../components/booking/booking";

import { fetchUserBookings } from "../../redux/actions/shopActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faClock } from "@fortawesome/free-solid-svg-icons";

import "./bookings-list.css";

const BookingsList = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserBookings());
    }, [dispatch]);

    function renderBookings() {
        if (props.user_bookings.length > 0) {
            return (
                <div className="bookings-container">
                    <div className="bookings-container-inner">
                        {props.user_bookings.map(booking => {
                            return <Booking data={booking} key={booking.id} />
                        })}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="no-bookings">
                    <div className="no-bookings-container">
                        <FontAwesomeIcon icon={faClock} className="clock" />
                        <p className="no-bookings-message-text">You do not have any bookings.</p>
                    </div>
                </div>
            );
        };
    };

    return (
        <div className="bookings-list">
            <Nav />
            {renderBookings()}
        </div>
    );
};

function mapStateToProps(state) {
    return {
        user_bookings: state.shops.user_bookings,
    };
};

export default connect(mapStateToProps)(BookingsList);  