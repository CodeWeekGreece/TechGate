import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from "@fortawesome/free-solid-svg-icons";

import "./comment.css";


const Comment = props => {

    function renderRating(num) {
        const stars = [];
        [...Array(num)].map((star, id) => {
            stars.push(<FontAwesomeIcon icon={faStar} color="#D9BC00" key={id} />)
        });
        if (stars.length != 5) {
            [...Array(5 - stars.length)].map((star, id) => {
                stars.push(<FontAwesomeIcon icon={faStar} key={id + 5} />)
            });
        };
        return stars;
    };

    return (
        <div className="comment-card">
            <div className="profile-image">

            </div>
            <div className="name-content">
                <div className="name-holder">
                    <div className="name">
                        {props.data.author.username} &nbsp;
                        <span className="time"> 
                            {props.data.time_created.slice(8, 10)}
                            -{props.data.time_created.slice(5, 7)}
                            -{props.data.time_created.slice(0, 4)}
                        </span>
                    </div>
                    <div className="comments-rating">
                        {renderRating(props.data.rating)}
                    </div>
                    {/* <div className="time">
                        {props.data.time_created.slice(8, 10)}-
                        {props.data.time_created.slice(5, 7)}-
                        {props.data.time_created.slice(0, 4)}
                    </div> */}
                    {/* <div className="time">{props.data.time_created.slice(0, 10)}</div> */}
                </div>
                <div className="content-holder">
                    <div className="content">
                        {props.data.content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;