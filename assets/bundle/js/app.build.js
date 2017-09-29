webpackJsonp([3],{

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("J+0J");
__webpack_require__("ziQw");
__webpack_require__("Koak");
module.exports = __webpack_require__("fZN5");


/***/ }),

/***/ "J+0J":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var _appHelper = __webpack_require__("ziQw");

// ( function( $ ) {
// "use strict";

$.ajaxSetup({
	type: 'POST',
	dataType: 'JSON',
	data: window.__token,

	success: function success(response, textStatus, jqXHR) {
		console.log('success');
	},
	error: function error(jqXHR, textStatus, errorThrown) {

		console.log(jqXHR);
		console.log(jqXHR.responseJSON);
		// console.log( jqXHR.responseText );
		console.log(textStatus);
		console.log(errorThrown);

		// t_r = false;
		switch (jqXHR.status) {

			case 200:
				console.log(jqXHR.status);
				(0, _appHelper.flash_notify)(jqXHR.responseJSON.type, jqXHR.responseJSON.message);
				// alert( 'ERROR!!! ' + textStatus );
				break;

			case 400:
				// alert( 'ERROR ' + jqXHR.status + '!!! ' + textStatus );
				(0, _appHelper.flash_notify)(jqXHR.responseJSON.type, jqXHR.responseJSON.message);
				break;

			case 401:
				// alert( textStatus );
				console.log('Love');
				if (typeof jqXHR.responseJSON.message !== 'undefined') {
					$.messager.alert('Notice', jqXHR.responseJSON.message, //'Ssion timeout!',
					'error', function () {
						window.location = jqXHR.responseJSON.redirect; //jqXHR.index;
					});
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
				(0, _appHelper.flash_notify)('danger', 'ERROR!!! ' + (jqXHR.statusText || textStatus) + ', Please contact your admin');
				break;

			default:
				(0, _appHelper.flash_notify)('danger', 'ERROR!!! ' + textStatus + ', Please contact your admin');
			// alert(  );
			// alert( 'ERROR!!! ' );

		}
		// return false;
	}

	// complete: 	function( event, xhr, options )
	// 			{
	// 				console.log( 'complete' );
	// 			},
});

setTimeout(function () {
	var $notif_message = $('#notif_message');
	var $notif_close = $notif_message.find(':button');
	$notif_close.click();
}, 5000);

// } )( jQuery );
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("7t+N")))

/***/ }),

/***/ "Koak":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var _appHelper = __webpack_require__("ziQw");

// "use strict";

var announcent_toolbars = [{
	iconCls: 'icon-add',
	handler: function handler() {
		actions.add_row();
	}
}, '-', '-', {
	iconCls: 'icon-undo',
	handler: function handler() {
		actions.cancel_row();
	}
}];
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


var announcement_columns = [{
	field: 'intAnnouncementId',
	title: 'Id',
	sortable: true,
	align: 'center',
	hidden: true
}, {
	field: 'dtmAnnouncementDate',
	title: 'Date',
	sortable: true,
	editor: {
		type: 'datetimebox',
		options: {
			required: true
		}
	}
}, {
	field: 'strAnnouncementTitle',
	title: 'Title',
	width: 100,
	sortable: true,
	editor: {
		type: 'validatebox',
		options: {
			required: true
		}
	}
}, {
	field: 'txtAnnouncementDescription',
	title: 'Description',
	width: 300,
	editor: {
		type: 'textarea',
		options: {
			required: true
		}
	}
}, {
	field: 'blnIsSpecial',
	title: 'Special',
	width: 50,
	align: 'center',
	editor: {
		type: 'checkbox',
		options: {
			on: 1,
			off: 0
		}
	},
	formatter: function formatter(value, row, index) {
		if (value == 1) {
			return 'S';
		} else {
			return 'NS';
		}
	}
}, {
	field: 'blnIsUrgent',
	title: 'Urgent',
	width: 50,
	align: 'center',
	editor: {
		type: 'checkbox',
		options: {
			on: 1,
			off: 0
		}
	},
	formatter: function formatter(value, row, index) {
		if (value == 1) {
			return 'U';
		} else {
			return 'NU';
		}
	}
}];

var actions = {
	add_row: function add_row() {
		if (this.save_row()) {
			announcements.crud_type = 'create';

			announcements.$tbl_element.datagrid('appendRow', {
				index: 0,
				row: {}
			});

			var add_index = announcements.$tbl_element.datagrid('getRows').length - 1;

			announcements.$tbl_element.datagrid('selectRow', add_index).datagrid('beginEdit', add_index);
		}
	},
	cancel_row: function cancel_row(index) {
		// announcements.edit_index = undefined;
		announcements.$tbl_element.datagrid('cancelEdit', index);
	},
	save_row: function save_row(index) {
		if (announcements.edit_index == undefined) {
			return true;
		}

		if (announcements.$tbl_element.datagrid('validateRow', index)) {
			announcements.$tbl_element.datagrid('endEdit', index);
			return true;
		} else {
			announcements.edit_index = undefined;
			return false;
		}
	},
	edit_row: function edit_row(index) {
		console.log(index.target.dataset.editRow);

		if (announcements.edit_index != undefined) {
			this.cancel_row(announcements.edit_index);
		}
		var edit_index = index.target.dataset.editRow;
		// announcements.edit_index = get_row_index( target );
		announcements.$tbl_element.datagrid('refreshRow', edit_index);

		if (this.save_row(edit_index)) {
			announcements.crud_type = 'update';
			announcements.$tbl_element.datagrid('beginEdit', edit_index);
			//.datagrid( 'selectRow', edit_index )
		} else {
			announcements.$tbl_element.datagrid('selectRow', edit_index);
		}
		// app_helper.bind_remove_script_event();
	},
	delete_row: function delete_row(index) {
		announcements.edit_index = index.target.dataset.editRow;

		$.messager.confirm('Delete', 'Are you sure you want to delete the record ?', function (r) {
			if (r) {
				// if ( announcements.edit_index == undefined ){ return }

				announcements.crud_type = 'delete';

				if (!(0, _appHelper.is_empty)(announcements.datas.changes)) {
					var t_r = (0, _appHelper.crud)(announcements.ctrl_url + announcements.crud_type + '/ajax', announcements.datas);

					announcements.$tbl_element.datagrid('cancelEdit', index).datagrid('deleteRow', index);

					// announcements.$tbl_element.datagrid( 'refreshRow', announcements.edit_index );
					announcements.$tbl_element.datagrid('reload');

					// announcements.edit_index = undefined;
				}
			}
		});
	},
	trigger_modal: function trigger_modal(row) {
		var $form = announcements.$mdl_element.find('form');
		var $edit_input = announcements.$mdl_element.find('input[data-edit="edit"]');

		var id = Object.keys(row)[0];

		$edit_input.remove();
		$form.attr('action', announcements.ctrl_url + 'update');
		$form.append('<input type="hidden" id="' + id + '" name="' + id + '" data-edit="edit" />');

		$.each(row, function (key, val) {
			var $input_textarea = $form.find('input#' + key + ' , textarea[name="' + key + '"]');
			var $chk_box = $form.find(':checkbox#' + key + '[value="' + val + '"]');
			var $dtm_box = $form.find('input#' + key + '.date');
			var $div_text_editor = $form.find('div#' + key);
			// console.log();
			$input_textarea.val(val);

			if (val == 1) {
				$chk_box.prop('checked', 'true');
			} else if (val == 0) {
				$chk_box.removeAttr('checked');
			}
			// console.log( $form.find( ':checkbox#'+key+'[value="'+val+'"]' ) 	 )
			$dtm_box.datetimebox({ value: val });
			$div_text_editor.text(val);
		});

		announcements.$mdl_element.modal();
	}
};

var announcements = {
	datas: {},
	crud_type: undefined,
	edit_index: undefined,
	_init: function _init() {
		this.ctrl_url = 'announcements/';

		this._cache_dom();
		this._render();
		this._init_datagrid();
	},
	_cache_dom: function _cache_dom() {
		this.$tbl_element = $('#tblAnnncmnts');

		this.$mdl_element = $('#mdlForm');
		this.$dtm_box = $('#dtmAnnouncementDate');
		this.$txt_editor = $('#txtAnnouncementDescription');
	},
	_bind_events: function _bind_events() {},
	_render: function _render() {
		this.$dtm_box.datetimebox();
		this.$txt_editor.texteditor({
			name: 'txtAnnouncementDescription'
		});
	},
	_init_datagrid: function _init_datagrid() {
		this.$tbl_element.datagrid({
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
			columns: [announcement_columns.concat([{
				field: 'strUpdatedById',
				title: 'Updated by ',
				sortable: true,
				align: 'center',
				formatter: function formatter(value, row, index) {
					return row.updatedBy;
				}
			}, {
				field: 'dtmDateUpdated',
				title: 'Date Updated',
				sortable: true
			}, {
				field: 'strInsertedById',
				title: 'Posted by',
				sortable: true,
				align: 'center',
				formatter: function formatter(value, row, index) {
					return row.insertedBy;
				}
			}, {
				field: 'dtmDateInserted',
				title: 'Date Posted',
				sortable: true
			}, {
				field: 'action',
				title: 'Action',
				// width: 		60,
				align: 'center',
				formatter: function formatter(value, row, index) {
					if (announcements.edit_index != undefined) {
						var save_row = '<a href="javascript:void( 0 )" onclick="announce.save_row( ' + index + ' )">Save</a> 	';
						var cancel_row = '<a href="javascript:void( 0 )" onclick="announce.cancel_row( ' + index + ' )">Cancel</a>	';

						return save_row + cancel_row;
					} else {
						var edit_row = '<a href="javascript:void( 0 )" data-edit-row="' + index + '">Edit</a> 	';
						var delete_row = '<a href="javascript:void( 0 )" data-delete-row="' + index + '">Delete</a>	';

						return edit_row + delete_row;
					}
				}
			}])],
			onLoadSuccess: function onLoadSuccess() {
				announcements.edit_index = undefined;
				$(this).datagrid('resize');

				$('a[data-edit-row]').off('click');
				$('a[data-delete-row]').off('click');
				$('a[data-edit-row]').on('click', actions.edit_row.bind(actions));
				$('a[data-delete-row]').on('click', actions.delete_row.bind(actions));
			},
			onSelect: function onSelect(index, row) {
				announcements.edit_index = index;
				console.log(index);
			},
			onClickRow: function onClickRow(index, row) {
				//onSelect
				announcements.datas = {
					row: row
				};
			},
			onDblClickRow: function onDblClickRow(index, row) {
				if (row['intAnnouncementId'] != undefined) {
					actions.trigger_modal(row);
				}
			},
			onBeforeEdit: function onBeforeEdit(index, row) {
				announcements.edit_index = index;
				$(this).datagrid('unselectAll').datagrid('refreshRow', index);
				// .datagrid( 'selectRow', index )
			},
			// onBeginEdit: function ( index, row ) {
			// },
			onEndEdit: function onEndEdit(index, row, changes) {
				row.editing = false;
				announcements.datas = {
					row: row,
					changes: changes
				};

				if (!(0, _appHelper.is_empty)(announcements.datas.changes)) {
					var t_r = (0, _appHelper.crud)(announcements.ctrl_url + announcements.crud_type + '/ajax', announcements.datas);
				}
				$(this).datagrid('refreshRow', index);

				announcements.edit_index = undefined;
			},
			onAfterEdit: function onAfterEdit(index, row) {
				announcements.edit_index = undefined;
				$(this).datagrid('reload');
			},
			onCancelEdit: function onCancelEdit(index, row) {
				announcements.edit_index = undefined;
				$(this).datagrid('refreshRow', index);
			}
		});
	}
};

announcements._init();

window.announce = {
	save_row: actions.save_row,
	cancel_row: actions.cancel_row,
	edit_row: actions.edit_row,
	delete_row: actions.delete_row
};

//# sourceURL=https://announcements-app
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("7t+N")))

/***/ }),

/***/ "fZN5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

(function () {

	var login = /*function () (*/{

		init: function init() {
			this.cache_dom();
			this.bind_events();
			this.render();
		},
		cache_dom: function cache_dom() {
			// body...
			this.$form = $('form');
			this.url = this.$form.attr('action');

			this.$el_txt_user_name = $('#txtUsername');
			this.$el_txt_password = $('#txtPassword');
			this.$el_btn_login = $('#btnLogin');
		},
		bind_events: function bind_events() {
			// event handlers
			this.$el_btn_login.on('click', this.submit_login.bind(this));
			// event handlers
		},
		render: function render() {},
		submit_login: function submit_login(event) {
			event.preventDefault();

			var val_user_name = this.$el_txt_user_name.val();
			var val_password = this.$el_txt_password.val();

			$.ajax({
				url: base_url + 'index/login',
				type: 'POST',
				dataType: 'JSON',
				data: {
					txtUserName: val_user_name,
					txtPassword: val_password
				}
				// success: 	function ( response, textStatus, jqXHR ) {
				// 				// app_helper.flash_notify( response.type, response.message );
				// 				if ( response.type == 'redirect' )
				// 				{
				// 					console.log(response);
				// 					window.location.assign( response.message ) ;
				// 				}
				// }
			}).done(function (response, textStatus, jqXHR) {
				if (response.type == 'redirect') {
					console.log(response);
					window.location.assign(response.message);
				}
			});
			// app_helper.check_script_tags( val_user_name );
		}
		/*)*/ };

	login.init();
})();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("7t+N")))

/***/ }),

/***/ "ziQw":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.flash_notify = flash_notify;
exports.is_empty = is_empty;
exports.crud = crud;
exports.remove_edit = remove_edit;
exports.bind_remove_script_event = bind_remove_script_event;

// export function app_helper() {
// "use strict";

function flash_notify(type, message) {
	console.log($.fn);
	$.notify({
		message: message
	}, {
		type: type,
		placement: {
			align: "center"
		},
		timer: 5000 //30000//
	});
};

function is_empty(obj) {
	if (typeof obj !== 'undefined') {
		return Object.keys(obj).length === 0;
	} else {
		return false;
	}
};

function crud(path, datas) {
	var t_r;

	$.ajax({
		url: base_url + path,
		data: datas.row,
		type: 'POST',
		dataType: 'JSON',
		success: function success(response_data, textStatus, jqXHR) {
			flash_notify(response_data.type, response_data.message);
			t_r = true;
		}
	});

	return t_r;
};

function remove_edit(mdlId) {
	var $modal = $(mdlId);
	var $form = $modal.find('form');
	var $edit_input = $modal.find('input[data-edit="edit"]');

	$form.find('input:text, textarea').val('');
	$form.find('div.texteditor-body').text('');
	$form.find(':checkbox').removeAttr('checked');

	$edit_input.remove();
};

function bind_remove_script_event() {
	var $input_elements = $('input:text, textarea');

	$input_elements.on('blur change', function (event) {
		console.log($(this).val());
		var temp_value = $(this).val();
		$(this).val(_check_script_tags(temp_value));
	});

	var $div_txt_editor = $('div.texteditor-body');

	$div_txt_editor.on('blur change', function (event) {
		console.log($(this).text());
		var temp_value = $(this).text();
		$(this).text(_check_script_tags(temp_value));
	});
};

function _check_script_tags(value) {
	var pattern = /(<script[^>]*>)(\D*?)(<\/script>)|<script>|<\/script>/ig;

	if (pattern.test(value)) {
		var new_value = value.replace(pattern, '');
	} else {
		var new_value = value;
	}

	return new_value;
};

/*return	{
	crud: crud,
	flash_notify: flash_notify,
	is_empty: is_empty,
	remove_edit: remove_edit,
	// _check_script_tags	: check_script_tags,s
	bind_remove_script_event: bind_remove_script_event,
};*/
// }
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("7t+N")))

/***/ })

},[3]);
//# sourceMappingURL=app.build.js.map