// import react 

import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import helpers from "../utils/helpers";



class History extends React.Component {



 handleDelete () {

helpers.deleteHistory(event.target.value).then(function(response){

console.log("article deleted");


}.bind(this));

}

// Render the function

render () {

return(

<div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title text-center">History</h3>
                </div>

                <div className="panel-body text-center">

            {/* Here we use a map function to loop through an array in JSX */}

            {this.props.history.map(function(search,i){

           return(
          <li key={search._id}>
          <strong><a href={search.web_url} className="left-align" target="_blank">{search.title}</a></strong>
                    
                  <span>
                    <button className = "btn btn-primary" onClick={search.handleDelete} value={search._id}>Remove</button>
                  </span>
                </li>
             )

             })}

                </div>
                </div>
            )

}
    

}

export default History;


