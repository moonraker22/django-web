// Function to sort response by deck
const sortByDeck = (cards) => {
  const decks = [];
  cards.forEach((card) => {
    decks.push(card.deck.name);
  });
  const uniqueDecks = [...new Set(decks)];
  const sortedCards = [];
  uniqueDecks.forEach((deck) => {
    const deckCards = cards.filter((card) => card.deck.name === deck);
    sortedCards.push({ deck: deck, cards: deckCards });
  });
  return sortedCards;
};

export default sortByDeck;
