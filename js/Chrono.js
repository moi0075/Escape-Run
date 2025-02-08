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
    save(currentLevel) {
        var data = localStorage.getItem("chrono"+currentLevel);
        if(data == null){
            var newData = { bestscore: this.elapsedTime, lastscore: this.elapsedTime };  
            localStorage.setItem("chrono" + currentLevel, JSON.stringify(newData));
        }else{
            var bestscore = JSON.parse(data).bestscore;
            console.log("bestscore ici : "+bestscore)
            if(this.elapsedTime < bestscore){
                var newData = { bestscore: this.elapsedTime, lastscore: this.elapsedTime };  
                localStorage.setItem("chrono" + currentLevel, JSON.stringify(newData));
            }
            if(this.elapsedTime >= bestscore){
                var newData = { bestscore: bestscore, lastscore: this.elapsedTime };  
                localStorage.setItem("chrono" + currentLevel, JSON.stringify(newData));
            }
        }
    }

    //Ecriture les meuilleur scores
    displayScores(){
        //itérer dans le local storage
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i); 
            let value = localStorage.getItem(key);  
            console.log(`${key}: ${value}`);
            var data = JSON.parse(value)
            document.getElementById(key).textContent = "🏆 " + Math.round(data.bestscore/1000) + "s " + " ⏱️ "+Math.round(data.lastscore/1000)+"s";
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
