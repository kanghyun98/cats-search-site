import Card from './Card.js';

export default class SearchResult {
  $searchResult = null;
  data = [];
  onClick = null;

  constructor({ $target, handleClick }) {
    this.$searchResult = document.createElement('section');
    this.$searchResult.className = 'SearchResult';
    $target.appendChild(this.$searchResult);
    this.addEvent(this.$searchResult);

    this.data = [];
    this.onClick = handleClick;
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$searchResult.innerHTML = '';

    if (this.data?.length) {
      const $frag = document.createDocumentFragment();
      this.data.forEach((catInfo) => new Card({ $frag, catInfo }));

      this.$searchResult.appendChild($frag);
      return;
    }

    // 검색 결과 없을 경우
    const $noResult = document.createElement('div');
    $noResult.innerText = '결과가 없습니다.';
    this.$searchResult.appendChild($noResult);
  }

  addEvent($target) {
    $target.addEventListener('click', async (e) => {
      const $item = e.target.closest('.item');

      if ($item) {
        this.onClick($item.id);
      }
    });
  }
}
