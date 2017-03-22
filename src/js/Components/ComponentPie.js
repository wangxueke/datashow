require('../../less/ComponentPie.less');
let ComponentBaseFactory = require('./ComponentBase.js')

let ComponentPieFactory = (config) => {
	let Component = ComponentBaseFactory(config).addClass('ComponentPie');
	const Data = config.data;
	let oCanvas = $('<canvas/>').get(0);
	Component.append(oCanvas);
	let [w,h] = [config.width,config.height];
	[oCanvas.width,oCanvas.height] = [w,h];

	let oContext = oCanvas.getContext('2d');
	oContext.fillStyle = '#eee';
	let r = w/2;
	oContext.beginPath();
	oContext.arc(r,r,r,0,Math.PI * 2);
	oContext.fill();
	



	let oCavsData = $('<canvas/>').get(0);
	[oCavsData.width,oCavsData.height] = [w,h];
	Component.append(oCavsData);
	let oCxtData = oCavsData.getContext('2d');


	let sAngle = 1.5 * Math.PI;
	let eAngle = 0 * Math.PI;
	let aAngle = 2 * Math.PI;


	
	Data.forEach((ele,index) => {
		oCxtData.beginPath();
		eAngle = sAngle + ele[1] * aAngle;
		oCxtData.fillStyle = ele[2];
		oCxtData.moveTo(r,r)
		oCxtData.arc(r,r,r,sAngle,eAngle);
		oCxtData.fill();//画每部分的扇形



		let trueR = w / 4;
		console.log(trueR)
		let textAngle = sAngle + (eAngle - sAngle)/2;
		let x = Math.abs(trueR * Math.cos(aAngle - (sAngle + (eAngle - sAngle)/2 ) ) );
		let y = Math.abs(trueR * Math.sin(aAngle - (sAngle + (eAngle - sAngle)/2 ) ) );
		console.log(x)
		let oText = $('<div/>').addClass('text').css('position','absolute').text(ele[0]);

		if(textAngle >= 1.5 * Math.PI && textAngle<= 2.5 * Math.PI){
			oText.css({left:trueR + x})
		}else if(textAngle > 2.5 * Math.PI && textAngle<= 3.5 * Math.PI) {
			oText.css({right:trueR + x})
		}// 如果在左右两边


		if(textAngle >= 2 * Math.PI && textAngle<= 3 * Math.PI) {
			oText.css({top:trueR + y})
		}else if( (textAngle >= 1.5 * Math.PI && textAngle < 2 * Math.PI) || (textAngle > 3 * Math.PI && textAngle <= 3.5 *Math.PI)){
			oText.css({bottom:trueR + y})
		}
		oText.appendTo(Component)

		sAngle = eAngle
	});

	 let oMask = $('<canvas/>').get(0);
	 [oMask.width,oMask.height] = [w,h]
	 let oMcxt = oMask.getContext('2d');
	 Component.append(oMask);
	 oMcxt.fillStyle = "white"
 	function draw (percent) {
 		oMcxt.clearRect(0,0,w,h)
 		oMcxt.beginPath();
 		oMcxt.moveTo(r,r)
 		oMcxt.arc(r,r,r,1.5 * Math.PI,1.5 * Math.PI - aAngle * percent,1);
 		oMcxt.fill();
 	}
 	draw(0);



 	Component.on('loadComponent', () => {
	  	var index = 1;
	  	setTimeout(() => {
	  		for(let i = 0;i < 100;i++){
	  			setTimeout(() => {
	  				index -= 0.01;
	  				draw(index)
	  			},i * 20)
	  		}
	  	},1000)
	  })

	  //离场
	  Component.on('leaveComponent',() => {
	  	draw(1)
	  })



   





	return Component
};
module.exports = ComponentPieFactory