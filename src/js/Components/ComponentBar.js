require('../../less/ComponentBar.less')
let ComponentBaseFactory = require('./ComponentBase.js')


let ComponentBarFactory = (config) => {
	    let Component = ComponentBaseFactory(config).addClass('ComponentBar');
	    const Data = config.data;
	    Data.forEach( (ele,index) => {
	    		let itemWrapper = $('<div/>').addClass('itemWrapper');
	    		let nameDiv = $('<div/>').addClass('name');
	    		nameDiv.text(ele[0]);
	    
	    		let loadWrapper = $('<div/>').addClass('loadWrapper').css({width: 300 * ele[1]});
	    		let loadInner = $('<div/>').addClass('loadInner').css({background:ele[2]});
	    		loadWrapper.append(loadInner);
	    
	    		let perDiv = $('<div/>').addClass('percent').text(ele[1] * 100 + '%');
	    
	    		itemWrapper
	    					.append(nameDiv)
	    					.append(loadWrapper)
	    					.append(perDiv)
	    					.appendTo(Component);
	    	});






	return Component;
}
module.exports = ComponentBarFactory;