let articleFilm = document.getElementById("film")


async function movieById() {

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${ssoTmdbReadApiKey}`
        }
      };

      // Requêtes auprès de l'api TMDB.
      let requeteDataFilm = await fetch('https://api.themoviedb.org/3/movie/' + sessionStorage.getItem('id_film')+'?language=en-US', options).catch(err => console.error(err));
      let requeteProfil = await fetch('https://api.themoviedb.org/3/account/null', options).catch(err => console.error(err));

      // Récupération des données du film.
      let donneFilm = await requeteDataFilm.json();
      let titrePage = document.getElementById('title');
      let resume = document.getElementById('synopsis');
      let buttonSend = document.getElementById('sendCom');
        
      // Section des films et ses caractèristiques.
      let sectionFilm = document.createElement('section');
      let titreFilm = document.createElement('h1');
      let dateFilm = document.createElement('p');
      let posterFilm = document.createElement('img');
      let resumeText = document.createElement('p');
      titrePage.textContent = 'LT-Movies | ' + donneFilm.title;
      resumeText.textContent = donneFilm.overview;
      titreFilm.textContent = donneFilm.title;
      dateFilm.textContent = donneFilm.release_date;
      posterFilm.src = `https://image.tmdb.org/t/p/w500/` + donneFilm.poster_path;
  
      resume.appendChild(resumeText);
      sectionFilm.appendChild(titreFilm);
      sectionFilm.appendChild(dateFilm);
      sectionFilm.appendChild(posterFilm);
      articleFilm.appendChild(sectionFilm);

      
      // Récupération des données du profil.
      let dataProfil = await requeteProfil.json();
      
      function addComment(commentaire){
        let date1 = new Date().toLocaleDateString();
        let partie_Commentaire = document.getElementsByClassName('partieCommentaire')[0]
        let sectionCommentaire = document.createElement('section')
        let pseudo = document.createElement('h3')
        let commentaireText = document.createElement('p')
        let publishDate = document.createElement('p')

        publishDate.textContent = date1
        if(dataProfil.avatar_path){
          let photoProfil = document.createElement('img')
          photoProfil.src = `https://image.tmdb.org/t/p/w500/${dataProfil.avatar_path}`
          sectionCommentaire.appendChild(photoProfil);
        }
        pseudo.textContent = '-- ' + dataProfil.username + ' (Vous)' + ' --' 
        commentaireText.textContent = commentaire

        sectionCommentaire.appendChild(pseudo);
        sectionCommentaire.appendChild(commentaireText)
        sectionCommentaire.appendChild(publishDate);
        partie_Commentaire.appendChild(sectionCommentaire)
      }

      buttonSend.addEventListener('click', () => {
        let commentaire = document.getElementById('commentaire_test').value;
        localStorage.setItem("txt_commentaire", commentaire)
        addComment(commentaire)

      }) 
      if(localStorage.getItem("txt_commentaire")){
        let localComment = localStorage.getItem("txt_commentaire")
        addComment(localComment)
      }

      return donneFilm;

}


movieById()