const DEBUG = false;

var entities = {};
var missedClicks = 0;
var loveClicks = 0;
document
  .getElementById("container")
  .addEventListener("click", async function (e) {
    if (e.target.id == "container") {
      missedClicks++;
      document.getElementById(
        "missedClicks"
      ).innerText = `${missedClicks} missed clicks`;

      showTemporaryParticles({ x: e.x - 5, y: e.y - 5 });
    }
  });

var steps = [
  // Step 1
  {
    setup() {
      entities.cindy = newEntity("button", percent({ x: 47, y: 50 }));
      entities.cindy.el.innerText = "Hey there ! I'm cindy :)";
      entities.cindy.el.addEventListener("click", (e) => {
        loveClicks++;
        document.getElementById(
          "loveClicks"
        ).innerText = `${loveClicks} love clicks`;
        showHeartParticles(entities.cindy.pos);
      });
    },
    validate(e) {
      return true;
    },
  },
  // Step 2
  {
    setup() {
      entities.cindy.moveTo(percent({ x: 75, y: 5 }), 10000);
      entities.cindy.el.innerText = "Please stop this...";
    },
    validate(e) {
      return true;
    },
  },
  // Step 3
  {
    setup() {
      entities.cindy.moveTo(percent({ x: 5, y: 5 }), 1000);
      entities.cindy.el.innerText = "I said stop...";
    },
    validate(e) {
      return true;
    },
  },
  // Step 4
  {
    setup() {
      entities.textGuardian = newEntity(
        "inputText",
        percent({ x: -10, y: 12 })
      );
      entities.textGuardian.moveTo(percent({ x: 3, y: 12 }), 200);
      entities.textGuardian.el.value = "don't bully my friend !";
      entities.cindy.el.disabled = true;
    },
    validate(e) {
      if (entities.textGuardian.el.value !== "") {
        return false;
      }

      entities.cindy.el.disabled = false;

      if (e.target === entities.cindy.el) {
        return true;
      }

      return false;
    },
  },
  // Step 5
  {
    setup() {
      entities.textGuardian.el.value = "   (x_x')";
      entities.textGuardian.el.disabled = true;

      entities.cindy.el.disabled = true;
      entities.cindy.moveTo(percent({ x: 59, y: 8 }), 600);
      entities.cindy.el.innerText = "oh checkbox, please help me !";

      entities.cb1 = newEntity("inputCheckbox", percent({ x: 61, y: 13 }));
      entities.cb1.el.checked = true;
    },
    validate(e) {
      if (entities.cb1.checked === true) {
        return false;
      }
      entities.cindy.el.disabled = false;

      if (e.target === entities.cindy.el) {
        return true;
      }

      return false;
    },
  },
  // Step 6
  {
    setup() {
      entities.cindy.el.disabled = true;
      entities.cindy.el.innerHTML = "Summoning checkboxes \\o/";

      entities.cb1.el.disabled = true;

      entities.cb1 = newEntity("inputCheckbox", percent({ x: 64, y: -5 }));
      entities.cb1.el.checked = true;

      entities.cb2 = newEntity("inputCheckbox", percent({ x: 105, y: 50 }));
      entities.cb2.el.checked = true;

      entities.cb3 = newEntity("inputCheckbox", percent({ x: 64, y: 105 }));
      entities.cb3.el.checked = true;

      entities.cb4 = newEntity("inputCheckbox", percent({ x: 5, y: 50 }));
      entities.cb4.el.checked = true;

      entities.cindy.moveTo(percent({ x: 56, y: 50 }), 200, function () {
        s = entities.cindy.size;
        entities.cb1.moveTo(topOf(entities.cindy, { x: s.x / 2, y: -45 }), 180);
        entities.cb2.moveTo(rightOf(entities.cindy, { x: 30, y: 0 }), 230);
        entities.cb3.moveTo(
          bottomOf(entities.cindy, { x: s.x / 2, y: 30 }),
          170
        );
        entities.cb4.moveTo(leftOf(entities.cindy, { x: -45, y: 0 }), 300);
      });
    },
    validate(e) {
      if (
        entities.cb1.el.checked === true ||
        entities.cb2.el.checked === true ||
        entities.cb3.el.checked === true ||
        entities.cb4.el.checked === true
      ) {
        return false;
      }
      entities.cindy.el.disabled = false;

      if (e.target === entities.cindy.el) {
        return true;
      }

      return false;
    },
  },
  // Step 7
  {
    setup() {
      entities.cindy.el.disabled = true;
      entities.cindy.el.innerHTML = "Heeeeelp \\o/";

      entities.cb1.el.disabled = true;
      entities.cb2.el.disabled = true;
      entities.cb3.el.disabled = true;
      entities.cb4.el.disabled = true;

      entities.cb1 = newEntity("inputCheckbox", percent({ x: 0, y: 0 }));
      entities.cb1.el.checked = true;

      entities.cb2 = newEntity("inputCheckbox", percent({ x: 0, y: 0 }));
      entities.cb2.el.checked = true;

      entities.cb3 = newEntity("inputCheckbox", percent({ x: 0, y: 0 }));
      entities.cb3.el.checked = true;

      entities.cb4 = newEntity("inputCheckbox", percent({ x: 0, y: 0 }));
      entities.cb4.el.checked = true;

      function stop(entity) {
        return function (e) {
          entity.cancelAnimation();
          entity.el.disabled = true;
        };
      }

      entities.cb1.el.addEventListener("change", stop(entities.cb1));
      entities.cb2.el.addEventListener("change", stop(entities.cb2));
      entities.cb3.el.addEventListener("change", stop(entities.cb3));
      entities.cb4.el.addEventListener("change", stop(entities.cb4));

      entities.cindy.moveTo(percent({ x: 25, y: 60 }), 180, function () {
        s = entities.cindy.size();
        entities.cb1.moveTo(
          relativeTo(entities.cindy, { x: 30 + s.x, y: 30 + s.y }),
          180
        );
        entities.cb2.moveTo(
          relativeTo(entities.cindy, { x: 30 + s.x, y: 30 + s.y }),
          230
        );
        entities.cb3.moveTo(
          relativeTo(entities.cindy, { x: 30 + s.x, y: 30 + s.y }),
          170
        );
        entities.cb4.moveTo(
          relativeTo(entities.cindy, { x: 30 + s.x, y: 30 + s.y }),
          300,
          () => {
            entities.cb1.rotateAround(entities.cindy.center(), 0);
            entities.cb1.moveAround(entities.cindy.center(), 0.5);
            entities.cb2.rotateAround(entities.cindy.center(), 90);
            entities.cb2.moveAround(entities.cindy.center(), 0.5);
            entities.cb3.rotateAround(entities.cindy.center(), 180);
            entities.cb3.moveAround(entities.cindy.center(), 0.5);
            entities.cb4.rotateAround(entities.cindy.center(), 270);
            entities.cb4.moveAround(entities.cindy.center(), 0.5);
          }
        );
      });
    },
    validate(e) {
      if (
        entities.cb1.el.checked === true ||
        entities.cb2.el.checked === true ||
        entities.cb3.el.checked === true ||
        entities.cb4.el.checked === true
      ) {
        return false;
      }
      entities.cindy.el.disabled = false;

      if (e.target === entities.cindy.el) {
        return true;
      }

      return false;
    },
  },
  // Step 8
  {
    setup() {
      entities.cindy.el.disabled = true;
      entities.cindy.el.innerHTML = "Heeeeelp \\o/";

      var cbs = [];
      for (var i = 0; i < 8; i++) {
        cbs[i] = newEntity("inputCheckbox");
        cbs[i].el.checked = true;
        cbs[i].el.addEventListener("change", stop(cbs[i]));
      }

      function stop(entity) {
        return function (e) {
          entity.cancelAnimation();
          entity.el.disabled = true;
        };
      }

      entities.cindy.moveTo(percent({ x: 45, y: 48 }), 180, function () {
        s = entities.cindy.size();
        cbs[0].moveTo(
          relativeTo(entities.cindy, { x: 60 + s.x, y: 60 + s.y }),
          180
        );
        cbs[1].moveTo(
          relativeTo(entities.cindy, { x: 40 + s.x, y: 60 + s.y }),
          230
        );
        cbs[2].moveTo(
          relativeTo(entities.cindy, { x: 100 + s.x, y: 80 + s.y }),
          170
        );
        cbs[3].moveTo(
          relativeTo(entities.cindy, { x: 60 + s.x, y: 80 + s.y }),
          170
        );
        cbs[4].moveTo(
          relativeTo(entities.cindy, { x: 190 + s.x, y: 80 + s.y }),
          170
        );
        cbs[5].moveTo(
          relativeTo(entities.cindy, { x: 60 + s.x, y: 80 + s.y }),
          170
        );
        cbs[6].moveTo(
          relativeTo(entities.cindy, { x: 60 + s.x, y: 80 + s.y }),
          170
        );
        cbs[7].moveTo(
          relativeTo(entities.cindy, { x: 24 + s.x, y: 90 + s.y }),
          300,
          () => {
            entities.cindy.moveAround(percent({ x: 50, y: 50 }), 0.3);

            cbs[0].rotateAround(entities.cindy.center(), 0);
            cbs[0].moveAroundEntity(entities.cindy, -0.5);
            cbs[1].rotateAround(entities.cindy.center(), 45);
            cbs[1].moveAroundEntity(entities.cindy, 0.5);
            cbs[2].rotateAround(entities.cindy.center(), 90);
            cbs[2].moveAroundEntity(entities.cindy, -0.5);
            cbs[3].rotateAround(entities.cindy.center(), 100);
            cbs[3].moveAroundEntity(entities.cindy, 0.5);
            cbs[4].rotateAround(entities.cindy.center(), 140);
            cbs[4].moveAroundEntity(entities.cindy, -0.5);
            cbs[5].rotateAround(entities.cindy.center(), 150);
            cbs[5].moveAroundEntity(entities.cindy, 0.5);
            cbs[6].rotateAround(entities.cindy.center(), 200);
            cbs[6].moveAroundEntity(entities.cindy, -0.5);
            cbs[7].rotateAround(entities.cindy.center(), 270);
            cbs[7].moveAroundEntity(entities.cindy, 0.5);
          }
        );
      });
      entities.cbs = cbs;
    },
    validate(e) {
      for (var i = 0; i < entities.cbs.length; i++) {
        if (entities.cbs[i] === true) {
          return false;
        }
      }
      entities.cindy.el.disabled = false;

      if (e.target === entities.cindy.el) {
        // Win !!
        entities.cindy.cancelAnimation();
        entities.cindy.el.innerHTML = "I love you <3";
        return true;
      }

      return false;
    },
  },
];

var currentStep = 0;
steps[currentStep].setup();

function newEntity(type, pos = { x: 0, y: 0 }, id = "") {
  switch (type) {
    case "button":
      var el = document.createElement("button");
      el.addEventListener("click", function (e) {
        notifyChange(e);
      });
      break;

    case "inputText":
      var el = document.createElement("input");
      el.type = "text";
      el.addEventListener("keyup", function (e) {
        notifyChange(e);
      });
      break;

    case "inputCheckbox":
      var el = document.createElement("input");
      el.type = "checkbox";
      el.addEventListener("change", function (e) {
        notifyChange(e);
      });
      break;
  }

  var entity = new Entity(pos, el);
  if (id !== "") el.id = id;
  document.getElementById("container").appendChild(entity.el);
  return entity;
}

notifyChange = function (e) {
  if (steps[currentStep].validate(e) && currentStep < steps.length - 1) {
    currentStep++;
    steps[currentStep].setup();
  }
};

if (document.URL.startsWith("file://") && DEBUG) {
  notifyChange = function (e) {
    currentStep++;
    steps[currentStep].setup();
  };

  document.getElementsByTagName("body")[0].addEventListener("click", (e) => {
    notifyChange(e);
  });
}

function createBlock(pos, w, h, color) {
  var block = document.createElement("div");
  block.style.left = pos.x + "px";
  block.style.top = pos.y + "px";
  block.style.width = w + "px";
  block.style.height = h + "px";
  block.style.backgroundColor = color;
  document.getElementById("container").appendChild(block);
  return block;
}

function showHeartParticles(pos) {
  var heart = document.createElement("div");
  heart.style.left = pos.x + 25 + "px";
  heart.style.top = pos.y - 50 + "px";
  heart.style.width = "10px";
  heart.style.height = "10px";
  heart.style.color = "#DE3163";
  heart.style.fontSize = "3em";
  heart.innerText = "♥";
  document.getElementById("container").appendChild(heart);

  var rand = (Math.random() - 0.5) * 10;

  const spinningAnimation = [
    { transform: `translateY(-60px) translateX(${rand}px) scale(1)` },
  ];

  const timing = {
    duration: 400,
    iterations: 1,
  };

  heart.animate(spinningAnimation, timing).addEventListener("finish", () => {
    heart.remove();
  });
}

function showTemporaryParticles(pos) {
  function rand() {
    return (Math.random() - 0.5) * 10;
  }
  var blocks = [
    createBlock(pos, 10, 10, "#7F00FF"),
    createBlock({ x: pos.x + rand(), y: pos.y + rand() }, 5, 5, "#7F00FF"),
    createBlock({ x: pos.x + rand(), y: pos.y + rand() }, 5, 5, "#9F00EE"),
    createBlock({ x: pos.x + rand(), y: pos.y + rand() }, 4, 4, "#AF00DD"),
  ];
  const blockSpinning = [
    { transform: "rotate(0) scale(1)" },
    { transform: "rotate(360deg) scale(0)" },
  ];

  const blockTiming = {
    duration: 400,
    iterations: 1,
  };

  blocks.forEach((block) => {
    var anim = block.animate(blockSpinning, blockTiming);
    anim.addEventListener("finish", () => {
      block.remove();
    });
  });
}

// function drawHeart() {
//   var block = document.createElement("div");
//   block.style.left = "50px";
//   block.style.
//
// }
//
// drawHeart()
