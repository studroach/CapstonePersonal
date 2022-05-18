//load tweets into html
async function requestTweets(classification, override){
  let tweetContainer = document.getElementById("tweetContainer");
  let content = document.getElementById("classSelector");
  toggleBackArrow(override);
  content.style.display = "none";
  tweetContainer.style.display = "block";
  tweetContainer.innerHTML = "<p id='loadingTweets'>Loading...</p>";

  //format request object
  let requestObj;
  if (classification == "none") {
    requestObj = "none";
  } else if (classification == 0) {
    requestObj = {recommendations: 1};
  } else if (classification == 1) {
    requestObj = {support: 1};
  } else if (classification == 2) {
    requestObj = {customer: 1};
  } else if (classification == 3) {
    requestObj = {driver: 1};
  } else if (classification == 4) {
    requestObj = {noise: 1};
  }// else if (classification == 5) {
  //   requestObj = {noise: "1"};
  // }

  //ask the main process to send over the tweets
  window.api.send("toMain", requestObj);
}

function toggleClassifierBtns(){
  let classSelector = document.getElementById("classSelector")
  let tweetContainer = document.getElementById("tweetContainer");
  classSelector.style.display = "flex";
  tweetContainer.style.display = "none";
}

function initClassifierBtns(){
  let recomend = document.getElementById("recomend");
  let support = document.getElementById("support");
  let cComplaints = document.getElementById("cComplaints");
  let dComplaints = document.getElementById("dComplaints");
  let noise = document.getElementById("noise");
  // let noise = document.getElementById("noise");

  tweetContainer.style.height = "80vh";
  tweetContainer.style.display = "none";

  recomend.addEventListener("click", function(event){requestTweets("0", -1)});
  support.addEventListener("click", function(event){requestTweets("1", -1)});
  cComplaints.addEventListener("click", function(event){requestTweets("2", -1)});
  dComplaints.addEventListener("click", function(event){requestTweets("3", -1)});
  noise.addEventListener("click", function(event){requestTweets("4", -1)});
  // noise.addEventListener("click", function(event){requestTweets("5", -1)});
}

function loadTweets(objArray, containerId){
  let container;
  container = document.getElementById("tweetContainer");
  container.innerHTML = "";
  container.style.display = "block";
  objArray.sort((a, b) => (a.created_at < b.created_at) ? 1 : -1);
  objArray.forEach((item) => {
    container.innerHTML += `<div class="tweet">
                              <h3>${item.username}</h3>
                              <p>${item.text}</p>
                              <p>${item.created_at}</p>
                              <p class="id">${item._id}</p>
                              <p class="classifier rec">${item.recommendations}</p>
                              <p class="classifier sup">${item.support}</p>
                              <p class="classifier cus">${item.customer}</p>
                              <p class="classifier dri">${item.driver}</p>
                              <p class="classifier noi">${item.noise}</p>
                            </div>`
  });
  if(containerId == 1){initTweetModify();}
}

function toggleBackArrow(override){
  let returnArrow = document.getElementById("back_arrow");
  if(override == 0){back_arrow.style.top = "-6.1vw";return;}
  if(back_arrow.style.top == "0px"){
    back_arrow.style.top = "-6.1vw";
  }else{
    back_arrow.style.top = "0";
  }

}
