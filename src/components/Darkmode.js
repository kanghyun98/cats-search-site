export default class Darkmode {
  constructor($target) {
    this.$target = $target;

    this.render();
  }

  render() {
    const $body = document.body;

    const $changeThemeBox = document.createElement('input');
    $changeThemeBox.type = 'checkbox';

    $changeThemeBox.innerText = 'Theme';
    $changeThemeBox.classList.add('ThemeBtn');
    this.$target.appendChild($changeThemeBox);

    $changeThemeBox.addEventListener('click', () => {
      // darkmode나 whitemode가 한번이라도 적용되면 그거 반대로 (n번)
      const isDarkMode = $body.classList.contains('darkmode');
      const isWhiteMode = $body.classList.contains('whitemode');
      if (isDarkMode || isWhiteMode) {
        const [prevMode, nextMode] = isDarkMode
          ? ['darkmode', 'whitemode']
          : ['whitemode', 'darkmode'];

        $body.classList.remove(prevMode);
        $body.classList.add(nextMode);
        return;
      }

      // 둘다 없으면 os기반 반대로 (1번)
      const isOSDarkmode = window.matchMedia(
        '(prefers-color-scheme:dark)'
      ).matches;

      const nextMode = isOSDarkmode ? 'whitemode' : 'darkmode';
      $body.classList.add(nextMode);
    });
  }
}
