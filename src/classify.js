window.api.receive("tweetReturn", (data) => {
  tweetData = data;
  container.innerHTML = data.html;
  if (container.querySelector(".rec").innerHTML == "1") {
    origionalClasses[0] = 1;
    class0.style.backgroundColor = "#1dcaff";
  } else {
    class0.style.backgroundColor = "#33435c";
  }
  if (container.querySelector(".sup").innerHTML == "1") {
    origionalClasses[1] = 1;
    class1.style.backgroundColor = "#1dcaff";
  } else {
    class1.style.backgroundColor = "#33435c";
  }
  if (container.querySelector(".cus").innerHTML == "1") {
    origionalClasses[2] = 1;
    class2.style.backgroundColor = "#1dcaff";
  } else {
    class2.style.backgroundColor = "#33435c";
  }
  if (container.querySelector(".dri").innerHTML == "1") {
    origionalClasses[3] = 1;
    class3.style.backgroundColor = "#1dcaff";
  } else {
    class3.style.backgroundColor = "#33435c";
  }
  if (container.querySelector(".noi").innerHTML == "1") {
    origionalClasses[4] = 1;
    class4.style.backgroundColor = "#1dcaff";
  } else {
    class4.style.backgroundColor = "#33435c";
  }
});

let tweetData,container;
let origionalClasses = [0,0,0,0,0];
let classChanged = [false,false,false,false,false];
let class0, class1, class2, class3, class4;

window.onload = function() {
  container = document.getElementById("container");
  window.api.send("requestTweetInfo");

  let close = document.getElementById("close");
  close.addEventListener("click", function(event) {
    window.api.send("close");
  });

  class0 = document.getElementById("c0");
  class1 = document.getElementById("c1");
  class2 = document.getElementById("c2");
  class3 = document.getElementById("c3");
  class4 = document.getElementById("c4");
  let submit = document.getElementById("submit");

  // window.api.send("submit", returnObj);
  // const returnObj = {
  //   id: tweetData.id,
  //   classifier: "0"
  // }

  class0.addEventListener("click", function(event) {
    if (classChanged[0]) {
      classChanged[0] = false;
    } else {
      classChanged[0] = true;
    }
    if (class0.style.backgroundColor == "rgb(51, 67, 92)") {
      class0.style.backgroundColor = "#1dcaff";
    } else {
      class0.style.backgroundColor = "#33435c";
    }
  });
  class1.addEventListener("click", function(event) {
    if (classChanged[1]) {
      classChanged[1] = false;
    } else {
      classChanged[1] = true;
    }
    console.log(class1.style.backgroundColor);
    if (class1.style.backgroundColor == "rgb(51, 67, 92)") {
      class1.style.backgroundColor = "#1dcaff";
    } else {
      class1.style.backgroundColor = "#33435c";
    }
  });
  class2.addEventListener("click", function(event) {
    if (classChanged[2]) {
      classChanged[2] = false;
    } else {
      classChanged[2] = true;
    }
    if (class2.style.backgroundColor == "rgb(51, 67, 92)") {
      class2.style.backgroundColor = "#1dcaff";
    } else {
      class2.style.backgroundColor = "#33435c";
    }
  });
  class3.addEventListener("click", function(event) {
    if (classChanged[3]) {
      classChanged[3] = false;
    } else {
      classChanged[3] = true;
    }
    if (class3.style.backgroundColor == "rgb(51, 67, 92)") {
      class3.style.backgroundColor = "#1dcaff";
    } else {
      class3.style.backgroundColor = "#33435c";
    }
  });
  class4.addEventListener("click", function(event) {
    if (classChanged[4]) {
      classChanged[4] = false;
    } else {
      classChanged[4] = true;
    }
    if (class4.style.backgroundColor == "rgb(51, 67, 92)") {
      class4.style.backgroundColor = "#1dcaff";
    } else {
      class4.style.backgroundColor = "#33435c";
    }
  });
  submit.addEventListener("click", function(event) {
    let modified = false;
    let returnObj = {};
    if (classChanged[0]) {
      returnObj["recommendations"] = (origionalClasses[0] + 1) % 2;
      modified = true;
    }
    if (classChanged[1]) {
      returnObj["support"] = (origionalClasses[1] + 1) % 2;
      modified = true;
    }
    if (classChanged[2]) {
      returnObj["customer"] = (origionalClasses[2] + 1) % 2;
      modified = true;
    }
    if (classChanged[3]) {
      returnObj["driver"] = (origionalClasses[3] + 1) % 2;
      modified = true;
    }
    if (classChanged[4]) {
      returnObj["noise"] = (origionalClasses[4] + 1) % 2;
      modified = true;
    }

    if (modified) {
      const newData = {
                        id: tweetData.id,
                        data: returnObj
                      }
      window.api.send("submit", newData);
    } else {
      window.api.send("close");
    }

  });
}
