document.addEventListener('DOMContentLoaded', function () {
    function updateBackground() {
      const currentDate = new Date();
      //mijenja naslovnu tj background sliku svakog dana
      const imageIndex = (currentDate.getDate() % 7) + 1; // 7 slika od 1 do 7
      const imagePath = `/img/${imageIndex}.jpg`;
  

      const bodyElement = document.body;
      if (bodyElement) {
        bodyElement.style.backgroundImage = `url('${imagePath}')`;
      }
    }
  
    updateBackground();
  });