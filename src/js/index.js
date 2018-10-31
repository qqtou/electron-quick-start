/* 
author: Miya_yang
date:2018.10.30
*/
$(function ($) {
  // tab
  $('#tab').tabulous({
    effect: 'slideLeft'
  })
  // password show
  $('#passWord').togglePassword({
    el: '.hideShowPassword-toggle'
  })
  $('.hideShowPassword-toggle').click(function () {
    if ($(this).hasClass('hideShowPassword-toggle-hide')) {
      $(this).removeClass('hideShowPassword-toggle-hide')
    } else {
      $(this).addClass('hideShowPassword-toggle-hide')
    }
  })
  // add account
  $('.add-account').click(function () {
    $('.create-account').show()
    $('.dask').show()
  })
  // cancel account
  $('#cancel').click(function () {
    $('.create-account').hide()
    $('.dask').hide()
  })
  // click to account-info
  // var accountNum = $('.accountFor')
  // for (i = 0, i < accountNum.length; i++;) {
  //   console.log($(this).index)
  // }
  $('.progress').slider()
})