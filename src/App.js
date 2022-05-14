import { api } from './apis/api.js';
import { callSessionData, saveSessionData } from './utils/sessionStorage.js';

import SearchInput from './components/SearchInput.js';
import SearchResult from './components/SearchResult.js';
import ImageInfo from './components/ImageInfo.js';
import Loading from './components/Loading.js';
import Darkmode from './components/Darkmode.js';
import KeywordsSection from './components/KeywordsSection.js';

export default class App {
  constructor($target) {
    this.$target = $target;
    this.keywords = callSessionData('keywords') || [];

    // Darkmode
    this.darkmode = new Darkmode($target);

    // Search
    this.searchInput = new SearchInput({
      $target,
      handleSearch: async (keyword) => {
        this.loading.toggleLoading();
        const data = await api.getSearchedCats(keyword);

        this.saveKeywordsCache(keyword);
        this.setState(data);

        this.loading.toggleLoading();
      },
      handleRandom: async () => {
        this.loading.toggleLoading();
        const data = await api.getRandomCats();

        this.setState(data);

        this.loading.toggleLoading();
      },
    });

    // Keywords Cache
    this.keywordsSection = new KeywordsSection({
      $target,
      handleKeywords: async (keyword) => {
        this.loading.toggleLoading();
        const data = await api.getSearchedCats(keyword);
        this.saveKeywordsCache(keyword);
        this.setState(data);
        this.loading.toggleLoading();
      },
    });

    // Result
    this.searchResult = new SearchResult({
      $target,
      handleClick: async (id) => {
        this.loading.toggleLoading();
        const image = await api.getCatInfoById(id);

        this.imageInfo.setState({
          visible: true,
          image,
        });

        this.loading.toggleLoading();
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });

    // Loading
    this.loading = new Loading($target);

    // init
    this.init();
  }

  // 상태 변경
  setState(nextData) {
    this.searchResult.setState(nextData);
    this.keywordsSection.setState(this.keywords);
  }

  // 키워드 저장
  saveKeywordsCache(keyword) {
    const CACHE_SIZE = 5;

    const keyIdx = this.keywords.indexOf(keyword);

    if (keyIdx !== -1) {
      this.keywords.splice(keyIdx, 1);
    }

    if (this.keywords.length >= CACHE_SIZE) {
      this.keywords.pop();
    }

    this.keywords.unshift(keyword); // 캐시에 담기
    saveSessionData('keywords', this.keywords); // 세션에 저장
  }

  // 초기화
  async init() {
    this.loading.toggleLoading();

    let lastKeyword = this.keywords[0];

    let initData;
    if (lastKeyword) {
      initData = await api.getSearchedCats(lastKeyword);
    } else {
      initData = await api.getRandomCats();
    }

    this.setState(initData);
    this.loading.toggleLoading();
  }
}
