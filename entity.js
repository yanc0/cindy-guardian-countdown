const FPS60 = 16;
class Entity {
  constructor(pos, el) {
    this.el = el;
    this.pos = pos;
    this.el.style.left = `${pos.x}px`;
    this.el.style.top = `${pos.y}px`;
    this.cancelAnimation = function () {};
  }
  moveTo(pos, dur, callback = function () {}) {
    this.cancelAnimation();
    const startDate = performance.now();
    const startPos = this.pos;
    const interval = 1;

    var intervalId = setInterval(() => {
      const tickDate = performance.now();
      const elapsedSince = tickDate - startDate;

      const moveCoef = elapsedSince / dur;
      const distX = pos.x - startPos.x;
      const distY = pos.y - startPos.y;

      this.setPosition({
        x: startPos.x + distX * moveCoef,
        y: startPos.y + distY * moveCoef,
      });
    }, interval);

    this.cancelAnimation = function () {
      clearInterval(intervalId);
    };

    setTimeout(() => {
      clearInterval(intervalId);
      callback();
    }, dur);
  }

  rotateAround(target, angleDeg) {
    const radians = (Math.PI / 180) * angleDeg;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const nx =
      cos * (this.pos.x - target.pos.x) +
      sin * (this.pos.y - target.pos.y) +
      target.pos.x;
    const ny =
      cos * (this.pos.y - target.pos.y) -
      sin * (this.pos.x - target.pos.x) +
      target.pos.y;
    this.setPosition({ x: nx, y: ny });
  }

  moveAround(target, rotationSpeed) {
    this.cancelAnimation();
    const startDate = performance.now();
    var lastUpdate = startDate;
    intervalId = setInterval(() => {
      const delta = performance.now() - lastUpdate;
      lastUpdate = performance.now();
      this.rotateAround(target, (rotationSpeed * delta) / 10);
    }, FPS60);

    this.cancelAnimation = function () {
      clearInterval(intervalId);
    };
  }

  setPosition(pos) {
    this.pos = pos;
    this.el.style.left = `${this.pos.x}px`;
    this.el.style.top = `${this.pos.y}px`;
  }

  size() {
    return { x: this.el.clientWidth, y: this.el.clientHeight };
  }
}

function percent(pos) {
  const bodyHeight = document.getElementsByTagName("body")[0].clientHeight;
  const bodyWidth = document.getElementsByTagName("body")[0].clientWidth;
  return { x: (pos.x * bodyWidth) / 100, y: (pos.y * bodyHeight) / 100 };
}

function relativeTo(entity, pos) {
  return { x: entity.pos.x + pos.x, y: entity.pos.y + pos.y };
}

function topOf(entity, pos) {
  return { x: entity.pos.x + pos.x, y: entity.pos.y + pos.y };
}

function rightOf(entity, pos) {
  return {
    x: entity.pos.x + entity.el.clientWidth + pos.x,
    y: entity.pos.y + pos.y,
  };
}

function bottomOf(entity, pos) {
  return {
    x: entity.pos.x + pos.x,
    y: entity.pos.y + entity.el.clientHeight + pos.y,
  };
}

function leftOf(entity, pos) {
  return { x: entity.pos.x + pos.x, y: entity.pos.y + pos.y };
}
