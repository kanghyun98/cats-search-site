export default class SearchResult {
  $searchResult = null;
  data = [];
  onClick = null;

  constructor({ $target, onClick }) {
    this.$searchResult = document.createElement('section');
    this.$searchResult.className = 'SearchResult';
    $target.appendChild(this.$searchResult);
    this.addEvent();

    this.data = [];
    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    let $result = `<div class="NoResult">결과가 없습니다.</div>`;

    if (this.data?.length) {
      $result = this.data
        .map(
          (cat) => `
          <div class="item" id=${cat.id}>
            <img src=${cat.url} alt=${cat.name} title=${cat.name} />
          </div>
        `
        )
        .join('');
    }

    this.$searchResult.innerHTML = $result;
  }

  addEvent() {
    this.$searchResult.addEventListener('click', async (e) => {
      const $item = e.target.closest('.item');

      if ($item) {
        this.onClick($item.id);
      }
    });
  }
}
