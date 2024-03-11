const ssoTmdbReadApiKey =  // Mettez votre clef API TMDB ici pour que le site fonctionne.

const decobutton = document.getElementById('deconnexion');
const myAccountButton = document.getElementById('myAccount');
const cobutton = document.getElementById('connexion');


// Vérifie si un token est dans l'url, stocke le token et reload la page
window.onload = async() => {

    // Si il l'utilisateur a un session id, le bouton se connecter ne s'affiche plus et les boutons mon profil et déconnexion s'affichent. Si l'utilisateur n'a pas de session id,
    // seul le bouton connexion est affiché.
    if (localStorage.getItem('tmdbSessionId')){
        decobutton.style.display = 'block';
        myAccountButton.style.display = 'block';
        cobutton.style.display = 'none';
    }
    else{
        decobutton.style.display = 'none';
        myAccountButton.style.display = 'none';
        cobutton.style.display = 'block';
    }


    if (!location.search.includes('request_token=')){ // Si l'url ne contient pas "request_token=", ne retourne rien
        return
    }

    // Si le token existe, on le stock
    let token = location.search.split('request_token=')[1]?.split('&')?.[0]// On coupe les éléments pour récuperer le token. Premier élément après le 'request_token', soit le Token.
    
    if (token){
        obtenirNouvelleSession(token) // Instancier une session avec le token.
        .then(donneSession => { // Stock les données de l'utilisateur lors de sa session, si il coupe son navigateur, les données s'effacent.
            localStorage.setItem('tmdbSessionId', donneSession.session_id) // SetItem (cf cour2022) qui garde les infos de la sessions.
            localStorage.setItem('tmdbAccessToken', token) // Setitem qui garde les infos du token.
            location.href = 'http://127.0.0.1:5500'; // Reload en enlevant le token => Mettre le lien, soit avec live serveur  (http : 5500).
        })
        .catch(err => {
            console.error(err); // Log l'erreur
            location.href = 'http://127.0.0.1:5500'; // Relancer le site
        })
    }
}

// Vérifie si un token existe et vérifier s'il est valable

async function redirigerSOO(){
    let doneeToken = await obtenirNouveauToken() // Attendre le résultat pour passer à la suite
    if (!doneeToken.success){
        return alert('Une erreur est survenue et je ne peux pas vous identifier') // Si il n'y a pas de token, retourne une erreur.
    }
    location.href = `https://www.themoviedb.org/authenticate/${doneeToken.request_token}?redirect_to=http://127.0.0.1:5500`; // Si il y a un token, redirige l'utilisateur vers la page index en étant connecté.

}

// Fait une requête a tmdb pour obtenir un token vierge
async function obtenirNouveauToken(){
    const options = {
        method: 'GET',
        headers : {
            accept: 'application/json',
            Authorization: `Bearer ${ssoTmdbReadApiKey}`
        }
    };
    let requeteToken = await fetch('https://api.themoviedb.org/3/authentication/token/new', options).catch(err => console.error('error' + err)); // Récupère la requete du token et le stock dans une variable.
    if (!requeteToken) {
        return
    }

    let doneeToken = await requeteToken.json(); // Récupère le token et le stock dans une variable.
    return doneeToken; 
}

async function obtenirNouvelleSession(token){ // Instancier une session
    const options = {
        method: 'POST', 
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${ssoTmdbReadApiKey}`
        },
        body: JSON.stringify({request_token: token}) // Convertir en string
    };

    let requeteSession = await fetch('https://api.themoviedb.org/3/authentication/session/new', options).catch(err => console.error('error' + err)); // Fait une requête au serveur pour avoir un nouveau session id et le stock dans une variable.
    if (!requeteSession){
        return 
    }
    let donneSession = await requeteSession.json() // Récupère le session id et le stock dans une variable.
    return donneSession;
}

async function deconnexionSession(){
    const options = {
        method: 'DELETE',
        headers: {accept: 'application/json', 'content-type': 'application/json'}
    }; 
    fetch('https://api.themoviedb.org/3/authentication/session', options) // Se déconnecte de la session.
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

cobutton.addEventListener('click', () => {
    redirigerSOO();
});

decobutton.addEventListener('click', () =>{
    deconnexionSession()
    localStorage.removeItem('tmdbSessionId')
    alert("Vous allez être déconnecté")
    location.reload()
})