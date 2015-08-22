$(document).ready(function() {

	var host = "http://localhost:5000";//http://api.rabofetada.com/yo-nunca";

	var latest_id = null;

	load_latest();

	$("#next").click(function() {
		if ($("#random").hasClass("active")) {
			var request = $.get(host + "/v1/random");
			request.done(function(data) {
				latest_id = data._id;
				$("#content").text(data.sentence);
			});
			request.fail(function(error) {
				console.log(error);
			});
		}
		else {
			var request = $.get(host + "/v1/next?current_id=" + latest_id);
			request.done(function(data) {
				latest_id = data._id;
				$("#content").text(data.sentence);
			});
			request.fail(function(error) {
				console.log(error);
			});
		}
	});

	$("#audio").click(function() {
		if ($("#audio").hasClass("active")) {
			cancel_audio();
		}
		else {
			$("#audio").addClass("active");
			responsiveVoice.speak("yo nunca " + $("#content").text(), "Spanish Female", {onend: cancel_audio});
		}
	});

	$("#random").click(function() {
		$("#random").toggleClass("active");
	})

	function load_latest() {
		var request = $.get(host + "/v1/latest");
		request.done(function(data) {
			console.log(data);
			$("#content").text(data.sentence);
			latest_id = data._id;
		});
		request.fail(function(error) {
			console.log(error);
		});
	}

	function cancel_audio() {
		responsiveVoice.cancel();
		$("#audio").removeClass("active");
	}

});