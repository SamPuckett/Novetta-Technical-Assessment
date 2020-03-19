// This is the funciton that is called from the html when the button is clicked.
function callBackend() {
  // calls the /api route that is served up to us by our express/node backend
  var url = `/api`;

  // gets the div w/ id='image', which in this case is our image
  var image = document.getElementById('image');

  // gets the image url from the node/express backend and injects it into a <img> html element
  axios
    .get(url)
    .then(response => {
      console.log(response.data);
      image.innerHTML = `<img class='animated zoomIn' src="${response.data}">`;
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
}
