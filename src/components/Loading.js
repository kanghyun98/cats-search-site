export default class Loading {
  constructor($app) {
    this.$loadingWrapper = document.createElement('div');
    this.$loadingWrapper.classList.add('Loading', 'hidden');
    $app.appendChild(this.$loadingWrapper);

    this.render();
  }

  toggleLoading() {
    this.$loadingWrapper.classList.toggle('hidden');
  }

  render() {
    const $loadingSpinner = document.createElement('div');
    $loadingSpinner.innerText = 'Loading...';
    this.$loadingWrapper.appendChild($loadingSpinner);
  }
}
