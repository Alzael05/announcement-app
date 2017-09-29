
	/*import 'easyui-configs';

	class Announcement {
		constructor() {

		}

		function init() {

		}

		function bind_events () {

		}

		function render () {

		}
	}*/
	import { is_empty, crud } from './app-helper';

	window.announce = ( function () {
		// "use strict";

		var announcent_toolbars = [
			{
				iconCls: 'icon-add',
				handler: function() {
					actions.add_row();
				}
			},
			'-',
			'-',
			{
				iconCls: 'icon-undo',
				handler: function() {
					actions.cancel_row();
				}
			},
		];

		var announcement_columns = 	[
			{
				field: 		'intAnnouncementId',
				title: 		'Id',
				sortable: 	true,
				align: 		'center',
				hidden: 	true,
			},
			{
				field: 		'dtmAnnouncementDate',
				title: 		'Date',
				sortable: 	true,
				editor: 	{
								type: 	'datetimebox',
								options:{
											required: true
										},
							},
			},
			{
				field: 		'strAnnouncementTitle',
				title: 		'Title',
				width: 		100,
				sortable: 	true,
				editor: 	{
								type: 	'validatebox',
								options:{
											required: true
										}
							}
			},
			{
				field: 		'txtAnnouncementDescription',
				title: 		'Description',
				width: 		300,
				editor: 	{
								type: 	'textarea',
								options:{
											required: 	true
										}
							}
			},
			{
				field: 		'blnIsSpecial',
				title: 		'Special',
				width: 		50,
				align: 		'center',
				editor: 	{
								type: 		'checkbox',
								options:	{
												on: 	1,
												off: 	0
											}
							},
				formatter: 	function ( value, row, index ) {
								if ( value == 1 ) {
									return 'S';
								}
								else {
									return 'NS';
								}
							}
			},
			{
				field: 		'blnIsUrgent',
				title: 		'Urgent',
				width: 		50,
				align: 		'center',
				editor: 	{
								type: 		'checkbox',
								options:	{
												on: 	1,
												off: 	0
											}
							},
				formatter: 	function ( value, row, index ) {
								if ( value == 1 ) {
									return 'U';
								}
								else {
									return 'NU';
								}

							}
			},
		];

		var actions = {
			add_row: function () {
				if ( this.save_row() ) {
					announcements.crud_type = 'create';

					announcements.$tbl_element.datagrid(
											'appendRow',
											{
												index: 	0,
												row: 	{}
											}
										);

					var add_index = announcements.$tbl_element.datagrid( 'getRows' ).length - 1;

					// console.log( announcements.add_index );

					announcements.$tbl_element.datagrid( 'selectRow', add_index )
												.datagrid( 'beginEdit', add_index );
				}
			},
			cancel_row: function ( index ) {
				// announcements.edit_index = undefined;
				announcements.$tbl_element.datagrid( 'cancelEdit', index );
			},
			save_row: function ( index ) {
				if ( announcements.edit_index == undefined ) { return true; }

				if ( announcements.$tbl_element.datagrid( 'validateRow', index ) ) {
					announcements.$tbl_element.datagrid( 'endEdit', index );
					return true;
				} else {
					announcements.edit_index = undefined;
					return false;
				}
			},
			edit_row: function ( index ) {
				if ( announcements.edit_index != undefined ) {
					this.cancel_row();
				}
				// announcements.edit_index = get_row_index( target );
				announcements.$tbl_element.datagrid( 'refreshRow', index );

				if ( this.save_row( index ) ) {
					announcements.crud_type = 'update';
					announcements.$tbl_element.datagrid( 'beginEdit', index );
											//.datagrid( 'selectRow', announcements.edit_index )
				} else {
					announcements.$tbl_element.datagrid( 'selectRow', index );
				}
				// app_helper.bind_remove_script_event();
			},
			delete_row: function ( index ) {
				$.messager.confirm(
					'Delete',
					'Are you sure you want to delete the record ?',
					function( r ) {
						if ( r ) {
							// if ( announcements.edit_index == undefined ){ return }

							announcements.crud_type = 'delete';

							if ( ! is_empty( announcements.datas.changes ) ) {
								var t_r = crud(
									announcements.ctrl_url + announcements.crud_type + '/ajax',
									announcements.datas
								);

								announcements.$tbl_element.datagrid( 'cancelEdit', 	index )
														  .datagrid( 'deleteRow', index );

								// announcements.$tbl_element.datagrid( 'refreshRow', announcements.edit_index );
								announcements.$tbl_element.datagrid( 'reload' );

								// announcements.edit_index = undefined;
							}
						}
					}
				);
			},
			trigger_modal: function ( row ) {
				var $form = announcements.$mdl_element.find( 'form' );
				var $edit_input = announcements.$mdl_element.find( 'input[data-edit="edit"]' );

				var id = Object.keys( row )[ 0 ];

				$edit_input.remove();
				$form.attr( 'action', announcements.ctrl_url + 'update' );
				$form.append( '<input type="hidden" id="'+id+'" name="'+id+'" data-edit="edit" />' );

				$.each( row,
						function( key, val ) {
							var $input_textarea  = $form.find( 'input#'+key+' , textarea[name="'+key+'"]' );
							var $chk_box         = $form.find( ':checkbox#'+key+'[value="'+val+'"]' );
							var $dtm_box         = $form.find( 'input#'+key+'.date' );
							var $div_text_editor = $form.find( 'div#'+key );
							// console.log();
							$input_textarea.val( val );

							if ( val == 1 ) {
								$chk_box.prop( 'checked', 'true' );
							}
							else if ( val == 0 ) {
								$chk_box.removeAttr( 'checked' );
							}
							// console.log( $form.find( ':checkbox#'+key+'[value="'+val+'"]' ) 	 )
							$dtm_box.datetimebox( { value: val } );
							$div_text_editor.text( val );
						} );

				announcements.$mdl_element.modal();
			}
		}

		var announcements = {
			datas: {},
			crud_type: undefined,
			edit_index: undefined,
			_init: function () {
				this.ctrl_url = 'announcements/';

				this._cache_dom();
				this._render();
				this._init_datagrid();
			},
			_cache_dom: function () {
				this.$tbl_element = $( '#tblAnnncmnts' );

				this.$mdl_element = $( '#mdlForm' );
				this.$dtm_box     = $( '#dtmAnnouncementDate' );
				this.$txt_editor  = $( '#txtAnnouncementDescription' );
			},
			_bind_events: function () {

			},
			_render: function () {
				this.$dtm_box.datetimebox();
				this.$txt_editor.texteditor(
					{
						name: 'txtAnnouncementDescription',
					}
				);
			},
			_init_datagrid: function () {
				this.$tbl_element.datagrid( {
					url: base_url + announcements.ctrl_url + 'retrieve',
					method: 'POST',
					striped: true,
					fitColumns: true,
					pagination: true,
					rownumbers: true,
					singleSelect: true,
					emptyMsg: 'No records available.',
					// idField: 		'strAnnouncementId',
					toolbar: announcent_toolbars,
					columns: [ announcement_columns.concat( [
								{
									field: 		'strUpdatedById',
									title: 		'Updated by ',
									sortable: 	true,
									align: 		'center',
									formatter: 	function ( value, row, index ) {
													return row.updatedBy;
												}
								},
								{
									field: 		'dtmDateUpdated',
									title: 		'Date Updated',
									sortable: 	true,
								},
								{
									field: 		'strInsertedById',
									title: 		'Posted by',
									sortable: 	true,
									align: 		'center',
									formatter: 	function ( value, row, index ) {
													return row.insertedBy;
												}
								},
								{
									field: 		'dtmDateInserted',
									title: 		'Date Posted',
									sortable: 	true,
								},
								{
									field: 		'action',
									title: 		'Action',
									// width: 		60,
									align: 		'center',
									formatter: 	function ( value, row, index ) {
													if ( announcements.edit_index != undefined ) {
														var save_row   = '<a href="javascript:void( 0 )" onclick="announce.save_row( '+index+' )">Save</a> 	';
														var cancel_row = '<a href="javascript:void( 0 )" onclick="announce.cancel_row( '+index+' )">Cancel</a>	';

														return save_row + cancel_row;
													} else {
														var edit_row   = '<a href="javascript:void( 0 )" onclick="announce.edit_row( '+index+' )">Edit</a> 	';
														var delete_row = '<a href="javascript:void( 0 )" onclick="announce.delete_row( '+index+' )">Delete</a>	';

														return edit_row + delete_row;
													}
												}
								}
					] ) ],
					onLoadSuccess: function () {
						announcements.edit_index = undefined;
						$( this ).datagrid( 'resize' );
					},
					onClickRow: function ( index, row ) { //onSelect
						// console.log(index)
						announcements.datas = {
							row
						};
					},
					onDblClickRow: function ( index, row ) {
						if ( row[ 'intAnnouncementId' ] != undefined ) {
							actions.trigger_modal( row );
						}
					},
					onBeforeEdit: function ( index, row ) {
						announcements.edit_index = index;
						$( this ).datagrid( 'unselectAll' )
								 .datagrid( 'refreshRow', index );
								 // .datagrid( 'selectRow', index )
					},
					// onBeginEdit: function ( index, row ) {
					// },
					onEndEdit: function ( index, row, changes ) {
						row.editing = false;
						announcements.datas = {
							row,
							changes,
						};

						if ( ! is_empty( announcements.datas.changes ) ) {
							var t_r = crud(
								announcements.ctrl_url + announcements.crud_type + '/ajax',
								announcements.datas
							);
						}
						$( this ).datagrid( 'refreshRow', index );

						announcements.edit_index = undefined;
					},
					onAfterEdit: function ( index, row ) {
						announcements.edit_index = undefined;
						$( this ).datagrid( 'reload' );
					},
					onCancelEdit: function ( index, row ) {
						announcements.edit_index = undefined;
						$( this ).datagrid( 'refreshRow', index );
					}
				} );
				// return 	this.$tbl_element;
			}
		}

					// function get_row_index ( target ) {

					// 	var tr = $( target ).closest( 'tr.datagrid-row' );
					// 	return parseInt( tr.attr( 'datagrid-row-index' ) );

					// };


			// function get_main_table( target )
			// {
			// 	var tr = $( target ).find( 'table[class="datagrid-f"]' );
			// 	return tr;
			// 	// return parseInt( tr.attr( 'datagrid-row-index' ) );
			// }

		announcements._init();
		/*(
			function() {

				$( '#mdlForm' ).on(
									'hidden.bs.modal',
									function( event ) {

										// console.log('May');
										app_helper.remove_edit( this );

									}
								);

				app_helper.bind_remove_script_event();
			}

		)();*/
		return {
			save_row: 	actions.save_row,
			cancel_row: actions.cancel_row,
			edit_row: 	actions.edit_row,
			delete_row: actions.delete_row,
		}
	} )();

//# sourceURL=https://announcements-app
