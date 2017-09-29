
	// ( function ( $, DateTimeBox_defaults ) {
		// "use strict";

		$.extend( $.fn.datagrid.defaults.editors, {
			textarea: {
				init: function ( container, options ) {
					var input = $( '<textarea type="textarea" class="form-control datagrid-editable-input">' ).appendTo( container );
					return input;
				},
				destroy: function ( target ) {
					$( target ).remove();
				},
				getValue: function ( target ) {
					return $( target ).val();
				},
				setValue: function ( target, value ) {
					$( target ).val( value );
				},
				resize: function ( target, width ) {
					$( target )._outerWidth( width );
				}
			}
		} );

		$.fn.datetimebox.defaults.required 	= 	true;
		$.fn.datetimebox.defaults.width 		= 	350;
		// $.fn.datetimebox.defaults.panelWidth 	= 	300;

		$.fn.datetimebox.defaults.formatter	= 	function ( date ) {
			var m_date = moment( date ).format( 'YYYY-MM-DD HH:mm:ss' );
			return m_date;
		};

		$.fn.datetimebox.defaults.parser 	=	function ( value ) {
			if ( $.trim( value ) == "" ) {
				return new Date();
			}
			return new Date( value );
		};

	// } )( jQuery, $.fn.datetimebox.defaults );
