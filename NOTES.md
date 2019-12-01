fetch('http://localhost:3000/trainers')
  .then(resp => resp.json())
  .then(json => console.log(json.data[0]));