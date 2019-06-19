var c_t, c_b, c_s, turn = true, game_end = false;
window.addEventListener("load", function (e) {
  c_t = document.getElementsByTagName("TABLE")[0];
  c_b = Array.from(c_t.getElementsByTagName("TABLE"), x => x.parentElement);
  c_s = Array.from(c_b, x => x.getElementsByTagName("TD"));
  function getListener(i, j) { return function (e) { uttt(i, j); }; }
  for (let i = 0; i < 9; ++i)for (let j = 0; j < 9; ++j)c_s[i][j].addEventListener("click", getListener(i, j));

  if('serviceWorker' in navigator)navigator.serviceWorker.register('service-worker.js')
});

function test(arr, color) {
  for (let i of [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]])
    if (arr[i[0]].style.backgroundColor == color && arr[i[1]].style.backgroundColor == color && arr[i[2]].style.backgroundColor == color) return true;
  return false;
}

function uttt(i, j) {
  if (c_b[i].style.opacity || c_b[i].style.backgroundColor || c_s[i][j].style.backgroundColor || game_end) return;
  color = turn ? "red" : "blue";
  turn = !turn;
  c_t.setAttribute('style', '--color: ' + (turn ? "red" : "blue"));
  c_s[i][j].style.backgroundColor = color;
  if (test(c_s[i], color)) {
    c_b[i].style.backgroundColor = color;
    if (test(c_b, color)) {
      alert(color + " win!");
      game_end = true;
      c_t.setAttribute('style', "--color:");
      for (let x of c_b) x.style.opacity = "";
      return;
    }
  }
  else {
    let k = 0;
    for (; k < 9 && c_s[i][k].style.backgroundColor; ++k);
    if (k == 9) c_b[i].style.backgroundColor = "transparent";
  }
  for (let k = 0; k < 9; ++k)
    c_b[k].style.opacity = (j == k || c_b[j].style.backgroundColor ? "" : 0.5);
}