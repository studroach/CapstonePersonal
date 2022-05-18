// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fetch = require('electron-fetch').default;
const { MongoClient } = require('mongodb');
const ObjectID = require('mongodb').ObjectID;
const uri = "mongodb+srv://CapstoneUsers:WhereTips@ml-tweet-db.bgs0y.mongodb.net/DoorDashTweets?retryWrites=true&w=majority";
const client = new MongoClient(uri);

let mainWindow = null;
let win = null;
let editTweet;

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 850,
    webPreferences: {
      preload: path.join(__dirname, 'preload/preload.js')
    },
    icon:"assets/images/DDIcon.png"
  })

  // and load the index.html of the app.
  mainWindow.loadFile('src/index.html')

  //disable menu bar
  //mainWindow.removeMenu();

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on("toMain", (event, args) => {
  //aqire data from DB
  getFilteredData(args).then((responseObj) => {
    // Send result back to renderer process
    responseObj.forEach((item) => {item._id = item._id.toString();});
    event.reply("fromMain", responseObj);
  });
});

ipcMain.on("toServer", (event, args) => {
  console.log("Sending POST to server...");
  fetch('http://localhost:5000/', { method: "POST" });
});

ipcMain.on("window", (event, args) => {
  editTweet = args;
  if(win == null){
    win = new BrowserWindow({
      width: 650,
      height: 420,
      alwaysOnTop: true,
      frame: false,
      webPreferences: {
        preload: path.join(__dirname, 'preload/preloadClass.js'),
      }
    });
    win.on('close', function() { win = null });
    win.loadFile('src/classify.html');
  }
});

ipcMain.on("requestTweetInfo", (event, args) => {
  event.reply("tweetReturn", editTweet);
});

ipcMain.on("close", (event) => {
  win.close();
  win = null;
});

ipcMain.on("submit", (event, args) => {
  win.close();
  win = null;
  alterClass(args);
});

//mongodb connecction and retrieval function
async function getFilteredData(filterObj){//////////////////////////////////////
  try {

    await client.connect();
    const collection = client.db("DoorDashTweets").collection("FinalTweets");

    if (filterObj == "none") {
      filterObj = {recommendations: 0,
                   support: 0,
                   customer: 0,
                   driver: 0,
                   noise: 0};
    }

    const cursor = collection.find(filterObj);
    const result = await cursor.toArray();

    if (result.length > 0) {

      return result;

    } else {console.log("none returned :(");}

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function alterClass(dataObj){/////////////////////////////////////////////
  try {

    await client.connect();
    const collection = client.db("DoorDashTweets").collection("FinalTweets");
    const query = { _id: ObjectID(dataObj.id) }
    const alter = { $set: dataObj.data }
    const cursor = await collection.updateOne(query, alter, function(err, res) {
      if (err) throw err;
      console.log(`${dataObj.id} Updated!`);
      client.close();
    });

  } catch (e) {
    console.error(e);
  }
}
