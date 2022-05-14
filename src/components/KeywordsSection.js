export default class KeywordsSection {
  constructor({ $target, handleKeywords }) {
    this.$keywordSection = document.createElement('ul');
    this.$keywordSection.className = 'KeywordSection';
    $target.appendChild(this.$keywordSection);

    this.keywordsLog = [];
    this.onKeywords = handleKeywords;

    this.render();
    this.addEvent(this.$keywordSection);
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

  addEvent($target) {
    $target.addEventListener('click', async (e) => {
      const $keyword = e.target.closest('.keyword');

      if ($keyword) {
        await this.onKeywords(e.target.innerText);
      }
    });
  }
}
