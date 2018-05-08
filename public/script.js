var ilpBtn = $('#ilpBtn')
var soundcloudBtn = $('#soundcloudBtn')
var haroldBtn = $('#haroldBtn')

ilpBtn.click(function () {
  console.log('ILP button clicked')
  $('#ilpCollapse').collapse('toggle')
})

soundcloudBtn.click(function () {
  console.log('Soundcloud button clicked')
  $('#soundcloudCollapse').collapse('toggle')
})

haroldBtn.click(function () {
  console.log('Harold button clicked')
  $('#haroldCollapse').collapse('toggle')
})