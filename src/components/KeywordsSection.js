export default class KeywordsSection {
  constructor({ $target, onClickKeyword }) {
    this.$keywordSection = document.createElement('ul');
    this.$keywordSection.className = 'KeywordSection';
    $target.appendChild(this.$keywordSection);
    this.addEvent();

    this.keywordsLog = [];
    this.handleClickKeyword = onClickKeyword;

    this.render();
  }

  setState(newLog) {
    this.keywordsLog = newLog;
    this.render();
  }

  render() {
    const $keywords = this.keywordsLog
      .map((keyword) => {
        return `<li class='keyword'>${keyword}</li>`;
      })
      .join('');

    this.$keywordSection.innerHTML = $keywords;
  }

  addEvent() {
    this.$keywordSection.addEventListener('click', async (e) => {
      const $keyword = e.target.closest('.keyword');

      if ($keyword) {
        await this.handleClickKeyword(e.target.innerText);
      }
    });
  }
}
