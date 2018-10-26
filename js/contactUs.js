//console.log(document);
var form = document.getElementById("contactUs");

form.onsubmit = function (e) {
  // stop the regular form submission
  e.preventDefault();

  // collect the form data while iterating over the inputs
  var data = {};
  for (var i = 0, ii = form.length; i < ii; ++i) {
	var input = form[i];
	if (input.name) {
	  data[input.name] = input.value;
	}
  }
  addData(data);
}

function addData(data){
 $.ajax({
		 type: "POST",
		 url: TRADFU_API_SERVER_PATH + "/api/contactUsMessages",
		 data: JSON.stringify(data),
		 contentType: "application/json; charset=utf-8",
		 crossDomain: true,
		 dataType: "json",
		 success: function (data, status, jqXHR) {
			 toastr.success("Message Sent", "Thank you", { "positionClass": "toast-top-full-width", "timeOut": "3000" });
			 document.getElementById("contactUs").style.display = 'none';
		 },

		 error: function (jqXHR, status) {
			 // error handler
			 console.log(jqXHR);
			 toastr.error("Error code: " + status.code, "There has been a problem Submitting your message", { "positionClass": "toast-top-full-width", "timeOut": "3000" });
		 }
	  });
}