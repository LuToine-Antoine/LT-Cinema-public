let articleFilm = document.getElementById("film")
let pages =1
async function trendsMovies(){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${ssoTmdbReadApiKey}`
        }
      };

      let requeteDataFilm = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=' + pages, options).catch(err => console.error(err));
      
      let data = await requeteDataFilm.json() 
      for(let i = 0; i < data.results.length; i++){
        let sectionFilm = document.createElement('section');
        let donneFilm = data.results[i]
        let titreFilm = document.createElement('h2')
        let originalName = document.createElement('p')
        let languageFilm = document.createElement('p')
        let dateFilm = document.createElement('p')
        let posterFilm = document.createElement('img')

        let detailsFilm = document.createElement('button')
        let txtButon = document.createTextNode('Plus de détails')
        titreFilm.textContent = donneFilm.title 
        originalName.textContent = 'Titre Original : ' + donneFilm.original_title
        languageFilm.textContent = 'Langue Originale : ' + donneFilm.original_language
        dateFilm.textContent = 'Date de sortie : ' + donneFilm.release_date
        posterFilm.src = `https://image.tmdb.org/t/p/w500/` + donneFilm.poster_path
        
        sectionFilm.appendChild(titreFilm) 
        sectionFilm.appendChild(originalName)
        sectionFilm.appendChild(languageFilm)
        sectionFilm.appendChild(dateFilm)
        sectionFilm.appendChild(posterFilm)
        detailsFilm.appendChild(txtButon)
        sectionFilm.appendChild(detailsFilm)
        detailsFilm.value = donneFilm.id
        articleFilm.appendChild(sectionFilm)

        detailsFilm.addEventListener('click', () => {
          if(localStorage.getItem('tmdbSessionId')){
            document.location.href = "../pages/movie.html"
            sessionStorage.setItem('id_film', donneFilm.id)
          }
          else{
            alert("Accès impossible : Vous devez d'abord vous connecter")
          }
        
        }) 
      }
      pages++
}

trendsMovies()

let seeMoreButton = document.getElementById('seeMoreId')
seeMoreButton.addEventListener('click', () =>{
  trendsMovies()
})

// Ici le code pour avoir l'inifite scroll: Nous avons préferer garder le système de bouton car on trouvait plus d'avantage (esthétique/ accès au footer)

/* const observer = new IntersectionObserver((entries) => {
  if (entries && entries.length > 0 && entries[0].isIntersecting) {
    trendsMovies();
  }
}, { threshold: 1 });


const seeMoreElement = document.getElementById('seeMoreId');
if (seeMoreElement) {
  observer.observe(seeMoreElement);
}
 */