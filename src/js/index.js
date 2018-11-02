/* 
author: Miya_yang
date:2018.10.30
*/
$(function($) {
    // tab
    $('#tab').tabulous({
        effect: 'slideLeft'
    })

    // password show
    $('#passWord').togglePassword({
        el: '.hideShowPassword-toggle'
    })

    $('.hideShowPassword-toggle').click(function() {
        if ($(this).hasClass('hideShowPassword-toggle-hide')) {
            $(this).removeClass('hideShowPassword-toggle-hide')
        } else {
            $(this).addClass('hideShowPassword-toggle-hide')
        }
    })

    // add account
    $('.add-account').click(function() {
        $('.create-account').show()
        $('.dask').show()
    })

    // cancel account
    $('#cancel').click(function() {
        $('.create-account').hide()
        $('.dask').hide()
    })
})

function ToAccountInfo(publickey, balance) {
    var divhtml = ""
    divhtml += `<div id="accountlist">`;
    divhtml += `<div class="accountFor">`;
    divhtml += `<span class="accountImg"><img src="./src/img/Headportrait.png"></span>`;
    divhtml += `<ul>`;
    divhtml += `<li>Account</li>`;
    divhtml += `<li class="publickey">` + publickey + `</li>`;
    divhtml += `<li><span>` + balance + `</span> Seele</li>`;
    divhtml += `</ul>`;
    divhtml += `</div>`;
    divhtml += `</div>`;
    divhtml += `<div class="icon-list">`;
    divhtml += `<dl onclick="transfer('` + publickey + `')">`;
    divhtml += `<dt><img src="./src/img/Transfer.png"></dt>`;
    divhtml += `<dd>Transfer Seele & Tokens</dd>`;
    divhtml += `</dl>`;
    divhtml += `<dl>`;
    divhtml += `<dt><a href="#"><img src="./src/img/ViewonSeelescan.png"></a></dt>`;
    divhtml += `<dd>View On Seelescan</dd>`;
    divhtml += `</dl>`;
    divhtml += `<dl class="dl_copy" onclick="copyPublicKey(` + publickey + `)">`;
    divhtml += `<dt><img src="./src/img/copy.png"></dt>`;
    divhtml += `<dd>Copy Address</dd>`;
    divhtml += `</dl>`;
    divhtml += `<dl>`;
    divhtml += `<dt><img src="./src/img/ShowQRCode.png"></dt>`;
    divhtml += `<dd>Show QR Code</dd>`;
    divhtml += `</dl>`;
    divhtml += `</div>`;
    divhtml += `<h1 class="note">Note</h1>`;
    divhtml += `<p class="info">Accounts are password protected keys that can hold seele. They can control contracts, but can't display incoming <span>transactions</span>.</p>`;
    $('#tabs-1').html(divhtml)
}

function transfer(publickey) {
    var lis = $("#tab ul li")
    lis.each(function(i) {
        if ($(this).hasClass('tabli_active')) {
            $(this).removeClass('tabli_active')
            $(this).find('a').removeClass('tabulous_active')
        } else {
            $(this).addClass('tabli_active')
            $(this).find('a').addClass('tabulous_active')
        }
    })

    $("#tabs_container").height(627)
    $("#tabs-1").addClass('make_transist')
    $("#tabs-1").addClass('hideleft')
    $("#tabs-1").removeClass('showleft')

    $("#tabs-2").addClass('hideleft')
    $("#tabs-2").addClass('make_transist')
    $("#tabs-2").addClass('showleft')

    $("#txpublicKey").val(publickey)
}

function copyPublicKey(publickey) {
    var clipboard = new Clipboard('.publickey', {
        // 点击copy按钮，直接通过text直接返回复印的内容
        text: function() {
            return 'to be or not to be';
        }
    });

    clipboard.on('success', function(e) {
        console.log(e);
    });

    clipboard.on('error', function(e) {
        console.log(e);
    });
}