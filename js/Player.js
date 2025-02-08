import ObjectGraphique from "./ObjectGraphique.js";
import { drawCircleImmediat } from "./utils.js";   

export default class Player extends ObjectGraphique {
    constructor(x, y) {
        super(x, y, 50, 50);
        this.vitesseX = 0;
        this.vitesseY = 0;
        // this.couleur = "black";
        this.angle = 0;
    }


    draw(ctx) {
        ctx.save();
        
        // Déplacement du repère au centre de la tortue
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
    
        // // Fond noir pour voir les collisions
        // ctx.fillStyle = "black";
        // ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
    
        // Corps
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.ellipse(0, 0, this.w / 2, this.h / 3, 0, 0, Math.PI * 2);
        ctx.fill();
    
        // Tête
        ctx.beginPath();
        ctx.arc(this.h/1.6,0, this.w / 6, 0, Math.PI * 2);
        ctx.fill();
    
        // Yeux
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.h/1.6,-this.h/11, this.w / 15, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(this.h/1.6,this.h/11, this.w / 15, 0, Math.PI * 2);
        ctx.fill();
    
        //Pattes
        ctx.fillStyle = "green";
        let pawOffsetX = this.w / 2.5;
        let pawOffsetY = this.h / 3;
        let pawSize = this.w / 6;
    
        ctx.beginPath(); ctx.arc(-pawOffsetX, -pawOffsetY, pawSize, 0, Math.PI * 2); ctx.fill(); 
        ctx.beginPath(); ctx.arc(pawOffsetX, -pawOffsetY, pawSize, 0, Math.PI * 2); ctx.fill(); 
        ctx.beginPath(); ctx.arc(-pawOffsetX, pawOffsetY, pawSize, 0, Math.PI * 2); ctx.fill(); 
        ctx.beginPath(); ctx.arc(pawOffsetX, pawOffsetY, pawSize, 0, Math.PI * 2); ctx.fill(); 
    
        // Queue
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.moveTo(-this.h / 4, 0);  
        ctx.lineTo(-this.w/1.5 , -this.h/8);
        ctx.lineTo(-this.w/1.5, this.h/8);
        ctx.closePath();
        ctx.fill();
    
        ctx.restore();
    }
    
    

    move() {
        this.x += this.vitesseX;
        this.y += this.vitesseY;
    }
}