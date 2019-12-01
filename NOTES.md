fetch('http://localhost:3000/trainers')
  .then(resp => resp.json())
  .then(json => console.log(json.data[0]));

  trainer.id for data-id

  "json.data.relationships.trainer.data.id" === "data-trainer-id"

  document.querySelector("[data-id='1']")