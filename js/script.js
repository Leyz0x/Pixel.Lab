// stockage du nombre de clics pour chaque son
let compteurs = {
  sound1: 0,
  sound2: 0,
  sound3: 0,
  sound4: 0
};

// son qui est en train de jouer
let sonActuel = null;
// fonction pour jouer un son
function jouerSon(idSon, nomSon) {
  // si un son est déjà en cours on l'arrête
  if (sonActuel) {
    sonActuel.pause();
    sonActuel.currentTime = 0;
  }

  // on récupère l'élément audio
  let son = document.getElementById(idSon);
  // on remet le son au début
  son.currentTime = 0;
  // on joue le son
  son.play();
  // on stocke le son actuel
  sonActuel = son;
  // on ajoute 1 au compteur
  compteurs[idSon] = compteurs[idSon] + 1;
  // on récupère l'affichage du compteur
  let compteur = document.getElementById("count-" + idSon);
  // on affiche le nombre de clics
  if (compteurs[idSon] === 1) {
    compteur.innerHTML = "1 clic";
  } else {
    compteur.innerHTML = compteurs[idSon] + " clics";
  }
  // on récupère la zone de texte du statut
  let statut = document.getElementById("statut");
  // on affiche le nom du son et le nombre de fois joué
  if (compteurs[idSon] === 1) {
    statut.innerHTML = nomSon + " - 1ère fois";
  } else {
    statut.innerHTML = nomSon + " - " + compteurs[idSon] + " fois";
  }
}

// on récupère tous les boutons
let boutons = document.querySelectorAll(".btn");
// pour chaque bouton on ajoute un clic
boutons.forEach(function (btn) {
  btn.onclick = function () {
    // on récupère l'id du son
    let idSon = btn.getAttribute("data-sound");
    // on récupère le nom du son
    let nomSon = btn.getAttribute("data-nom");
    // on joue le son
    jouerSon(idSon, nomSon);
  };
});

// bouton stop
document.getElementById("btnStop").onclick = function () {
  // si un son est en cours
  if (sonActuel) {
    sonActuel.pause();
    sonActuel.currentTime = 0;
    // on reset le son actuel
    sonActuel = null;
    // on change le texte
    document.getElementById("statut").innerHTML = "son arrêté";
  }
};