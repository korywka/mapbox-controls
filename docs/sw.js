self.addEventListener('fetch', event => {
  console.log('HTTP call intercepted - ' + event.request.url);
  if (event.request.url.startsWith('https://api.mapbox.com/map-sessions/v1?sku') || event.request.url.startsWith('https://events.mapbox.com/events/v2?access_token=')) {
    event.respondWith(new Response(null, {
      status: 200,
    }));
  }
});