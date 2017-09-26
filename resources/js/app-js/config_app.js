
		var base_url = '<?php echo base_url(); ?>';
		var wss_url  = '<?php echo preg_replace( '/(http:\/\/)|(https:\/\/)/i', 'wss://', base_url() ) ?>';
		( function(  ) {

			"use strict";

			console.log( '<?php echo session_name().':'.session_id(); ?>' );

			$.ajaxSetup(
						{
							type: 		'POST',
							dataType: 	'JSON',
							data: 		{
											<?php echo $this->security->get_csrf_token_name(); ?>
											:
											'<?php echo $this->security->get_csrf_hash(); ?>'
										},

							success: 	function( response, textStatus, jqXHR )
										{
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
													app_helper.flash_notify(
										                        			jqXHR.responseJSON.type,
										                        			jqXHR.responseJSON.message
											                        	);
													// alert( 'ERROR!!! ' + textStatus );
													break;

												case 400:
													// alert( 'ERROR ' + jqXHR.status + '!!! ' + textStatus );
													app_helper.flash_notify(
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
													app_helper.flash_notify(
										                        			'danger',
										                        			'ERROR!!! ' + ( jqXHR.statusText || textStatus ) + ', Please contact your admin'
											                        	);
													break;

												default:
													app_helper.flash_notify(
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
						}
					);

			setTimeout(
						function() {

							var $notif_message 	= $( '#notif_message' );
							var $notif_close 	= $notif_message.find( ':button' );
							$notif_close.click();

						},
						5000
					);

		} )();
