$(document).ready(() => {
   
   $('#searchForm').on('submit', (e) => {
         let searchText= $('#searchText').val();
         getMovies(searchText);
         e.preventDefault();
   });
});
   function getMovies(searchText) {
   	axios.get('http://www.omdbapi.com/?s='+searchText+'&apikey=fbf1a85a&s=')
   	.then((response) =>{
        console.log(response);
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index,movie)=>{
        output += `
              <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
          
        `;
        });
        $('#movies').html(output);
   	})
   	.catch((err) =>{
   		console.log(err);
   	});
   }

   function movieSelected(id){
    sessionStorage.setItem('movieId',id);
    window.location='movie.html';
    return false;
   }

   function getMovie(){
                   let movieId = sessionStorage.getItem('movieId');
                   axios.get('http://www.omdbapi.com/?i='+movieId+'&apikey=fbf1a85a&s=')
   	               .then((response) =>{
   	               	let rs = response.data;

                   let output =`
        <div class="row">
          <div class="col-md-4">
            <img src="${rs.Poster}" class="img-thumbnail">
          </div>
            <div class="col-md-8">
              <h2>${rs.Title}</h2>
              <ul class="list-group">
                <li class="list-group-item"><strong>Genre:</strong> ${rs.Genre}</li>
                <li class="list-group-item"><strong>Released:</strong> ${rs.Released}</li>
                <li class="list-group-item"><strong>Rated:</strong> ${rs.Rated}</li>
                <li class="list-group-item"><strong>IMDB Rating:</strong> ${rs.imdbRating}</li>
                <li class="list-group-item"><strong>Director:</strong> ${rs.Director}</li>
                <li class="list-group-item"><strong>Writer:</strong> ${rs.Writer}</li>
                <li class="list-group-item"><strong>Actors:</strong> ${rs.Actors}</li>  
              </ul>  
            </div>  
           </div>  
                      
           <div class="row">  
            <div class="container">  

              <h3>Plot</h3>  
              ${rs.Plot}  
              <hr>  
              <a href="http://imdb.com/title/${rs.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
              <a href="index.html" class="btn btn-secondary">Go Back To Search</a>  
            </div>  
           </div>  
      `;  

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
