export default class SearchInput {
  constructor({ $target, handleSearch, handleRandom }) {
    this.onSearch = handleSearch;
    this.onRandom = handleRandom;

    this.$searchHeader = document.createElement('div');
    this.$searchHeader.classList.add('SearchHeader');
    $target.appendChild(this.$searchHeader);

    this.render();
  }

  render() {
    // 검색창
    const $searchInput = document.createElement('input');
    $searchInput.placeholder = '고양이를 검색해보세요.';
    $searchInput.className = 'SearchInput';
    $searchInput.autofocus = true; // 페이지 진입 시, 자동 포커스
    this.$searchHeader.appendChild($searchInput);

    // 랜덤 버튼
    const $randomBtn = document.createElement('button');
    $randomBtn.classList.add('RandomBtn');
    $randomBtn.innerText = '랜덤';
    this.$searchHeader.appendChild($randomBtn);

    // 이벤트 처리
    this.addSearchEvent($searchInput);
    this.addRandomEvent($randomBtn);
  }

  // random 버튼 클릭 이벤트
  addRandomEvent($target) {
    $target.addEventListener('click', async () => {
      await this.onRandom();
    });
  }

  // 검색 이벤트
  addSearchEvent($target) {
    $target.addEventListener('keyup', async (e) => {
      if (e.key === 'Enter') {
        if (e.target.value) {
          await this.onSearch(e.target.value); // 정상 입력
          return;
        }

        await this.onRandom(); // 아무것도 입력 안했을 시, 랜덤 결과 나오게
      }
    });

    // input 클릭 시, 키워드 초기화
    $target.addEventListener('focus', (e) => {
      $target.value = '';
    });
  }
}
