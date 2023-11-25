
document.addEventListener('DOMContentLoaded', function() {
  const imgTags = document.querySelectorAll('img');
  imgTags.forEach(img => {
    img.setAttribute('loading', 'lazy');
  });
});
