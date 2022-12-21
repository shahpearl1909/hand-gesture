prediction_1="";
prediction_2="";
Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");
function snap_pic(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>'
    });
}
console.log("ml5.version", ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/J2QBy6I3h/model.json", modelLoaded);
function modelLoaded(){
    console.log("model loaded");
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1="Prediction one is"+prediction_1;
    speak_data_2="Prediction two is"+prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

 function gotResult(error, results){
    if (error){
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("name_emotion").innerHTML=results[0].label;
        document.getElementById("name_emotion2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if (results[0].label=="Thumbs Up"){
        document.getElementById("p_emoji").innerHTML="&#x1F44D;";
        }
        if (results[0].label=="Clapping Your Hands"){
            document.getElementById("p_emoji").innerHTML="&#x1F44F";
            }
        if (results[0].label=="Peace Sign"){
            document.getElementById("p_emoji").innerHTML="&#x270C;";
            }
        if (results[0].label=="Thumbs Down"){
            document.getElementById("p_emoji").innerHTML="&#x1F44E;";
            }
            
            if (results[1].label=="Thumbs Up"){
                document.getElementById("p_emoji2").innerHTML="&#x1F44D;";
                }
                if (results[1].label=="Clapping Your Hands"){
                    document.getElementById("p_emoji2").innerHTML="&#x1F44F";
                    }
                if (results[1].label=="Peace Sign"){
                    document.getElementById("p_emoji2").innerHTML="&#x270C;";
                    }
                if (results[1].label=="Thumbs Down"){
                    document.getElementById("p_emoji2").innerHTML="&#x1F44E;";
                    }
    }
 }