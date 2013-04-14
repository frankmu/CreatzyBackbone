var AppRouter = Backbone.Router.extend({

	routes : {
		//"help" : "help", // #help
		//"search/:query" : "search", // #search/kiwis
		//"search/:query/p:page" : "search", // #search/kiwis/p7
		"NoteBookList" : "noteBookList",
		"NoteBook/:notebookid" : "noteList",
	},

	help : function() {

	},

	noteList : function(notebookid) {
		console.log(notebookid);
		newNotesView = new NotesView({
			notebookid : notebookid,
		});
		this.changePage(newNotesView);

	},

	noteBookList : function() {
		console.log("notebooklist");
		var newNotebooksView = new NotebooksView();
		this.changePage(newNotebooksView);
		
	},
	changePage : function(page) {
		//$(page.el).attr('data-role', 'page');
		page.render();
		$('#content').html($(page.el));
		//$.mobile.changePage($(page.el), {changeHash:false});
		//$('#content').trigger('create');
		//$.mobile.changePage($(page.el), {changeHash:false});
	},
});

//$(document).bind("mobileinit", function() {
	console.log("shutdown JQM router");
	$.mobile.ajaxEnabled = false;
	$.mobile.linkBindingEnabled = false;
	$.mobile.hashListeningEnabled = false;
	$.mobile.pushStateEnabled = false;
//});

var appRouterInstance = new AppRouter();
Backbone.history.start();