export default async function decorate(block) {
  const link = block.querySelector('a').href;
  const title = block.querySelector('h2');
  const subtitle = block.querySelector('h3');
  block.textContent = '';
  block.dataset.embedLoaded = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      observer.disconnect();
      loadVideoEmbed(block, link, title, subtitle);
    }
  });
  observer.observe(block);
}


const loadVideoEmbed = (block, link, title, subtitle) => {
  if (block.dataset.embedLoaded === 'true') {
    return;
  }
  const url = new URL(link);

  const videoEl = getVideoElement(link);
  const textEl = getTextElement(title, subtitle);
  const graphicalEl = getGraphicalElement();
  
  block.append(videoEl);
  block.append(textEl);
  block.append(graphicalEl);
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

function getTextElement(title, subtitle) {
  const textContainer = document.createElement('div');
  textContainer.classList.add('headline');
  textContainer.append(title);
  const br = document.createElement('br');
  textContainer.append(br);
  const span = document.createElement('span');
  span.append(subtitle);
  textContainer.append(span);
  return textContainer;
}

function getGraphicalElement() {
  const tempDiv = document.createElement('div'); 
  tempDiv.innerHTML = `<div class="ctA-recipe">
		<a href="/en/recipes/">
			<img alt="Recipes" src="/icons/image.png" data-src="/icons/image.png" style="" width="326" height="251" class="lazyautosizes ls-is-cached lazyloaded" data-sizes="auto" data-srcset="/icons/image.png 400w, /icons/image.png 600w, /icons/image.png 900w, /icons/image.png 1200w, /icons/image.png 1500w, /icons/image.png 1800w, /icons/image.png 2100w" sizes="326px" srcset="/icons/image.png 400w, /icons/image.png 600w, /icons/image.png 900w, /icons/image.png 1200w, /icons/image.png 1500w, /icons/image.png 1800w, /icons/image.png 2100w"/>
		</a>
	</div>`;
  return tempDiv.children.item(0);
}
