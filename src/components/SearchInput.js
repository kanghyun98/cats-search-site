const TEMPLATE = '<input type="text">';

export default class SearchInput {
  constructor({ $target, onSearch, onRandom }) {
    this.handleSearch = onSearch;
    this.handleRandom = onRandom;

    this.$searchHeader = document.createElement('header');
    this.$searchHeader.classList.add('SearchHeader');
    $target.appendChild(this.$searchHeader);

    this.render();
  }

  render() {
    const $searchInput = document.createElement('input');
    $searchInput.placeholder = '고양이를 검색해보세요.|';
    $searchInput.className = 'SearchInput';
    $searchInput.autofocus = true; // 페이지 진입 시, 자동 포커스

    const $randomBtn = document.createElement('button');
    $randomBtn.classList.add('RandomBtn');
    const $btnImg = document.createElement('img');
    $btnImg.src = './favicon.ico';
    $randomBtn.appendChild($btnImg);

    this.$searchHeader.appendChild($searchInput);
    this.$searchHeader.appendChild($randomBtn);

    // 이벤트 처리
    // 검색
    $searchInput.addEventListener('keyup', async (e) => {
      if (e.key === 'Enter') {
        if (e.target.value) {
          // 정상 입력
          await this.handleSearch(e.target.value);
        } else {
          // 아무것도 입력 안했을 시, 랜덤 결과 나오게
          await this.handleRandom();
        }
      }
    });

    // input 클릭 시, 키워드 초기화
    $searchInput.addEventListener('focus', (e) => {
      $searchInput.value = '';
    });

    // random 버튼 클릭
    $randomBtn.addEventListener('click', async () => {
      await this.handleRandom();
    });
  }
}
