import React from "react";

import Nav from "../../components/nav/nav";

import "./api-doc.css";

const ApiDoc = (props) => {
    const Methods = ({props}) => {
        return (
            <div className="methods">
                {props.map(method => {
                    return <div className="method">{method}</div>
                })}
            </div>
        );
    };

    return (
        <div className="api-doc">
            <Nav />
            <div className="content">
                <h1>Bookify API Documentation</h1>
                <div className="text-container">

                    <section className="category">
                        {/* <h2>Users</h2> */}
                        <p></p>
                    </section>

                    <section className="category">
                        <h2>Stores</h2>

                        <section className="sub-category">
                            <h4>/stores/</h4>
                            <Methods props={["GET", "POST", "DELETE", "PUT", "PATCH"]} />
                            <p>GET: Returns a list of all the stores in the database. Append <code>/&#60;int:id&#62;/</code> to retrieve a shop.</p>
                            <p>Filters: </p>
                            <p>POST: Create new shop.</p>
                            <p>DELETE: Delete an existing shop.</p>
                            <p>PUT: Override all data in an existing shop.</p>
                            <p>PATCH: Modify specific fields of an existing shop.</p>
                        </section>

                        <hr />

                        <section className="sub-category">
                            <h4>/comments/</h4>
                            <Methods props={["GET", "POST", "DELETE", "PUT", "PATCH"]} />
                            <p>GET: Returns a list of all the comments in the database. Append <code>/&#60;int:id&#62;/</code> to retrieve a comment.</p>
                            <p>Filters: </p>
                            <p>POST: Create new comment.</p>
                            <p>DELETE: Delete an existing comment.</p>
                            <p>PUT: Override all data in an existing comment.</p>
                            <p>PATCH: Modify specific fields of an existing comment.</p>
                        </section>

                        <hr />

                        <section className="sub-category">
                            <h4>/favourites/</h4>
                            <Methods props={["GET", "POST", "DELETE", "PUT", "PATCH"]} />
                            <p>GET: Returns a list of all the favourites in the database. Append <code>/&#60;int:id&#62;/</code> to retrieve a favourite.</p>
                            <p>Filters: </p>
                            <p>POST: Create new favourite.</p>
                            <p>DELETE: Delete an existing favourite.</p>
                            <p>PUT: Override all data in an existing favourite.</p>
                            <p>PATCH: Modify specific fields of an existing favourite.</p>
                        </section>

                        <hr />

                    </section>

                </div>
            </div>
        </div>
    );
};

export default ApiDoc;
