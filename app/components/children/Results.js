// Include React
import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
// Helper to make Ajax requests to the NYT API
import helpers from "../utils/helpers";

// Creating the results component

class Results extends React.Component {

    

    handleSave() {

        helpers.postSaved(article).then(function(response) {

            console.log("article saved");

        }.bind(this));

    }


    render() {

        return (

            <div className = "panel panel-default">
            <div className = "panel-heading">
            <h3 className = "panel-title text center" > Results </h3> </div> <div className = "panel-body text-center"> 
        { /* Here we use a map function to loop through an array in JSX */ } {
                this.props.results.map(function(search, i) {
                    return ( 

                        <li key = { search._id }>
                        <strong> 
                        <a href = { search.web_url }
                        className= "left-align"
                        target = "_blank" > { search.title } </a>
                        </strong>
                        <i> { search.date.substring(0, 10) } </i> <span >
                        <button className = "btn btn-primary"
                        onClick = { this.handleSave }
                        value = { search._id } > Save </button> 
                        </span> 
                        </li>
                    );
                })

            } 
            </div> 
            </div>
        )
    };

}
export default Results;
