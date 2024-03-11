async function reviewsMovies(){

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${ssoTmdbReadApiKey}`
        }
        };

        requeteReview = await fetch('https://api.themoviedb.org/3/movie/' + sessionStorage.getItem('id_film')+'/reviews?language=en-US&page=1', options).catch(err => console.error(err));
        let donneRequeteReview = await requeteReview.json()
        
        if(donneRequeteReview){
            for(let i = 0; i < donneRequeteReview.results.length; i++){
                let donneReview = donneRequeteReview.results[i]
                let partieReview = document.getElementById('review')
                let laReview = document.createElement('section')
                let photoProfil = document.createElement('img')
                let pseudo = document.createElement('h3')
                let commentaireText = document.createElement('p')
                let publishDate = document.createElement('p')
                let updateDate = document.createElement('p')
                if(donneReview.rating){
                    let note = document.createElement('p')
                    note.textContent = donneReview.rating
                    laReview.appendChild(note)
                }

                pseudo.textContent = donneReview.author
                laReview.appendChild(pseudo)

                if(donneReview.author_details.avatar_path){
                    photoProfil.src = `https://image.tmdb.org/t/p/w500/${donneReview.author_details.avatar_path}`
                    laReview.appendChild(photoProfil)
                }

                commentaireText.textContent = donneReview.content
                laReview.appendChild(commentaireText)

                publishDate.textContent = 'Créer le : ' + donneReview.created_at
                laReview.appendChild(publishDate)
                
                updateDate.textContent = 'Modifié le : ' + donneReview.updated_at
                laReview.appendChild(updateDate)
                partieReview.appendChild(laReview)

    }
}
}
reviewsMovies()