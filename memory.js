const game = {};

game.create = function(images, blank) {
  this.images = images;
  this.blank = blank;
  this.positions = shuffleCards(images.length);
  this.selection = undefined;
  this.foundCards = [];
};

game.build = function(div) {
  this.div = div;
  this.cards = [];
  for (let i = 0; i < this.positions.length; i++) {
    const card = document.createElement('div');
    const img = document.createElement('img');
    img.src = this.blank;
    card.appendChild(img);
    this.cards.push(card);
    card.onclick = (function(index) {
      return function() {
        game.handleCardClick(index);
      };
    })(i);
    div.appendChild(card);
  }
};

game.handleCardClick = function(index) {
  if (this.foundCards.includes(index) || this.selection === index) {
    return;
  }
  
  const currentCard = this.cards[index];
  const imageIndex = this.positions[index];
  const img = currentCard.querySelector('img');
  
  img.src = this.images[imageIndex];
  
  if (this.selection === undefined) {
    this.selection = index;
  } else {
    const selectedCard = this.cards[this.selection];
    const selectedImageIndex = this.positions[this.selection];
    
    if (imageIndex === selectedImageIndex) {
      this.foundCards.push(index);
      this.foundCards.push(this.selection);
      this.selection = undefined;
    } else {
      const self = this;
      setTimeout(function() {
        img.src = self.blank;
        selectedCard.querySelector('img').src = self.blank;
        self.selection = undefined;
      }, 500);
    }
  }
};

const shuffleCards = function(length) {
  let cards = [];
  for(let i = 0; i < length; i++) {
    cards.push(i);
    cards.push(i);
  }
  
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  
  return cards;
};
