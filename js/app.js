$(document).ready(function() {

	$("#next").click(function() {
		var request = $.get("http://api.rabofetada.com/yo-nunca/v1/random");
		request.done(function(data) {
			console.log(data);
			$("#content").text("me he follado a una vaca")
		});
		request.fail(function(error) {
			console.log(error);
			$("#content").text("me he follado a una vaca")
		});
	});

	var audio;
	$("#audio").click(function() {
		if ($("#audio").hasClass("active")) {
			audio.pause();
			audio.currentTime = 0;
			$("#audio").removeClass("active");
		}
		else {
			$("#audio").addClass("active");
			audio = document.createElement('audio');
			var text = "yo nunca " + $("#content").text();
			var q_string = encodeURIComponent(text);
			audio.src ='http://translate.google.com/translate_tts?ie=utf-8&tl=es&q=' + q_string;
			audio.playbackRate = 1.35;
			audio.play();
			audio.addEventListener("ended", function() {
				$("#audio").removeClass("active");
			});
		}
	});

	$("#random").click(function() {
		$("#random").toggleClass("active");
	})
});