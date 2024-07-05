(function () {
    function sendTrackingData(data) {
      fetch('https://yourdomain.com/api/track-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).catch((error) => console.error('Error tracking event:', error));
    }
  
    document.addEventListener('DOMContentLoaded', () => {
      // Track page visit
      sendTrackingData({
        type: 'page-visit',
        url: window.location.href,
        timestamp: new Date().toISOString(),
      });
  
      // Track clicks
      document.addEventListener('click', (event) => {
        const { target } = event;
        sendTrackingData({
          type: 'click',
          element: target.tagName,
          id: target.id,
          classes: target.className,
          url: window.location.href,
          timestamp: new Date().toISOString(),
        });
      });
    });
  })();
  