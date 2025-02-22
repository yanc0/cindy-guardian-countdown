class Entity {
    constructor(x, y, el) {
        this.el = el;
        this.x = x;
        this.y = y;

        this.el.style.left =  `${x}vw`;
        this.el.style.top =  `${y}vh`;
    }
    moveTo(x, y, dur) {
        const startDate = performance.now();
        const shouldEndDate = startDate + dur;
        const startX = this.x;
        const startY = this.y;
        const interval = 1;
        const nbIter = dur / interval;

        var intervalId = setInterval(() => {
            const tickDate = performance.now();
            const elapsedSince = tickDate - startDate;

            const moveCoef = elapsedSince / dur;
            const distX = x - startX;
            const distY = y - startY;

            this.setX(startX + distX * moveCoef);
            this.setY(startY + distY * moveCoef);
        }, interval);

        setTimeout(() => {
            clearInterval(intervalId);
            console.log("interval null");
        }, dur);
    }

    placeAround(target, angleDeg) {
        // const angleDeg = performance.now() % 360;
        // const angleDeg = Date.now() % 360;
        const radians = (Math.PI / 180) * angleDeg;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        const nx = (cos * (this.x - target.x)) + (sin * (this.y - target.y)) + target.x;
        const ny = (cos * (this.y - target.y)) - (sin * (this.x - target.x)) + target.y;
        this.setX(nx);
        this.setY(ny);
    }

    moveAround(target, speed, angleOffset = 0) {
       setInterval(() => {
            const angleDeg = speed * (angleOffset + performance.now()) % 360 / 100;
            this.placeAround(target, angleDeg);
        }, 20)
    }

    setX(x) {
        this.x = x;
        this.el.style.left = `${this.x}vw`;
    }
    setY(y) {
        this.y = y;
        this.el.style.top = `${this.y}vh`;
    }
}
