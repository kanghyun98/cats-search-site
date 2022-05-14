export default class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement('div');
    $imageInfo.className = 'ImageInfo';
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  closeImageInfo() {
    this.setState({
      visible: false,
      image: null,
    });
  }

  render() {
    if (this.data.visible) {
      const $overlay = document.createElement('div');
      $overlay.classList.add('overlay');
      this.$imageInfo.appendChild($overlay);

      const { name, url, temperament, origin } = this.data.image;

      const $contentWrapper = document.createElement('section');
      $contentWrapper.classList.add('content-wrapper');

      const $title = document.createElement('p');
      $title.classList.add('title');

      const $name = document.createElement('span');
      $name.innerText = name;

      const $closeBtn = document.createElement('button');
      $closeBtn.classList.add('close');
      $closeBtn.innerText = 'X';

      $title.appendChild($name);
      $title.appendChild($closeBtn);

      const $img = document.createElement('img');
      $img.src = url;
      $img.alt = name;

      const $description = document.createElement('div');
      $description.classList.add('description');
      $description.innerHTML = `
        <p>성격: ${temperament}</p>
        <p>태생: ${origin}</p>
      `;

      $contentWrapper.appendChild($title);
      $contentWrapper.appendChild($img);
      $contentWrapper.appendChild($description);
      this.$imageInfo.appendChild($contentWrapper);

      this.$imageInfo.style.display = 'block';

      // 모달 닫는 이벤트
      $overlay.addEventListener('click', () => {
        this.closeImageInfo();
      });

      $closeBtn.addEventListener('click', () => {
        this.closeImageInfo();
      });

      window.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
          this.closeImageInfo();
        }
      });
    } else {
      this.$imageInfo.style.display = 'none';
    }
  }
}
