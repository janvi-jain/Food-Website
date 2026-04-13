export async function getRecipes() {
  let res = await fetch("https://keto-diet.p.rapidapi.com/", {
    headers: {
      "X-RapidAPI-Key": "e6dd26342bmsh458b3f0d70b2d02p1d9736jsn8a73d9fae75a",
      "X-RapidAPI-Host": "keto-diet.p.rapidapi.com"
    }
  });

  let data = await res.json();

  return data.map(item => ({
    ...item,
    category: ["breakfast", "snacks", "dinner"][Math.floor(Math.random()*3)]
  }));
}