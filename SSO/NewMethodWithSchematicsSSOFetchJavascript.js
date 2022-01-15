function loginFailed(){
	alert('Silahkan login melalui Schematics terlebih dahulu');
	location.href = 'https://schematics.its.ac.id/dashboard/signin';
}

function loginError(){
	alert('Akun anda belum terdaftar di portal Schematics NPC 2021.\nPastikan akun anda sudah terverifikasi dan mohon menunggu beberapa saat lagi untuk sinkronisasi data.\nTerima kasih.');
}

function tryLogin(){
	try {
		const domjudgeLogin = document.location.origin + "/login";
		const domjudgeKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InN5YWZpcWpvc0BnbWFpbC5jb20iLCJuYW1lIjoiQWhtYWQgU3lhZmlxIEFxaWwgV2FmaSIsInBob25lIjoiKzYyODU2MzA2NTgxNiIsInVzZXJfcm9sZSI6InVzZXIiLCJleHAiOjE2MzEyOTU4MDh9.5RvW2ObIfX5FvwOtxafX3iubB4MPXluy_jNSXiUhaPY";
		const domjudgePass = "aGFydXRtYXJ1dA==";

		let formData = new FormData();
		formData.append('loginmethod', 'xheaders');

		const response = fetch(domjudgeLogin,
		{
			headers: {
			  "X-DOMjudge-Login": domjudgeKey,
			  "X-DOMjudge-Pass": domjudgePass
			},
			method: "POST",
			body: formData,
			mode: 'same-origin'
		}).then(function(response) { 
			return response.text();
		}).then((html) => {
			if (html.match('"__INVALID__"') === null){
				location.reload();
			} else {
				loginFailed();
			}
		}).catch((err) => {
			console.log(err);

			loginError();
		});

		console.log('sapi');
	} catch(e) {
		console.log('error :');
		console.log(e);

		loginError();
	}
}