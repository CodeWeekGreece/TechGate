import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";

import { createBooking, fetchBookings } from "../../redux/actions/shopActions";

import { Calendar as CalendarComp } from "react-calendar";

import 'react-calendar/dist/Calendar.css';
import "./calendar.css";

const Calendar = props => {
    const [book, setBook] = useState({ starting_datetime: null, ending_datetime: null, store: props.id });
    const [date, changeDate] = useState(new Date());
    const [bookings, setBookings] = useState({ data: [] });
    const [dailyBookings, setDailyBookings] = useState({ data: [] });

    const dispatch = useDispatch();

    useEffect(() => {
        getBookings();
        setupBooking();
    }, [date, props.bookings]);
    
    function setupBooking() {
        // YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MMZ
        const fixDay = `${`${date}`.slice(8, 10)}`;
        const newDate = `${`${date.toISOString()}`.slice(0, 8)}${fixDay}${`${date.toISOString()}`.slice(10)}`; // fix wrong day bug
        setBook({
            ...book,
            starting_datetime: newDate,
            ending_datetime: newDate,
        });
        // console.log(dailyBookings);
        // booking_datetime: "2021-09-25T13:57:20Z"

        const daily_bookings = [];
        for (let i in bookings.data) {
            if (bookings.data[i].starting_datetime.slice(0, 11) === newDate.slice(0, 11)) {
                daily_bookings.push(bookings.data[i]);
            };
        };
        setDailyBookings({
            data: daily_bookings,
        });
    };

    function handleChangeTime(event) {
        if (event.target.className === "starting-time") {
            setBook({
                ...book,
                starting_datetime: `${book.starting_datetime.slice(0, 11)}${event.target.value}:00.000Z`,
            });
        } else if (event.target.className === "ending-time") {
            setBook({
                ...book,
                ending_datetime: `${book.ending_datetime.slice(0, 11)}${event.target.value}:00.000Z`,
            });
        };
    };

    function getBookings() {
        if (props.bookings.length === 0) {
            dispatch(fetchBookings(props.id));
        } else {
            setBookings({ data: props.bookings[0] });
        };
    };

    function renderBookings() {
        return dailyBookings.data.map(booking => {
            return (
                <>
                    <p>{booking.id}</p>
                    <p>{booking.booking_datetime}</p>
                </>
            );
        });
    };

    function handleBookingSubmit() {
        window.event.preventDefault();
        dispatch(createBooking(book));
    };

    return (
        <div className="calendar">
            <CalendarComp 
                onChange={changeDate}
                value={date} 
            />

            <div className="time-holder">
                <div className="start">
                    <label htmlFor="starting-time">Starting Time: </label>
                    <input type="time" maxLength={5} placeholder="Starting Time" className="starting-time" onChange={handleChangeTime} />
                </div>
                <div className="end">
                    <label htmlFor="ending-time">Ending Time: </label>
                    <input type="time" maxLength={5} placeholder="Ending Time" className="ending-time" onChange={handleChangeTime} />
                </div>
            </div>

            {/* {book.starting_datetime} <br />
            {book.ending_datetime} */}
            <button onClick={handleBookingSubmit} className="btn btn-primary">Book</button>
            {/* {renderBookings()} */}
        </div>
    );
};

function mapStateToProps(state) {
    return {
        bookings: state.shops.bookings,
    };
};

export default connect(mapStateToProps)(Calendar);