const DEBUG = false;

var entities = {
  container: document.getElementById("container"),
};

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
        entities.cb1.el.checked &&
        entities.cb2.el.checked &&
        entities.cb3.el.checked &&
        entities.cb4.el.checked
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
  console.log(pos);
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
  entities.container.appendChild(entity.el);
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
    console.log("new");
    currentStep++;
    steps[currentStep].setup();
  };

  document.getElementsByTagName("body")[0].addEventListener("click", (e) => {
    notifyChange(e);
  });
}
