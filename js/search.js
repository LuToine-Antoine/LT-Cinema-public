let articleFilm = document.getElementById("film")
let pageActuelle = 1
async function searchMovie(){
    const options = {
    method: 'GET', 
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ssoTmdbReadApiKey}`
  }};
  articleFilm.innerHTML = ""; //Permet d'éffacer les élements quand on précise la recherche

  let recherche = document.getElementById("searchInput").value

  let requeteDesDonne =  await fetch('https://api.themoviedb.org/3/search/movie?query='+recherche+'&include_adult=true&language=en-US&page='+pageActuelle, options).catch(err => console.error(err));


  if(!requeteDesDonne){
    return 
  }
  else {
    // Récupérer les données de l'api
    let donneeRecup = await requeteDesDonne.json()

    //Afficher les résultats
    for(let i = 0; i < donneeRecup.results.length; i++){
      let sectionFilm = document.createElement('section');
      let donneFilm = donneeRecup.results[i]
      let titreFilm = document.createElement('h2')
      let originalName = document.createElement('p')
      let dateFilm = document.createElement('p')
      let posterFilm = document.createElement('img')

      let detailsFilm = document.createElement('button')
      let txtButon = document.createTextNode('Plus de détails')
      titreFilm.textContent = donneFilm.title 
      originalName.textContent = 'Titre Original : ' + donneFilm.original_title
      dateFilm.textContent = 'Date de sortie : ' + donneFilm.release_date
      posterFilm.src = `https://image.tmdb.org/t/p/w500/` + donneFilm.poster_path
      
      sectionFilm.appendChild(titreFilm) 
      sectionFilm.appendChild(originalName)
      sectionFilm.appendChild(dateFilm)
      sectionFilm.appendChild(posterFilm)
      detailsFilm.appendChild(txtButon)
      sectionFilm.appendChild(detailsFilm)
      detailsFilm.value = donneFilm.id
      articleFilm.appendChild(sectionFilm)

      //Aller vers les détails du film 
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

  return donneeRecup

}}

