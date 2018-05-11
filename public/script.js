$('.toolbar').on('click', function(event) {
  console.log(event)
  console.log(this)
  console.log(rand)
  if (this.classList.contains("active")) {
    this.classList.remove('active')
  } else {
    this.classList.add('active')
  }
})