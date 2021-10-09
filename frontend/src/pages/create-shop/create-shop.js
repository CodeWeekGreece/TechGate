import { useState } from "react";
import { connect, useDispatch } from "react-redux";

import Nav from "../../components/nav/nav";
import { createShop } from "../../redux/actions/shopActions";

import "./create-shop.css";

const CreateShop = props => {
    const [fields, setField] = useState({ staff: [], admins:[], submited: false })

    const dispatch = useDispatch();

    function handleChange(event) {
        setField({ ...fields, [event.target.name]: event.target.value });
        console.log(fields)
    };

    function handleSubmit() {
        window.event.preventDefault();
        dispatch(createShop(fields));
        setField({
            ...fields,
            submited: true,
        });
    };

    return (
        <div className="create-shop">
            <Nav />
            <h1>Register your Shop</h1>
            <div className="form-container">
                <form method="post">
                    <div className="name-container">
                        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
                    </div>
                    <div className="address-container">
                        <input type="text" name="address" placeholder="Address" onChange={handleChange} />
                    </div>
                    <div className="phone-number-container">
                        <input type="text" name="phone_number" placeholder="Phone Number" onChange={handleChange} />
                    </div>
                    <div className="images-container">
                        <input type="text" name="images_url" placeholder="Images URL" onChange={handleChange} />
                    </div>
                    <div className="price-range-container">
                        <input type="number" name="price_range" max={3} min={1} placeholder="Price Range" onChange={handleChange} />
                    </div>
                    <div className="time-range">
                        <div className="phone-number-container">
                            <input type="text" name="opening_time" placeholder="Opening Time" onChange={handleChange} />
                            <input type="text" name="closing_time" placeholder="Closing Time" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="location">
                        <input type="text" name="location" placeholder="location" />
                    </div>
                    <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {};
};

export default connect(mapStateToProps)(CreateShop);