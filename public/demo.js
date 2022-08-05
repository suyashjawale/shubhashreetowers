document.querySelectorAll('button.print').forEach(item => {
  item.addEventListener('click', event => {
    var common = item.getAttribute('target_div');
    html2canvas(document.querySelector(`#${common}`),{
    scale: 3
}).then(canvas => {
      var anchor = document.createElement("a");
      anchor.href = canvas.toDataURL("image/jpeg", 1.0);
      anchor.download = `${common}.jpeg`;
      anchor.click();
    });
  })
})
