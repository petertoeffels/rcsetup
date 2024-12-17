document.addEventListener('DOMContentLoaded', () => {
  const tiresSelect = document.getElementById('tires');

  tiresSelect.addEventListener('change', () => {
    console.log(`Ausgewählte Reifen: ${tiresSelect.value}`);
  });
});
