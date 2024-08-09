export default async function decorate(block) {

  const rows = [...block.children];
  if (rows.length == 2){
      block.firstElementChild.classList.add("mainTitle");
  }
  
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    if( !(row.classList.contains('mainTitle'))){
      [...row.children].forEach((col) => {
        const link = col.querySelector('a').href;
        const title = col.querySelector('h2');
        col.textContent = '';
        col.dataset.embedLoaded = false;
  
        const observer = new IntersectionObserver((entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            observer.disconnect();
            loadVideoEmbed(col, link, title);
          }
        });
        observer.observe(col);
        
      });
    }
  });
}

const loadVideoEmbed = (block, link, title) => {
  if (block.dataset.embedLoaded === 'true') {
    return;
  }
  const url = new URL(link);

  const isYoutube = link.includes('youtube') || link.includes('youtu.be');

  if (isYoutube) {
    const embedWrapper = embedYoutube(url);
    block.append(embedWrapper);
    if (title) {
       block.append(title);
    }
    embedWrapper.querySelector('iframe').addEventListener('load', () => {
      block.dataset.embedLoaded = true;
    });
  } 
};


function embedYoutube(url) {
  const usp = new URLSearchParams(url.search);
  let suffix = '';
  let vid = usp.get('v') ? encodeURIComponent(usp.get('v')) : '';
  const embed = url.pathname;
  if (url.origin.includes('youtu.be')) {
    [, vid] = url.pathname.split('/');
  }

  const temp = document.createElement('div');
  temp.innerHTML = `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
      <iframe src="https://www.youtube.com${vid ? `/embed/${vid}?rel=0&v=${vid}${suffix}` : embed}" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" 
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope; picture-in-picture" allowfullscreen="" scrolling="no" title="Content from Youtube" loading="lazy"></iframe>
    </div>`;
  return temp.children.item(0);
}
