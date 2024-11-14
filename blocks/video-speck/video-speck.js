export default async function decorate(block) {
  const link = block.querySelector('a').href;
  
  block.dataset.embedLoaded = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      observer.disconnect();
      loadVideoEmbed(block, link);
    }
  });
  observer.observe(block);
}


const loadVideoEmbed = (block, link) => {
  if (block.dataset.embedLoaded === 'true') {
    return;
  }
  const url = new URL(link);

  const videoEl = getVideoElement(link);
  block.append(videoEl);
  videoEl.addEventListener('canplay', () => {
    block.dataset.embedLoaded = true;
  });
};

function getVideoElement(source) {
  const video = document.createElement('video');
  video.setAttribute('controls', '');
  video.setAttribute('autoplay', '');
  video.setAttribute('loop', '');
  video.setAttribute('playsinline', '');
  video.removeAttribute('controls');
  video.addEventListener('canplay', () => {
    video.muted = true;
    video.play();
  });

  const sourceEl = document.createElement('source');
  sourceEl.setAttribute('src', source);
  sourceEl.setAttribute('type', `video/${source.split('.').pop()}`);
  video.append(sourceEl);

  return video;
}
