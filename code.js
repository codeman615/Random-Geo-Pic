(() => {
	
	function constructImageURL(photoObj) {
		return "https://farm" + photoObj.farm +
		".staticflickr.com/" + photoObj.server +
		"/" + photoObj.id + "_" + photoObj.secret + ".jpg";
	}
	
	const message = document.querySelector('#message');
	
	// check if the Geolocation API is supported
	if (!navigator.geolocation) {
		message.textContent = `Your browser doesn't support Geolocation`;
		message.classList.add('error');
		return;
	}
	
	// handle click event
	const btn = document.querySelector('#show');
	btn.addEventListener('click', function () {
		// get the current position
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	});

	//Image index
	let currentImg = 0;

	//nextImage
	function nextImage(arrayPhotos){
		if(currentImg >= arrayPhotos.length - 1){
			currentImg = 0;
		} else {
			currentImg++;
		}
		imageUrl = constructImageURL(arrayPhotos[currentImg])
		img.src = imageUrl;

	}

	// handle success case
	function onSuccess(position) {
		const {
			latitude,
			longitude
		} = position.coords;

		message.classList.add('success');
		message.textContent = `Your location: (${latitude},${longitude})`;

		//flickr params
		const api_key = "67e280f07c71cd407855d9f10fae7c0d";
		const lat = latitude;
		const lon = longitude;
		const text = "dog";

		fetch(`https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=
		${api_key}&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&
		lat=${lat}&lon=${lon}&text=${text}`)
			.then((response) => response.json())
			.then(data => {
				console.log(data)
				let arrayPhotos = data.photos.photo;
				console.log(arrayPhotos)
				const img = document.querySelector("img");
				
				//create an array of images
				const imageUrl = constructImageURL(arrayPhotos[0]);
				img.src = imageUrl;

				//Next image button
				const btn = document.querySelector("#button");
				btn.addEventListener("click", () => nextImage(arrayPhotos))
			})


	}

	// handle error case
	function onError() {
		message.classList.add('error');
		message.textContent = `Failed to get your location!`;
	}


})();
