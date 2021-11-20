var rightEyePos = [0, 0];
var leftEyePos = [0, 0];
var rightEarPosition = [0, 0];
var leftEarPosition = [0, 0];
var eyeSize = [35, 15];
var mustache_pos = [0, 0];
var video;

function preload(){
    clown_nose = loadImage("https://i.postimg.cc/7ZBcjDqp/clownnose.png");
    eye_test = loadImage("https://i.ibb.co/nsZWTSt/helixnebula.png");
    other_eye_test = loadImage("https://i.ibb.co/nsZWTSt/helixnebula.png");
    weird_face_thing = loadImage("https://i.ibb.co/Lz0t6V8/beard.png");
}

function setup(){
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500, 500);
    video.hide();

    PoseNet = ml5.poseNet(video, model_loaded);
    PoseNet.on('pose', got_poses);
}

function model_loaded(){
    // console.log("PoseNet initialized");
}

var distance = 0;

function got_poses(results){
    if(results.length > 0){
      // console.log(results);
      noseX = results[0].pose.nose.x - 7.5;
      noseY = results[0].pose.nose.y - 7.5;
      rightEyePos[0] = results[0].pose.rightEye.x - eyeSize[0]/2;
      rightEyePos[1] = results[0].pose.rightEye.y - eyeSize[1]/2;
      leftEyePos[0] = results[0].pose.leftEye.x - eyeSize[0]/2;
      leftEyePos[1] = results[0].pose.leftEye.y - eyeSize[1]/2;
      mustache_pos[1] = noseY + 5;
      rightEarPosition[0] = results[0].pose.rightEar.x;
      leftEarPosition[0] = results[0].pose.leftEar.x;
      // console.log("D:", leftEarPosition[0] - rightEarPosition[0]);
      distance = leftEarPosition[0] - rightEarPosition[0];
    }
}

var newEyeSize = [0, 0];
var focal_length = 0;

var noseX = 0;
var noseY = 0;

var noseXs = 0;
var noseYs = 0;
var m_sizeX;
var m_sizeY;

setInterval(function (){
    if (video.loadedmetadata) {
        noseXs = distance / 4;
        noseYs = distance / 4;
        mustache_pos[0] = noseX - distance/2 + 10;
        eyeSize[0] = distance / 3;
        eyeSize[1] = distance / 5.5;
        m_sizeX = distance;
        m_sizeY = distance;
    }
}, 100);

function draw(){
    image(video, 0, 0, 500, 500);
    image(clown_nose, noseX, noseY, noseXs, noseYs);
    image(weird_face_thing, mustache_pos[0], mustache_pos[1], m_sizeX, m_sizeY);
    image(eye_test, rightEyePos[0], rightEyePos[1], eyeSize[0], eyeSize[1]);
    image(other_eye_test, leftEyePos[0], leftEyePos[1], eyeSize[0], eyeSize[1]);
}


function take_snapshot(){
    save('Clown.png');
}
