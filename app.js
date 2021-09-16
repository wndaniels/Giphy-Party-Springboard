const $gifs = $("#gifs");
const $searchInput = $("#search");
const $apiKey = "t0HAPZlm1ndFt42QNduu0OaM6xWi7YnJ";

function addGif(res) {
  let results = res.data.length;
  if (results) {
    let randomIndex = Math.floor(Math.random() * results);
    let $newCol = $("<div>", { class: "col-sm-4 col-12 mb-4" });
    let $newGif = $("<img>", {
      src: res.data[randomIndex].images.original.url,
      class: "w-100",
    });
    $newCol.append($newGif);
    $gifs.append($newCol);
  }
}

$("#form-body").on("submit", async function (e) {
  e.preventDefault();

  let $search = $searchInput.val();
  $searchInput.val("");

  const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
    params: { q: $search, api_key: $apiKey },
  });
  addGif(response.data);
});

$("#clear").on("click", function () {
  $gifs.empty();
});
