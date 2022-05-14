const lazyLoad = ($target) => {
  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;

          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImageObserver.observe($target);
  }
};

export { lazyLoad };
