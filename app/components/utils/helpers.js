// Include Axios to peform http requests

import axios from 'axios'

// NYT API 

const nytAPI = "6fdc00b45fa24824895ec92f1f45a0ad";

export default {

runQuery(topic,startYear,endYear) {

const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytAPI + "&q="+ topic + "&begin_date=" + startYear + "0101" + "&end_date=" + endYear + "1231";

return axios.get(queryURL).then(function(response){

let results= [];

if (response.data.results[0]) {
        for(let i = 0; i<5; i++){
          results.push(response.data.results[i].formatted);
        }
        console.log(results);
        return results;
      } else{
        // If we don't get any results, return an empty string
        return "No articles found.";
      }
   });

},
getHistory: function(){
    return axios.get('/api/saved');
  },

  postHistory: function(topic){
    return axios.post('/api/saved', {article: topic});
  },

  deleteHistory: function(id){
     return axios.delete('/api/saved/' + id); 
  }



};


