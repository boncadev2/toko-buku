fetch("http://localhost:8080/api/books/laut-bercerita", { headers: { Accept: "application/json" } })
  .then(r => r.json())
  .then(d => console.log(JSON.stringify(d, null, 2)))
  .catch(e => console.error(e));
