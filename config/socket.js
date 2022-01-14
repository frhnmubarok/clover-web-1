import Echo from 'laravel-echo';
if(typeof window !== undefined){

    window.Pusher = require('pusher-js');

    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: '449ffdbb4d51d3fab7bb',
        cluster: 'ap1',
        forceTLS: true
    });

    // Echo.channel('Clover-channel')
	// 	.listen('.clover', (e) => {
	// 		alert('ok')
	// 	});
    
}