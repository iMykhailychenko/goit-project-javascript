const item = document.querySelector('.copy--js');

item.addEventListener('click', e => {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(e.currentTarget.firstElementChild);
  selection.removeAllRanges();
  selection.addRange(range);

  try {
    document.execCommand('copy');
    selection.removeAllRanges();

    const text = e.currentTarget.children[1].textContent;
    e.currentTarget.children[1].textContent = 'Copied!';
    e.currentTarget.children[1].classList.add('copied');

    setTimeout(() => {
      item.children[1].textContent = text;
      item.children[1].classList.remove('copied');
    }, 1200);
  } catch (err) {
    console.log('Copy error' + err);
  }
});
