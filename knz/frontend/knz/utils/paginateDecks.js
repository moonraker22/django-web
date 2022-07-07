// Function to paginate the decks
const paginateDecks = (decks, page, perPage) => {
  const start = (page - 1) * perPage;
  const end = page * perPage;
  return decks.slice(start, end);
};

export default paginateDecks;
