var ff;



function submitfile() {

	var formData = new FormData();
	formData.append('file', ff);
	console.log(ff);

	$.ajax({
		url: "http://54.245.102.89:8080/upload_photo?id=aaa&path=test.jpg",
		type: "POST",
		data: formData,
		cache: false,
		contentType: false,
		processData: false,
		success: function() {
			console.log('uploaded');
		},
		error: function(err) {
			console.log('error uploading');
		}
	});
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);
document.getElementById('submit').addEventListener('click', submitfile, false);