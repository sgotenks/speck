import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  const title = document.createElement('div');
  var titleBlock = document.querySelectorAll('.titlecards p')[0];
  title.append(titleBlock);
  title.classList.add("cardsTitle");
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    var countElement = 1;
    var specialClass = "";
    [...li.children].forEach((div) => {
      if (countElement > 2) {specialClass = "smallnews"; }
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image ' + specialClass;
      else div.className = 'cards-card-body '+'element' + specialClass;
      countElement++;
    });
    
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';  
  if (titleBlock!= "" && titleBlock != undefined && titleBlock != "undefined") {
    console.log(titleBlock);
    block.append(title); 
   }
  block.append(ul);
}
