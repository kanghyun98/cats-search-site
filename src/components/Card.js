import { lazyLoad } from '../utils/lazyLoad.js';

export default class Card {
  constructor({ $frag, catInfo }) {
    this.$frag = $frag;
    this.catInfo = catInfo;

    this.render();
  }

  render() {
    const { id, url, name } = this.catInfo;

    const $card = document.createElement('div');
    $card.className = 'item';
    $card.id = id;

    const $catImg = document.createElement('img');
    $catImg.dataset.src = url;
    $catImg.alt = name;
    $catImg.title = name;

    $card.appendChild($catImg);
    this.$frag.appendChild($card);

    // LazyLoad
    lazyLoad($catImg);
  }
}
