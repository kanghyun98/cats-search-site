import { api } from './api.js';
import { callDataFunc, saveDataFunc } from './utils/sessionStorage.js';

import SearchInput from './components/SearchInput.js';
import SearchResult from './components/SearchResult.js';
import ImageInfo from './components/ImageInfo.js';
import Loading from './components/Loading.js';

export default class App {
  constructor($target) {
    this.$target = $target;
    this.keywordLogs = callDataFunc('keywords') || [];

    this.searchInput = new SearchInput({
      $target,
      onSearch: async (keyword) => {
        this.loading.toggleLoading();
        const data = await api.getSearchedCats(keyword);
        this.setState(data);
        this.loading.toggleLoading();
      },
      onRandom: async () => {
        this.loading.toggleLoading();
        const data = await api.getRandomCats();
        this.setState(data);
        this.loading.toggleLoading();
      },
    });

    this.searchResult = new SearchResult({
      $target,
      onClick: async (id) => {
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

  setState(nextData) {
    this.searchResult.setState(nextData);
  }

  async init() {
    this.loading.toggleLoading();

    let lastKeyword = this.keywordLogs[this.keywordLogs.length - 1];

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
