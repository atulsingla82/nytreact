// Include react 

import React from 'react';

// Create the child component.

class Form extends React.Component {

constructor(props) {
        super(props);


  this.state = {topic:" ", startYear:"", endYear:""}

}

// These funcitons will respond to the user input.

handleTopicChange(event){

 this.setState({topic:event.target.value});

}
handleStartChange(event){

 this.setState({startYear:event.target.value});

}
handleEndChange(event){

 this.setState({endYear:event.target.value});

}

handleSubmit (event) {

console.log("clicked");
event.preventDefault();

// Set the parent to have the search topic

this.props.setSearch(this.state.topic, this.state.startYear, this.state.endYear);



}

render(){
return(

<div className="panel panel-default">
	<div className="panel-heading">
	  <h3 className= "panel title text-center"> Search </h3>
	</div>
	
	<div className="panel-body text-center">
	   <form onSubmit={this.handleSubmit.bind(this)}>
	   <div className="form-group">
                <h4 className="">
                    <strong> Topic </strong>
                    </h4>	
        <input
             value={this.state.topic}
             type="text"
             className="form-control text-center"
              id="topic"
             onChange={this.handleTopicChange.bind(this)}
             required
              />
              <br/>

         <h4 className="">
                    <strong> Start Year </strong>
                    </h4>	
        <input
             value={this.state.startYear}
             type="text"
             className="form-control text-center"
              id="startYear"
             onChange={this.handleStartChange.bind(this)}
             required
              />
              <br/>
        <h4 className="">
                    <strong> End Year</strong>
                    </h4>	
        <input
             value={this.state.endYear}
             type="text"
             className="form-control text-center"
              id="endYear"
             onChange={this.handleEndChange.bind(this)}
             required
              />
              <br/>
         <button
                className="btn btn-primary"
                    type="submit"
                   
                       >
                        Submit
                           </button>
                        </div>
                    </form>
                </div>
            </div>
        );



}



}
// Export the component back for use in other files
export default Form;