import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

import "./alerts.css";


export default class Alert extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            display: "flex",
        };

        this.dissappear = this.dissappear.bind(this);
    };

    dissappear() {
        this.setState({
            display: "none",
        });
    };

    render() {
        return (
            <div className={"alert alert-" + this.props.type} style={ {display: this.state.display} }>
                <div dangerouslySetInnerHTML={{__html: this.props.message}} />
                <FontAwesomeIcon icon={faWindowClose} onClick={this.dissappear} className="close-icon" />
            </div>
        );
    };
};
