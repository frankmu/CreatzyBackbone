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
		//$('#content').html(newNotesView.render());
		this.changePage(newNotesView);

	},

	noteBookList : function() {
		console.log("hotebooklist");

		var myNotebooks = new Notebooks();

		var myNotebooksView = new NotebooksView({
			collection : myNotebooks
		});
		that = this;
		myNotebooks.fetch({
			success : function(collection) {

				//$('#content').html(myNotebooksView.render());
				//$('#content').trigger('create');
				that.changePage(myNotebooksView);
			}
		});
	},
	changePage : function(page) {
		$(page.el).attr('data-role', 'page');
		page.render();
		$('#content').html($(page.el));
		$('#content').trigger('create');
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
$('div[data-role="page"]').live('pagehide', function(event, ui) {
	$(event.currentTarget).remove();
});
var appRouterInstance = new AppRouter();
Backbone.history.start();