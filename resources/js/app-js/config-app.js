
	import { flash_notify } from './app-helper';

	// ( function( $ ) {
		// "use strict";

		$.ajaxSetup( {
			type: 		'POST',
			dataType: 	'JSON',
			data: 		window.__token,

			success: 	function( response, textStatus, jqXHR ) {
				console.log( 'success' );
			},
			error: 		function( jqXHR, textStatus, errorThrown ) {

				console.log( jqXHR );
				console.log( jqXHR.responseJSON );
				// console.log( jqXHR.responseText );
				console.log( textStatus );
				console.log( errorThrown );

				// t_r = false;
				switch( jqXHR.status )
				{

					case 200:
							console.log( jqXHR.status );
							flash_notify(
								jqXHR.responseJSON.type,
								jqXHR.responseJSON.message
							);
						// alert( 'ERROR!!! ' + textStatus );
						break;

					case 400:
						// alert( 'ERROR ' + jqXHR.status + '!!! ' + textStatus );
							flash_notify(
								jqXHR.responseJSON.type,
								jqXHR.responseJSON.message
							);
						break;

					case 401:
						// alert( textStatus );
						console.log('Love');
						if ( typeof  jqXHR.responseJSON.message !== 'undefined' )
						{
							$.messager.alert(
												'Notice',
												jqXHR.responseJSON.message,//'Ssion timeout!',
												'error',
												function () {
													window.location = jqXHR.responseJSON.redirect;//jqXHR.index;
												}
											);
						}
						// $.messager.alert(
						// 					'Notice',
						// 					'Session timeout!',
						// 					'warning',
						// 					function() {
						// 						window.location = base_url + '/index' ;//jqXHR.index;
						// 					}
						// 				);

						break;

					case 403:
							flash_notify(
								'danger',
								'ERROR!!! ' + ( jqXHR.statusText || textStatus ) + ', Please contact your admin'
							);
						break;

					default:
							flash_notify(
								'danger',
								'ERROR!!! ' + textStatus + ', Please contact your admin'
							);
						// alert(  );
						// alert( 'ERROR!!! ' );

				}
				// return false;
			},

			// complete: 	function( event, xhr, options )
			// 			{
			// 				console.log( 'complete' );
			// 			},
		} );

		setTimeout( function() {
						var $notif_message 	= $( '#notif_message' );
						var $notif_close 	= $notif_message.find( ':button' );
						$notif_close.click();
					}, 5000 );

	// } )( jQuery );
