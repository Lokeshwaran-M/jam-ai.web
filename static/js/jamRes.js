// fetch('/audio')
// .then(function (response) {
//     return response.json();
// }).then(function (text) {
//     console.log('GET response:');
//     console.log(text.jamRes); 
// });


async function jamRes() {
    const response = await fetch("/audio");
    const jsonData = await response.json();
    var res = document.getElementById('jamRes');
    console.log(jsonData.jamRes);
    res.innerHTML = jsonData.jamRes;
  }



