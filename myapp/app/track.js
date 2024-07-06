// public/track.js

(function() {
    document.addEventListener('click', function(event) {
      var x = event.clientX;
      var y = event.clientY;
      var url = window.location.href;
  
      fetch('http://localhost:3000/api/clicks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ x, y, url }),
      })
      .then(response => response.json())
      .then(data => console.log('Click recorded:', data))
      .catch((error) => console.error('Error:', error));
    });
  })();
  