import Trap from "./Trap.js";

export default class DynamiqueTrap extends Trap {
    constructor(x1, y1, x2, y2, w, h, couleur, vitesse, t0, t1, t2) {
        super(x1, y1, w, h, couleur);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.vitesse = vitesse;
        this.t0 = t0; //commencer après x millisecond
        this.t1 = t1; //temps attente départ
        this.t2 = t2; //temps attente retour

        this.t = 0; // Paramètre t pour la position sur la droite
        this.direction = 1; // 1 pour aller de x1,y1 à x2,y2, -1 pour l'inverse
        this.startTime = Date.now(); // Enregistre l'heure actuelle en millisecondes
        this.isWaiting = false; // État d'attente
        this.waitStartTime = 0; // Moment où l'attente a commencé
    }

    update() {
        const elapsedTime = Date.now() - this.startTime; // Temps écoulé depuis le début de l'animation

        // Si le temps initial t0 n'est pas encore écoulé, on attend
        if (elapsedTime < this.t0) {
            return;
        }

        // Si on est en attente
        if (this.isWaiting) {
            const waitTime = Date.now() - this.waitStartTime;
            const waitDuration = this.direction === 1 ? this.t1 : this.t2;
            
            // Si le temps d'attente est écoulé
            if (waitTime >= waitDuration) {
                this.isWaiting = false;
                this.direction *= -1; // Inverse la direction
            }
            return;
        }

        // Calcul des nouvelles coordonnées en fonction du paramètre t
        this.x = this.x1 + this.t * (this.x2 - this.x1);
        this.y = this.y1 + this.t * (this.y2 - this.y1);

        // Met à jour le paramètre t pour le prochain mouvement
        this.t += this.vitesse * this.direction;

        // Si on a atteint la fin de la ligne, on commence l'attente
        if (this.t >= 1 || this.t <= 0) {
            this.isWaiting = true;
            this.waitStartTime = Date.now();
        }
    }
}