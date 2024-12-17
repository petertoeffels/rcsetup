document.addEventListener('DOMContentLoaded', () => {
  const fields = document.querySelectorAll('.input-field');

  // Positionen aus localStorage laden
  fields.forEach(field => {
    const id = field.getAttribute('data-id');
    const savedPosition = localStorage.getItem(`field-position-${id}`);
    if (savedPosition) {
      const { left, top } = JSON.parse(savedPosition);
      field.style.left = left;
      field.style.top = top;
    }
  });

  fields.forEach(field => {
    let isDragging = false;
    let shiftX, shiftY;

    field.addEventListener('mousedown', (e) => {
      isDragging = true;
      const fieldEl = e.target.closest('.input-field');
      shiftX = e.clientX - fieldEl.getBoundingClientRect().left;
      shiftY = e.clientY - fieldEl.getBoundingClientRect().top;

      function moveAt(pageX, pageY) {
        fieldEl.style.left = pageX - shiftX + 'px';
        fieldEl.style.top = pageY - shiftY + 'px';
      }

      function onMouseMove(event) {
        if (isDragging) {
          moveAt(event.pageX, event.pageY);
        }
      }

      document.addEventListener('mousemove', onMouseMove);

      document.addEventListener('mouseup', () => {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);

        // Position im localStorage speichern
        const id = fieldEl.getAttribute('data-id');
        const position = {
          left: fieldEl.style.left,
          top: fieldEl.style.top
        };
        localStorage.setItem(`field-position-${id}`, JSON.stringify(position));
      }, { once: true });
    });

    field.ondragstart = () => false;
  });

  // Export-Funktion hinzufügen
  const exportButton = document.createElement('button');
  exportButton.textContent = 'Positionen exportieren';
  exportButton.style.margin = '20px';
  exportButton.addEventListener('click', () => {
    const positions = {};
    fields.forEach(field => {
      const id = field.getAttribute('data-id');
      const savedPosition = localStorage.getItem(`field-position-${id}`);
      if (savedPosition) {
        positions[id] = JSON.parse(savedPosition);
      }
    });
    console.log('Exportierte Positionen:', positions);
    alert('Positionen wurden in der Konsole exportiert.');
  });
  document.body.appendChild(exportButton);
});
