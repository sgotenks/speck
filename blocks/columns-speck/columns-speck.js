export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }      
    });
    const temp = document.createElement('div');
    temp.innerHTML = `<div class="sc-readMore">
    <a href="#"><span>to the recipe</span></a></div>`;
    block.append(temp.children.item(0));
  });
}
