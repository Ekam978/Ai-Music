music1 = "";
music2 = "";

music1_status ="";
music2_status = "";

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function preload() 
{
	music1 = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}

function setup() 
{
	canvas = createCanvas(400,400);
	canvas.center();
	
	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video , modelLoaded);
	poseNet.on('pose' , gotPoses);
}

function modelLoaded() 
{
	console.log('Posenet Is Initialised!');
}

function gotPoses(results) 
{
	if (results.length > 0) 
	{
		console.log(results);		
		scoreRightWrist = results[0].pose.keypoints[10].score;
		scoreLeftWrist = results[0].pose.keypoints[9].score;
		console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

		rightWristX =  results[0].pose.rightWrist.x;
		rightWristY =  results[0].pose.rightWrist.y;
		console.log("Right wrist X position is " + rightWristX + " Right wrist Y position is " + rightWristY);
	
		leftWristX =  results[0].pose.leftWrist.x;
		leftWristY =  results[0].pose.leftWrist.y;
		console.log("Left wrist X position is " + leftWristX + " Left wrist Y position is " + leftWristY);
	}
}

function draw() {
    image(video,0,0,400,400);

	music1_status = music1.isPlaying();
	music2_status = music2.isPlaying();

	fill("#800080");
	stroke("#800080");
	if (scoreLeftWrist > 0.2) {
		circle(leftWristX,leftWristY,20);
	    music2.stop();
		if (music1_status == false) {
			music1.play();
			document.getElementById("play_button").innerHTML = "Playing : Harry Potter Theme Song" ;
		}
	}if (scoreRightWrist > 0.2) {
		circle(rightWristX,rightWristY,20);
	    music1.stop();
		if (music2_status == false) {
			music2.play();
			document.getElementById("play_button").innerHTML = "Playing : Peter Pan Song" ;
		}
	}
}
function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}
