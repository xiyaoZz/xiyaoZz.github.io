$(function(){
});
//5案例详情
$('#Subpage2 .slick_res1l').slick({
	dots: false,
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: true,
	fade: true,
	//asNavFor: '.slick_res2r', //关联小图
	autoplay:false,
	autoplaySpeed:5000
});
$('#Subpage2 .slick_res2r').slick({
	slidesToShow: 3,
	slidesToScroll: 1,
	asNavFor: '.slick_res1l',//关联大图
	//centerMode: true,
	focusOnSelect: true, //右侧跟随左侧切换
	vertical:true, //垂直方向
	autoplay:true,
	autoplaySpeed:5000
});
$("#Subpage2 .slick_res2r").height($("#Subpage2 .slick_res1l").height()-46);
 
$('#Subpage2 .caseConAl .tab').slick({
	dots: false,
	arrows: true,
	slidesToShow: 3,
	slidesToScroll: 1,
	lazyLoad: 'progressive',
	responsive: [
			{
			breakpoint: 767,
			settings: {
			slidesToShow: 1,
			slidesToScroll: 1
				}
			}
		]
})


 

