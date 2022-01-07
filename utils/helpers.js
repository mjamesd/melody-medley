module.exports = {
  build_genres: (genres) => {
    let genreString = '';
    genres.forEach(genre => {
      genreString += `<a href="/genres/${genre.id}" id="genre-${genre.id}">${genre.name}</a>, `;
    });
    genreString = genreString.substring(0, genreString.length - 2);
    return genreString;
  },
};
