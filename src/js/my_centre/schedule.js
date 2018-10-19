$(function() {
  min_height();
  let c = storage.get('clientId')
  console.log(c);
  var clientId = getUrlParms("clientId")||storage.get('clientId');
  var businessPaymentConfirm; // 代发佣金订单状态
  var businessLastConfirm; // 待返现
  // schedule(clientId);
  schedule(clientId,(res)=>{
    console.log(res);
    if(res.code!==200){
      layer.msg(res.msg)
    }else{
      console.log(res.data);
      businessPaymentConfirm = res.data.clientOrderOperation.businessPaymentConfirm
      businessLastConfirm = res.data.clientOrderOperation.businessLastConfirm
      let href = '';
      switch(businessPaymentConfirm){
        case 0:
          href='/status/return_course.html'
          break;
        case 1:
          href='/status/return_loser.html'
          break;
        case 2:
          href='/status/return_succeed.html'
          break;
      }
      $('#payment-jump').on('click',function(){
        window.location.href = href
      })
      let href1 = '';
      switch(businessPaymentConfirm){
        case 0:
          href1='/status/audit_course.html'
          break;
        case 1:
          href1='/status/audit_loser.html'
          break;
        case 2:
          href1='/status/audit_succed.html'
          break;
      }
      $('#payment-jump').on('click',function(e){
        if(href){
          window.location.href = href
        }
      })
      $('#last-payment').on('click',function (e){
        if(href1){
          window.location.href = href1
        }
      })

      console.log(res);
      $('.no').text(res.data.clientOrderOperation.clientOrderId);
      $('.paymentTime').text(dateFmt("yyyy-MM-dd hh:mm:ss", res.data.clientOrderOperation.paymentTime));
      $('.proCon>h5').text(res.data.keyWord)
      switch(res.data.category){
        case 1:
          $('.mission_site>span').text('手机淘宝浏览任务');
          break;
        case 2:
          $('.mission_site>span').text('手机天猫浏览任务');
          break;
        case 3:
          $('.mission_site>span').text('电脑淘宝浏览任务');
          break;
        case 4:
          $('.mission_site>span').text('电脑天猫浏览任务');
          break;
        case 5:
          $('.mission_site>span').text('手机美丽说浏览任务');
          break;
        case 6:
          $('.mission_site>span').text('手机京东浏览任务');
          break;
        case 7:
          $('.mission_site>span').text('手机蘑菇街浏览任务');
          break;
      }

      $('.moneys>.first').text(`佣金¥${res.data.laborUser-res.data.bountyUser}`)
      $('.moneys>.second').text(`商品价:¥${res.data.capitalUser}`)
      $('.moneys>.third').text(`赏金:¥${res.data.bountyUser}`)
    }
    // status (integer, optional): 操作到第几步了：
    // 0-仅接单
    // 1-已做过货币三家
    // 2-已做过目标预览
    // 3-已做过购买待商家确认
    // 4-商家确认过待发货
    // 5-商家确认发货待用户评价
    // 6-用户确认收款并好评
    // 7-商家确认任务结束
    switch(res.data.status){
      case 0:
        $('.await_order>.statusImg').html('');
        $('.await_commission>.statusImg').html('');
        $('.await_evaluate>.statusImg').html('');
        $('.await_return>.statusImg').html('');

        break;
      case 1:
        break;
      case 2:
        $('.await_commission>.statusImg').html('');
        $('.await_evaluate>.statusImg').html('');
        $('.await_return>.statusImg').html('');
        $('.daixiadan-a').click(function(e){
          e.preventDefault()
          window.location.href='/my_centre/await_order.html'
        })
        break;
      case 3:
        $('.await_evaluate>.statusImg').html('');
        $('.await_return>.statusImg').html('');
        $('.daixiadan-a').click(function(e){
          e.preventDefault()
          window.location.href='/my_centre/await_order.html'
        })
        break;
      case 4:
        $('.daipingjia-a').click(()=>{
          window.location.href='/my_centre/await_evaluate.html'
        })
        break;
      case 5:
        $('.await_return>.statusImg').html('');
        break;
      case 6:
        break;
      case 7:
        break;
    }
  })
  if (clientId) {
    storage.set('clientId',clientId)
  }
  $('.daicaozuo>span').click((e)=>{
    window.location.href="/my_centre/await_operat.html?clientId="+clientId
  })

});

function schedule(clientId,callback) {
  const URL = '/operation/clientOrder/reason';
  const params = {
    clientOrderId:clientId
  }
  ajax_post(URL,params,callback)
}
