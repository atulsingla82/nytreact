// Include React
import React from 'react';

// Including the Link component from React Router to navigate within our application without full page reloads
import {Link, Route, BrowserRouter as Router} from 'react-router-dom';

// Include our sub components
import Form from "./children/Form";
import Results from "./children/Results";
import History from "./children/History";

// Helper to make Ajax requests to the NYT API
import helpers from "./utils/helpers";

// Including the Link component from React Router to navigate within our application without full page reloads
// import {Link, Route, BrowserRouter as Router} from 'react-router-dom';


// Creating the Main compement

class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = { search: ["", "", ""], results: [], history: [] }

    }

    // Get history when the page renders


    componentDidMount() {
        // Get the latest history.
        helpers.getHistory().then(function(response) {
            console.log(response);
            if (response !== this.state.history) {
                console.log("History", response.data);
                this.setState({ history: response.data });
            }
        }.bind(this));
    }

    // If the component changes (i.e. if a search is entered)...
    componentDidUpdate() {
        let searchTerm = this.state.search
            // Run the query for the address
        helpers.runQuery(searchTerm[0], searchTerm[1], searchTerm[2]).then(function(data) {
            if (data !== this.state.results) {
                console.log(data);
                this.setState({ results: data });

                // After we've received the result... then post the search term to our history.

                helpers.postHistory(this.state.search).then(function() {
                    console.log("Updated!");

                    // After we've done the post... then get the updated history
                    helpers.getHistory().then(function(response) {
                        console.log("Current History", response.data);

                        console.log("History", response.data);

                        this.setState({ history: response.data });

                    }.bind(this));
                }.bind(this));
            }
        }.bind(this));
    }


    // This function allows children to update the parent.
    setSearch(topic, startYear, endYear) {
        this.setState({ search: topic, startYear, endYear });
    }



    render() {

        return (
            <Router>
            <div className="container">
            <div className = "row">
            <div className = "jumbotron">
            
           <div className="container-fluid">
           <div className="navbar-header">
           <Link to="/">
            <button className="btn btn-default">Home</button>
            </Link>
      <Link to="/Results">
        <button className="btn btn-default">Articles</button>
        </Link>
      <Link to="/History">
        <button className="btn btn-default">Saved</button>
        </Link>
     
     </div>
  </div>

            <h2 className = "text-center"> NY Times: Article Scrubber!</h2>
            <p className = "text-center">
            <em> Search for & annotate articles of interest. </em> 
            </p> 
            </div>

            <div className="row">
              <Route path="/Results" component={Results}/>
              <Route path="/History" component={History}/>
            </div>

            <div className = "col-md-6">

            <Form setSearch = {this.setSearch.bind(this)}/>

            </div>

            <div className = "col-md-6" >

            <Results results = {this.state.results}/>

            </div>

            </div>

            <div className = "col-md-6" >

            <History history = { this.state.history }/>



            </div>

            </div>

    </Router>

        );


    }

}

// Export the component back for use in other files
export default Main;
