document.addEventListener('DOMContentLoaded', (event) => {
    const imgContainer = document.getElementById('imageViewer');
    const img = document.getElementById('pngImage');
    let isPanning = false;
    let startPoint = { x: 0, y: 0 };
    let endPoint = { x: 0, y: 0 };
    let scale = 1;
  
    // Zoom functionality
    imgContainer.addEventListener('wheel', (e) => {
      if (e.ctrlKey) { // Only zoom if CTRL key is pressed
        e.preventDefault(); // Prevent the whole page from scrolling
        const delta = e.deltaY * -0.01;
        // Implement zoom limits (min: 1, max: 3)
        scale += delta;
        scale = Math.min(Math.max(1, scale), 3);
        img.style.transform = `scale(${scale})`;
      }
    });
  
    // Start panning
    imgContainer.addEventListener('mousedown', (e) => {
      if (e.button === 1) { // Middle mouse button
        e.preventDefault(); // Prevent default middle mouse scroll behavior
        isPanning = true;
        startPoint = {
          x: e.clientX - endPoint.x,
          y: e.clientY - endPoint.y
        };
      }
    });
  
    // Panning (moving the image)
    imgContainer.addEventListener('mousemove', (e) => {
      if (isPanning) {
        e.preventDefault();
        endPoint = {
          x: e.clientX - startPoint.x,
          y: e.clientY - startPoint.y
        };
        img.style.transform = `scale(${scale}) translate(${endPoint.x}px, ${endPoint.y}px)`;
      }
    });
  
    // End panning
    imgContainer.addEventListener('mouseup', (e) => {
      if (isPanning) {
        isPanning = false;
      }
    });
  
    // End panning if mouse leaves the container (optional for better UX)
    imgContainer.addEventListener('mouseleave', (e) => {
      if (isPanning) {
        isPanning = false;
      }
    });
  
    // Reset panning and zoom on double click (optional)
    imgContainer.addEventListener('dblclick', (e) => {
      scale = 1;
      startPoint = { x: 0, y: 0 };
      endPoint = { x: 0, y: 0 };
      img.style.transform = 'scale(1)';
    });
  });
  