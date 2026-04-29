// variables du jeu
let cookies = 0; // nombre total de cookies
let cps = 0; // cookies gagnés automatiquement par seconde
let clic = 1; // valeur d'un clic

// prix des améliorations
let prix = {
  mamie: 10, // prix mamie
  ferme: 50, // prix ferme
  mine: 200, // prix mine
  usine: 1000, // prix usine
  clic3: 30, // prix clic x3
  clic10: 300, // prix clic x10
  clic50: 2000 // prix clic x50
};

// met à jour l'affichage à l'écran
function update() {
  // affiche le nombre de cookies arrondi
  document.getElementById("score").textContent = Math.floor(cookies) + " cookies";
  // affiche les cookies par seconde
  document.getElementById("cps").textContent = cps + " / sec";
  // affiche la valeur d'un clic
  document.getElementById("puissance").textContent = "1 clic = " + clic;
  // vérifie chaque bouton pour voir si on peut acheter
  for (let item in prix) {
    let btn = document.getElementById("btn-" + item);
    // si le bouton existe
    if (btn) {
      // désactive si pas assez de cookies
      btn.disabled = cookies < prix[item];
    }
  }
}

// quand on clique sur le cookie
document.getElementById("cookieBtn").onclick = () => {
  // ajoute la valeur du clic
  cookies += clic;
  // met à jour l'écran
  update();
};

// fonction pour acheter un item
function acheter(nom, gainCPS = 0, nouveauClic = null) {
  // vérifie si on a assez de cookies
  if (cookies >= prix[nom]) {
    // enlève le prix
    cookies -= prix[nom];
    // ajoute des cookies par seconde si besoin
    if (gainCPS > 0) cps += gainCPS;
    // change la valeur du clic si besoin
    if (nouveauClic !== null) clic = nouveauClic;
    // augmente le prix pour la prochaine fois
    prix[nom] = Math.floor(prix[nom] * 1.5);
    // met à jour le prix affiché
    document.getElementById("prix-" + nom).textContent = "Prix : " + prix[nom];
    // met à jour l'affichage général
    update();
  }
}

// boutons des achats
document.getElementById("btn-mamie").onclick = () => acheter("mamie", 1); // mamie ajoute cps
document.getElementById("btn-ferme").onclick = () => acheter("ferme", 5); // ferme ajoute cps
document.getElementById("btn-mine").onclick = () => acheter("mine", 20); // mine ajoute cps
document.getElementById("btn-usine").onclick = () => acheter("usine", 100); // usine ajoute cps

// upgrades du clic
document.getElementById("btn-clic3").onclick = () => acheter("clic3", 0, 3); // clic x3
document.getElementById("btn-clic10").onclick = () => acheter("clic10", 0, 10); // clic x10
document.getElementById("btn-clic50").onclick = () => acheter("clic50", 0, 50); // clic x50

// ajoute les cookies automatiquement chaque seconde
setInterval(() => {
  // ajoute les cps au total
  cookies += cps;
  // met à jour l'affichage
  update();
}, 1000);