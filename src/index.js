function menuToggle(){
  let menu = document.getElementById('barsIcon');
  let card = document.getElementById('card');
  if(menu.innerHTML === "menu"){
    menu.innerHTML = "menu_open";
    menu.style.left = "20vw";
    card.style.left = "0";
  }else{
    menu.innerHTML = "menu";
    menu.style.left = "0";
    card.style.left = "-20.05vw";
  }
}

let rt = true, mct = false, rs = false;

window.onload = function() {

  //sets up communication with main electron process
  window.api.receive("fromMain", (data) => {
    if(rt == true) {
      loadTweets(data, 0);
    }else if(mct = true) {
      loadTweets(data, 1);
    }
  });

  let body = document.getElementById("body");

  let barsIcon = document.getElementById("barsIcon");
  let returnArrow = document.getElementById("back_arrow");

  let manClass = document.getElementById("mct");
  let reviewTweets = document.getElementById("rt");
  let manageData = document.getElementById("md");

  let contentRT = document.getElementById("contentRT");
  let contentMCT = document.getElementById("contentMCT");
  let contentData = document.getElementById("contentMD");

  let tweetContainer = document.getElementById("tweetContainer");

  let classSelector = document.getElementById("classSelector");

  let serverBtn = document.getElementById("serverBtn");

  barsIcon.addEventListener("click", function(event){menuToggle();});

  //if you click out of the drawer when it's open, close the drawer
  body.addEventListener("click", function(event){

    //get cursor x position in terms of vw's
    let cursorX = (event.pageX / self.innerWidth) * 100;

    if(barsIcon.innerHTML === "menu_open" && cursorX > 20){//20vw = open drawer width
      menuToggle();
    }
  });

  //menu button events
  manClass.addEventListener("click", function(event){
    manClass.style.borderBottom = ".3vw solid #fc462b";
    reviewTweets.style.borderBottom = ".3vw solid #33435c";
    manageData.style.borderBottom = ".3vw solid #33435c";
    menuToggle();
    toggleBackArrow(0);
    tweetContainer.style.height = "75vh";
    tweetContainer.style.display = "none";
    contentRT.style.display = "none";
    contentMCT.style.display = "block";
    contentData.style.display = "none";
    window.api.send("toMain", "none");
    document.getElementById("tweetContainer").innerHTML = "<p id='loadingTweets'>Loading...</p>";
    rt = false;
    mct = true;
  });

  reviewTweets.addEventListener("click", function(event){
    manClass.style.borderBottom = ".3vw solid #33435c";
    reviewTweets.style.borderBottom = ".3vw solid #fc462b";
    manageData.style.borderBottom = ".3vw solid #33435c";
    menuToggle();
    toggleBackArrow(0);
    tweetContainer.style.height = "80vh";
    tweetContainer.style.display = "none";
    contentRT.style.display = "block";
    contentMCT.style.display = "none";
    contentData.style.display = "none";
    toggleClassifierBtns();
    rt = true;
    mct = false;
  });

  manageData.addEventListener("click", function(event){
    manClass.style.borderBottom = ".3vw solid #33435c";
    reviewTweets.style.borderBottom = ".3vw solid #33435c";
    manageData.style.borderBottom = ".3vw solid #fc462b";
    menuToggle();
    toggleBackArrow(0);
    tweetContainer.style.height = "0";
    tweetContainer.style.display = "none";
    contentMCT.style.display = "none";
    contentRT.style.display = "none";
    contentData.style.display = "block";
    rt = false;
    mct = false;
  });

  back_arrow.addEventListener("click", function(event){
    toggleClassifierBtns();
    toggleBackArrow(-1);
    classSelector.style.display = "flex";
  });

  serverBtn.addEventListener("click", function(event){
    //server
    window.api.send("toServer", "server");
  });

  //set current menu selection
  reviewTweets.style.borderBottom = ".3vw solid #fc462b";

  //initialize main content
  initClassifierBtns();
  initFilterBtns();
};

function initFilterBtns(){
  let filterN = document.getElementById("classNone");
  let filter0 = document.getElementById("class0");
  let filter1 = document.getElementById("class1");
  let filter2 = document.getElementById("class2");
  let filter3 = document.getElementById("class3");
  let filter4 = document.getElementById("class4");
  // let filter5 = document.getElementById("class5");
  let container = document.getElementById("tweetContainer");

  filterN.addEventListener("click", function(event){
    requestTweets("none", 0);
    container.innerHTML = "<p id='loadingTweets'>Loading...</p>";
  });
  filter0.addEventListener("click", function(event){
    requestTweets("0", 0);
    container.innerHTML = "<p id='loadingTweets'>Loading...</p>";
  });
  filter1.addEventListener("click", function(event){
    requestTweets("1", 0);
    container.innerHTML = "<p id='loadingTweets'>Loading...</p>";
  });
  filter2.addEventListener("click", function(event){
    requestTweets("2", 0);
    container.innerHTML = "<p id='loadingTweets'>Loading...</p>";
  });
  filter3.addEventListener("click", function(event){
    requestTweets("3", 0);
    container.innerHTML = "<p id='loadingTweets'>Loading...</p>";
  });
  filter4.addEventListener("click", function(event){
    requestTweets("4", 0);
    container.innerHTML = "<p id='loadingTweets'>Loading...</p>";
  });
  // filter5.addEventListener("click", function(event){
  //   requestTweets("5", 0)
  //   container.innerHTML = "<p id='loadingTweets'>Loading...</p>";
  // });
}

function initTweetModify(){
  let tweets = document.querySelectorAll("#tweetContainer > .tweet");
  tweets.forEach((item) => {
    item.addEventListener("click", function(event){
      window.api.requestWindow("window", {html: item.innerHTML, id: item.querySelector(".id").innerHTML})
    });
  });

}
