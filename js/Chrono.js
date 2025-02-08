export default class Chrono {
    constructor(displayElement) {
        this.startTime = 0;
        this.elapsedTime = 0;
        this.running = false;
        this.displayElement = displayElement; // Élément HTML où afficher le chrono
    }

    start() {
        if (!this.running) {
            this.startTime = performance.now() - this.elapsedTime;
            this.running = true;
            this.update();
        }
    }

    reset() {
        this.startTime = 0;
        this.elapsedTime = 0;
        this.running = false;
        this.updateDisplay(0); // Affiche 0 dès le départ
    }

    //save dans local storage
    save(currentLevel){
        localStorage.setItem("chrono"+currentLevel, this.elapsedTime);
    }

    //Save min time
    saveMin(currentLevel){
        let minTime = localStorage.getItem("chrono"+currentLevel);
        if(minTime === null || this.elapsedTime < minTime){
            this.save(currentLevel);
        }
    }

    //Ecriture les meuilleur scores
    displayScores(){
        //itérer dans le local storage
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i); 
            let value = localStorage.getItem(key);  
            console.log(`${key}: ${value}`);
            document.getElementById(key).textContent = Math.round(value/1000) + "s";
        }
        
    }

    update() {
        if (!this.running) return;
        
        this.elapsedTime = performance.now() - this.startTime;
        this.updateDisplay(this.elapsedTime);

        requestAnimationFrame(() => this.update());
    }

    updateDisplay(time) {
        const seconds = Math.floor(time / 1000);
        const milliseconds = Math.floor(time % 1000);
        this.displayElement.textContent = `⏱️ ${seconds}.${milliseconds.toString().padStart(3, "0")}s`;
    }
}
