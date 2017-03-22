require('../../less/ComponentPolyLine.less')
let ComponentBaseFactory = require('./ComponentBase.js')

let ComponentPolyLineFactory = (config) => {
	 let Component = ComponentBaseFactory(config).addClass('ComponentPolyLine');
	 const Data = config.data;
	 let oCanvas = $('<canvas/>').get(0);
	 let oContext = oCanvas.getContext('2d')
	 oCanvas.width = config.width;
	 oCanvas.height = config.height;
	 Component.append(oCanvas);
	 oContext.beginPath();
	 oContext.lineWidth = 2;
	 oContext.strokeStyle = '#f00';


	 let step = 10;
	 for(let i = 0; i< step + 1;i ++) {
	 	let y = config.height/step * i;
	 	oContext.moveTo(0,y)
	 	oContext.lineTo(config.width,y)
	 }
	 oContext.stroke();//画横线

	 for(let i = 0;i < config.data.length + 1;i ++){
	 	let x = config.width/(config.data.length + 1) * i
	 	oContext.moveTo(x,0);
	 	oContext.lineTo(x,config.height)
	 }
	 oContext.stroke()//画竖线


	 Data.forEach((ele,index) => {
	 	let oText = $('<div/>').addClass('text');
	 	let oTureWidth = config.width/2/(config.data.length + 1)
	 	let x = oTureWidth *(index + 1)
	 	oText.text(ele[0]).css({position:'absolute',left:x,bottom:-20,width:oTureWidth,marginLeft:-oTureWidth/2,textAlign:'center'})
	 	Component.append(oText)
	 })//写文本

	 	//再来一个画布
	     let oCav = $('<canvas/>').get(0);
		 let oCt = oCav.getContext('2d')
		 oCav.width = config.width;
		 oCav.height = config.height;
		 Component.append(oCav);

	 function draw(per) {
	 	     oCt.clearRect(0,0,config.width,config.height)
	 	     oCt.beginPath();
			 oCt.lineWidth = 2;
			 oCt.strokeStyle = '#f00';
	 	     //画点
			 let onePos = config.width/(config.data.length + 1)
			 Data.forEach((ele,index) => {
			 	let x = onePos * (index + 1);
			 	let y = config.height * [1 - ele[1] * per];
			 	oCt.moveTo(x,y);
			 	oCt.arc(x,y,5,0,Math.PI *2)
			 	oCt.stroke()
			 })


			 //连线
			 oCt.moveTo(onePos,config.height * (1-config.data[0][1] * per));
			 Data.forEach((ele,index) => {
			 	let x = onePos * (index + 1);
			 	let y = config.height * [1 - ele[1] * per];
			 	oCt.lineTo(x,y);
			 	oCt.stroke()
			 	if(index == config.data.length - 1) {
			 		oCt.lineTo(x,config.height);
			 		oCt.lineTo(onePos,config.height);
			 		oCt.fillStyle = 'rgba(255,0,0,0.4)';
			 		oCt.fill()
			 	}
			 })

			 //写百分比
			  Data.forEach((ele,index) => {
			 	let x = onePos * (index + 1);
			 	let y = config.height * [1 - ele[1] * per];
			 	oCt.moveTo(x,y);
			 	oCt.font = '30px Arial';
			 	oCt.fillStyle = ele[2];
			 	oCt.fillText(ele[1] * 100 + '%', x - 20,y - 15);
			 	oCt.stroke()
			 })
	 }
	  

	  //缓冲运动
	  Component.on('loadComponent', () => {
	  	var index = 0;
	  	setTimeout(() => {
	  		for(let i = 0;i < 100;i++){
	  			setTimeout(() => {
	  				index += 0.01;
	  				draw(index)
	  			},i * 10)
	  		}
	  	},1000)
	  })

	  //离场
	  Component.on('leaveComponent',() => {
	  	var index = 1;
	  	for(let i = 0;i < 100;i++){
	  			setTimeout(() => {
	  				index -= 0.01;
	  				draw(index)
	  			},i * 10)
	  		}

	  })


	 return Component;
}
module.exports = ComponentPolyLineFactory