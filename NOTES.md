fetch('http://localhost:3000/trainers')
  .then(resp => resp.json())
  .then(json => console.log(json.data[0]));

  trainer.id for data-id

  "json.data.relationships.trainer.data.id" === "data-trainer-id"

  document.querySelector("[data-id='1']")

  const cards = document.querySelectorAll("div.card")
  cards.forEach(trainer => {
    const ul = trainer.querySelector("ul")

  })

  <div class="card" data-id="1"><p>Prince</p>
        <button data-trainer-id="1">Add Pokemon</button>
        <ul>
          <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
          <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
          <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
          <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
          <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
        </ul>
      </div>

      alert('clicked!')

      event.path[""0""].dataset.trainerId