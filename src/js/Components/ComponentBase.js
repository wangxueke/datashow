//基础组件
require('../../less/ComponentBase.less')
let ComponentBaseFactory = (config) => {
	let Id = (Math.random() * 100 + '').replace('.','_')
	let Component = $('<div/>').attr('id',Id);
	Component.addClass('ComponentBase');
	config.name ? Component.addClass(config.name) : '';
	config.text ? Component.text(config.text) : '';
	config.width ? Component.css('width',config.width/2) : '';
	config.height ? Component.css('height',config.height/2) : '';
	if(config.center) {
		Component.css({position:'absolute',left: '50%', marginLeft: -config.width/4})
	}
	config.css ? Component.css( config.css ) : '';
	for(let type in config.eventType) {
			Component.on(type,config.eventType[type]);
	}
	Component.on('loadComponent',function () {
		var self = $(this)
 	    config.animateIn ? Component.delay(config.delay?config.delay:0).animate(config.animateIn,function () {
 	    	self.addClass('load').removeClass('leave');
 	    }) : '';
    });

    Component.on('leaveComponent',function () {
    	$(this).addClass('leave').removeClass('load ')
 	    config.animateOut ? Component.animate(config.animateOut) : '';
    });

    return Component;
}
 
module.exports = ComponentBaseFactory;

