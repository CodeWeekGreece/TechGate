import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { deleteBooking } from '../../redux/actions/shopActions';

import "./booking.css";

const Booking = props => {
    const [active, setActive] = useState(true)

    const dispatch = useDispatch();

    useEffect(() => {
        
    }, [dispatch, active])

    function handleDelete() {
        dispatch(deleteBooking(props.data.id));
        setActive(false);
    };

    return (
        <div className="booking">
            <div className="datetime">
                <h1 className="starting-date">{props.data.starting_datetime.slice(11, 16)}</h1>
                <h2 className="ending-date">&nbsp;- {props.data.ending_datetime.slice(11, 16)}</h2>
                <h5 className="shop-name">{props.data.store.name}</h5>
            </div>
            <div className="action-buttons">
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-danger" onClick={handleDelete}>Cancel</button>
            </div>
        </div>
    );
};

export default Booking;