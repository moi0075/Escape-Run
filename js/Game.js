import Player from "./Player.js";
import Chrono from "./Chrono.js";
import Obstacle from "./Obstacle.js";
import Sortie from "./Sortie.js";
import Trap from "./Trap.js";
import DynamiqueTrap from "./DynamiqueTrap.js";
import { rectsOverlap } from "./collisions.js";
import { initListeners } from "./ecouteurs.js";

export default class Game {
    objetsGraphiques = [];
    currentLevel = 1;
    maxLevel = 4;

    constructor(canvas) {
        this.canvas = canvas;
        // etat du clavier
        this.inputStates = {
            mouseX: 0,
            mouseY: 0,
        };

        this.initLevelButtons();

        //pour avoir les fps
        this.lastFrameTime = performance.now();
        this.fps = 0;
    }

    async init(canvas) {
        // Créer le joueur
        this.player = new Player(100, 100);

        // Créer le chrono
        this.chrono = new Chrono(document.getElementById("chrono"));


        this.ctx = this.canvas.getContext("2d");
        this.loadLevel(this.currentLevel);

        // On initialise les écouteurs de touches, souris, etc.
        initListeners(this.inputStates, this.canvas);

        console.log("Game initialisé");
    }

    initLevelButtons() {
        for(let i = 1; i <= this.maxLevel; i++) {
            const button = document.getElementById(`level${i}`);
            button.addEventListener('click', () => {
                this.loadLevel(i);
                this.currentLevel = i;
            });
        }
    }

    loadLevel(level) {
        // Vider les objets existants
        this.objetsGraphiques = [];

        // A voir si je ne créer pas plein d'object player et chrono à chaque fois
        // Créer le joueur
        this.player.x = 100;
        this.player.y = 100;
        this.objetsGraphiques.push(this.player);
        

        //Créer le chrono et mettree à jours les temps
        this.chrono.reset();
        this.chrono.start();
        this.chrono.displayScores()

        // Mettre à jour le texte du niveau
        console.log("Chargement du niveau", level);
        const levelDisplay = document.getElementById("levelDisplay");
        levelDisplay.textContent = `Level ${level}`;

        
        switch(level) {
            //Niveau :
            case 1:
                this.objetsGraphiques.push(new Obstacle(0, 200, 600, 40, "#957564"));
                this.objetsGraphiques.push(new Obstacle(200, 400, 600, 40, "#957564"));
                this.objetsGraphiques.push(new Obstacle(0, 600, 600, 40, "#957564"));
                this.objetsGraphiques.push(new Sortie(100, 700, 30, 30, "green"));
                break;
            case 2:
                this.objetsGraphiques.push(new Obstacle(200, 0, 40, 600, "#957564"));
                this.objetsGraphiques.push(new Trap(200, 600, 40, 80, "#EE6060"));
                this.objetsGraphiques.push(new Obstacle(400, 200, 40, 600, "#957564"));
                this.objetsGraphiques.push(new Trap(400, 120, 40, 80, "#EE6060"));
                this.objetsGraphiques.push(new Obstacle(600, 0, 40, 600, "#957564"));
                this.objetsGraphiques.push(new Trap(600, 600, 40, 80, "#EE6060"));
                this.objetsGraphiques.push(new Sortie(700, 100, 30, 30, "green"));
                break;
            case 3:
                this.objetsGraphiques.push(new Obstacle(200, 0, 40, 500, "#957564"));
                this.objetsGraphiques.push(new Obstacle(200, 700, 40, 100, "#957564"));
                this.objetsGraphiques.push(new DynamiqueTrap(200, 500, 200, 660, 40, 40, "#EE6060", 0.008, 0, 0, 0));
                this.objetsGraphiques.push(new Obstacle(400, 0, 40, 100, "#957564"));
                this.objetsGraphiques.push(new Obstacle(400, 300, 40, 500, "#957564"));
                this.objetsGraphiques.push(new DynamiqueTrap(400, 260, 400, 100, 40, 40, "#EE6060", 0.008, 0, 0, 0));
                this.objetsGraphiques.push(new Obstacle(600, 0, 40, 500, "#957564"));
                this.objetsGraphiques.push(new Obstacle(600, 700, 40, 100, "#957564"));
                this.objetsGraphiques.push(new DynamiqueTrap(600, 500, 600, 660, 40, 40, "#EE6060", 0.008, 0, 0, 0));
                this.objetsGraphiques.push(new Sortie(700, 100, 30, 30, "green"));
                break;
            case 4:
                this.objetsGraphiques.push(new Obstacle(0, 200, 700, 40, "#957564"));
                this.objetsGraphiques.push(new DynamiqueTrap(200, 0, 200, 160, 113, 40, "#EE6060", 0.008, 0, 0, 0));
                this.objetsGraphiques.push(new DynamiqueTrap(393, 160, 393, 0, 113, 40, "#EE6060", 0.008, 0, 0, 0));
                this.objetsGraphiques.push(new DynamiqueTrap(587, 0, 587, 160, 113, 40, "#EE6060", 0.008, 0, 0, 0));
                this.objetsGraphiques.push(new Obstacle(200, 400, 700, 40, "#957564"));
                this.objetsGraphiques.push(new DynamiqueTrap(200, 240, 200, 360, 113, 40, "#EE6060", 0.008, 0, 0, 0));
                this.objetsGraphiques.push(new DynamiqueTrap(393, 360, 393, 240, 113, 40, "#EE6060", 0.008, 0, 0, 0));
                this.objetsGraphiques.push(new DynamiqueTrap(587, 240, 587, 360, 113, 40, "#EE6060", 0.008, 0, 0, 0));
                this.objetsGraphiques.push(new Obstacle(0, 600, 700, 40, "#957564"));
                this.objetsGraphiques.push(new DynamiqueTrap(200, 440, 200, 560, 113, 40, "#EE6060", 0.008, 0, 0, 0));
                this.objetsGraphiques.push(new DynamiqueTrap(393, 560, 393, 440, 113, 40, "#EE6060", 0.008, 0, 0, 0));
                this.objetsGraphiques.push(new DynamiqueTrap(587, 440, 587, 560, 113, 40, "#EE6060", 0.008, 0, 0, 0));
                this.objetsGraphiques.push(new Sortie(100, 700, 30, 30, "green"));
                
        }
    }

    updateFPS() {
        const now = performance.now();
        const deltaTime = now - this.lastFrameTime;

        if (deltaTime > 0) {
            this.fps = Math.min(60, Math.round(1000 / deltaTime)); // Limite à 60 FPS max
        } else {
            this.fps = 60; // Sécurité en cas de division par zéro
        }
    
        // Affichage des FPS
        document.getElementById('fpsCounter').textContent = `FPS: ${this.fps}`;
    }

    start() {
        console.log("Game démarré");

        // On démarre une animation à 60 images par seconde
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    mainAnimationLoop() {
        const now = performance.now();
        const deltaTime = now - this.lastFrameTime;
    
        if (deltaTime >= 16.67) { // Environ 60 FPS (1s / 60 = 16.67ms) car sur pc 144hz le perso se dééplace plus vite sinon
            this.lastFrameTime = now;
    
            // 1 - Efface le canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
            // 2 - Dessine tous les objets du jeu
            this.drawAllObjects();
    
            // 3 - Met à jour le jeu (mouvement, collisions, etc.)
            this.update();
        }
    
        // 4 - Demande une nouvelle frame
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    drawAllObjects() {
        // Dessine tous les objets du jeu
        this.objetsGraphiques.forEach(obj => {
            obj.draw(this.ctx);
        });
    }

    update() {
        // Appelée par mainAnimationLoop
        // donc tous les 1/60 de seconde
        // Affichage des fps
        this.updateFPS();

        // Déplacement du joueur et teste les collision ainsi que la sotie
        this.movePlayer();

        //Piège dynamique animation
        this.objetsGraphiques.forEach(obj => {
            if (obj instanceof DynamiqueTrap) {
                obj.update();
            }
        });
    }

    movePlayer() {
        const playerSpeed = 7;
        this.player.vitesseX = 0;
        this.player.vitesseY = 0;
        
        // Diagonal movement
        if(this.inputStates.ArrowRight && this.inputStates.ArrowDown) {
            this.player.angle = Math.PI/4;
            this.player.vitesseX = playerSpeed * Math.cos(Math.PI/4);
            this.player.vitesseY = playerSpeed * Math.cos(Math.PI/4);
        } 
        else if(this.inputStates.ArrowRight && this.inputStates.ArrowUp) {
            this.player.angle = -Math.PI/4;
            this.player.vitesseX = playerSpeed * Math.cos(Math.PI/4);
            this.player.vitesseY = -playerSpeed * Math.cos(Math.PI/4);
        }
        else if(this.inputStates.ArrowLeft && this.inputStates.ArrowDown) {
            this.player.angle = 3*Math.PI/4;
            this.player.vitesseX = -playerSpeed * Math.cos(Math.PI/4);
            this.player.vitesseY = playerSpeed * Math.cos(Math.PI/4);
        }
        else if(this.inputStates.ArrowLeft && this.inputStates.ArrowUp) {
            this.player.angle = -3*Math.PI/4;
            this.player.vitesseX = -playerSpeed * Math.cos(Math.PI/4);
            this.player.vitesseY = -playerSpeed * Math.cos(Math.PI/4);
        }
        // Regular movement
        else if(this.inputStates.ArrowRight) {
            this.player.angle = 0;
            this.player.vitesseX = playerSpeed;
        } 
        else if(this.inputStates.ArrowLeft) {
            this.player.angle = Math.PI;
            this.player.vitesseX = -playerSpeed;
        } 
        else if(this.inputStates.ArrowUp) {
            this.player.angle = -Math.PI/2;
            this.player.vitesseY = -playerSpeed;
        } 
        else if(this.inputStates.ArrowDown) {
            this.player.angle = Math.PI/2;
            this.player.vitesseY = playerSpeed;
        } 

        this.player.move();
        this.testCollisionsPlayer();
    }
    testCollisionsPlayer() {
        // Teste collision avec les bords du canvas
        this.testCollisionPlayerBordsEcran();

        // Teste collision avec les obstacles
        this.testCollisionPlayerObstacles();
       
    }

    testCollisionPlayerBordsEcran() {
        // Raoppel : le x, y du joueur est en son centre, pas dans le coin en haut à gauche!
        if(this.player.x - this.player.w/2 < 0) {
            // On stoppe le joueur
            this.player.vitesseX = 0;
            // on le remet au point de contaxct
            this.player.x = this.player.w/2;
        }
        if(this.player.x + this.player.w/2 > this.canvas.width) {
            this.player.vitesseX = 0;
            // on le remet au point de contact
            this.player.x = this.canvas.width - this.player.w/2;
        }

        if(this.player.y - this.player.h/2 < 0) {
            this.player.y = this.player.h/2;
            this.player.vitesseY = 0;

        }
       
        if(this.player.y + this.player.h/2 > this.canvas.height) {
            this.player.vitesseY = 0;
            this.player.y = this.canvas.height - this.player.h/2;
        }
    }

    testCollisionPlayerObstacles() {
        const pushBack = 0; // Distance supplémentaire pour repousser le joueur
        //pour le  moment on ne fait rien car pas de pb de collision

        this.objetsGraphiques.forEach(obj => {
            //Obstacle
            if (obj instanceof Obstacle) {
                if (rectsOverlap(
                    this.player.x - this.player.w / 2, this.player.y - this.player.h / 2, this.player.w, this.player.h,
                    obj.x, obj.y, obj.w, obj.h)) {
    
                    console.log("Collision avec obstacle");
    
                    // Vérifie la direction de la collision
                    let playerLeft = this.player.x - this.player.w / 2;
                    let playerRight = this.player.x + this.player.w / 2;
                    let playerTop = this.player.y - this.player.h / 2;
                    let playerBottom = this.player.y + this.player.h / 2;
    
                    let objLeft = obj.x;
                    let objRight = obj.x + obj.w;
                    let objTop = obj.y;
                    let objBottom = obj.y + obj.h;
    
                    let overlapLeft = playerRight - objLeft;
                    let overlapRight = objRight - playerLeft;
                    let overlapTop = playerBottom - objTop;
                    let overlapBottom = objBottom - playerTop;
    
                    let minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
    
                    if (minOverlap === overlapLeft) {
                        this.player.x = objLeft - this.player.w / 2 - pushBack; // Repousse à gauche
                    } else if (minOverlap === overlapRight) {
                        this.player.x = objRight + this.player.w / 2 + pushBack; // Repousse à droite
                    } else if (minOverlap === overlapTop) {
                        this.player.y = objTop - this.player.h / 2 - pushBack; // Repousse en haut
                    } else if (minOverlap === overlapBottom) {
                        this.player.y = objBottom + this.player.h / 2 + pushBack; // Repousse en bas
                    }
                    //Je vois pas l'intéret de cette ligne
                    // this.player.vitesseX = 0;
                    // this.player.vitesseY = 0;
                }
            }

            //Piège
            if(obj instanceof Trap) {
                if(rectsOverlap(this.player.x-this.player.w/2, this.player.y - this.player.h/2, this.player.w, this.player.h, obj.x, obj.y, obj.w, obj.h)) {
                    console.log("Piège you lose");
                    // Recharger le niveau actuel
                    this.loadLevel(this.currentLevel);
                }
            }

            //Sortie
            // On regarde si le joueur a atteint la sortie
            // TODO
            if(obj instanceof Sortie) {
                if(rectsOverlap(this.player.x-this.player.w/2, this.player.y - this.player.h/2, this.player.w, this.player.h, obj.x, obj.y, obj.w, obj.h)) {
                    //sauvgarder le temps
                    this.chrono.save(this.currentLevel);

                    if(this.currentLevel < this.maxLevel) {
                        console.log("Sortie atteinte");
                        this.currentLevel +=1;
                        this.loadLevel(this.currentLevel);
                    }else {
                        console.log("Bravo vous avez terminé le jeu");
                        this.currentLevel = 1;
                        this.loadLevel(this.currentLevel);
                    }
                }
            }
        });
    }
    

}