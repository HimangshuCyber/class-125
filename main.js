//Initializing variables
let noseX = 0;
let noseY = 0;
let rightWristX = 0;
let leftWristX = 0;
let difference = 0;

//P5js functions
function preload(){
    //There is nothing here.
}

function setup(){
    video = createCapture(VIDEO);
    video.size(420,520);
    
    canvas = createCanvas(420,420);
    canvas.position(520,300);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('model loaded');
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        //Setting noseX and noseY
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log('Positions of the nose are: X: ' + noseX + ' Y: ' + noseY);

        //Setting rightWristX and leftWristY
        rightWristX = results[0].pose.rightWrist.x;
        leftWristX = results[0].pose.leftWrist.x;
        console.log('Positions of the wrists are: Right: ' + rightWristX + ' Left: ' + leftWristX);

        difference = floor(rightWristX - leftWristX);

        document.getElementById('answer').innerHTML = "The width and height of the square is: "  + difference + "px";
    }
}

function draw(){
    background('#value');
    fill('#fff');
    stroke('#000');
    square(noseX, noseY, difference);
}