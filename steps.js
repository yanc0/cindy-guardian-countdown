const DEBUG = false;

var entities = {};
var missedClicks = 0;
var uh = new Audio("uh.mp3");
uh.load();

document
  .getElementById("container")
  .addEventListener("click", async function (e) {
    if (e.target.id == "container") {
      missedClicks++;
      document.getElementById(
        "missedClicks"
      ).innerText = `${missedClicks} missed clicks`;

      await uh.play();
    }
  });

var steps = [
  // Step 1
  {
    setup() {
      entities.cindy = newEntity("button", percent({ x: 47, y: 50 }));
      entities.cindy.el.innerText = "Hey there ! I'm cindy :)";
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

      entities.cb1 = newEntity("inputCheckbox", percent({ x: 0, y: 0 }));
      entities.cb1.el.checked = true;

      entities.cb2 = newEntity("inputCheckbox", percent({ x: 0, y: 0 }));
      entities.cb2.el.checked = true;

      entities.cb3 = newEntity("inputCheckbox", percent({ x: 0, y: 0 }));
      entities.cb3.el.checked = true;

      entities.cb4 = newEntity("inputCheckbox", percent({ x: 0, y: 0 }));
      entities.cb4.el.checked = true;

      entities.cb5 = newEntity("inputCheckbox", percent({ x: 0, y: 0 }));
      entities.cb5.el.checked = true;

      entities.cb6 = newEntity("inputCheckbox", percent({ x: 0, y: 0 }));
      entities.cb6.el.checked = true;

      entities.cb7 = newEntity("inputCheckbox", percent({ x: 0, y: 0 }));
      entities.cb7.el.checked = true;

      entities.cb8 = newEntity("inputCheckbox", percent({ x: 0, y: 0 }));
      entities.cb8.el.checked = true;

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
      entities.cb5.el.addEventListener("change", stop(entities.cb5));
      entities.cb6.el.addEventListener("change", stop(entities.cb6));
      entities.cb7.el.addEventListener("change", stop(entities.cb7));
      entities.cb8.el.addEventListener("change", stop(entities.cb8));

      entities.cindy.moveTo(percent({ x: 45, y: 48 }), 180, function () {
        s = entities.cindy.size();
        entities.cb1.moveTo(
          relativeTo(entities.cindy, { x: 60 + s.x, y: 60 + s.y }),
          180
        );
        entities.cb2.moveTo(
          relativeTo(entities.cindy, { x: 40 + s.x, y: 60 + s.y }),
          230
        );
        entities.cb3.moveTo(
          relativeTo(entities.cindy, { x: 100 + s.x, y: 80 + s.y }),
          170
        );
        entities.cb4.moveTo(
          relativeTo(entities.cindy, { x: 60 + s.x, y: 80 + s.y }),
          170
        );
        entities.cb5.moveTo(
          relativeTo(entities.cindy, { x: 190 + s.x, y: 80 + s.y }),
          170
        );
        entities.cb6.moveTo(
          relativeTo(entities.cindy, { x: 60 + s.x, y: 80 + s.y }),
          170
        );
        entities.cb7.moveTo(
          relativeTo(entities.cindy, { x: 60 + s.x, y: 80 + s.y }),
          170
        );
        entities.cb8.moveTo(
          relativeTo(entities.cindy, { x: 24 + s.x, y: 90 + s.y }),
          300,
          () => {
            entities.cindy.moveAround(percent({ x: 50, y: 50 }), 0.3);

            entities.cb1.rotateAround(entities.cindy.center(), 0);
            entities.cb1.moveAroundEntity(entities.cindy, 0.5);
            entities.cb2.rotateAround(entities.cindy.center(), 45);
            entities.cb2.moveAroundEntity(entities.cindy, 0.5);
            entities.cb3.rotateAround(entities.cindy.center(), 90);
            entities.cb3.moveAroundEntity(entities.cindy, 0.5);
            entities.cb4.rotateAround(entities.cindy.center(), 100);
            entities.cb4.moveAroundEntity(entities.cindy, 0.5);
            entities.cb5.rotateAround(entities.cindy.center(), 140);
            entities.cb5.moveAroundEntity(entities.cindy, 0.5);
            entities.cb6.rotateAround(entities.cindy.center(), 150);
            entities.cb6.moveAroundEntity(entities.cindy, 0.5);
            entities.cb7.rotateAround(entities.cindy.center(), 200);
            entities.cb7.moveAroundEntity(entities.cindy, 0.5);
            entities.cb8.rotateAround(entities.cindy.center(), 270);
            entities.cb8.moveAroundEntity(entities.cindy, 0.5);
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
];

var currentStep = 0;
steps[currentStep].setup();

function newEntity(type, pos, id = "") {
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
