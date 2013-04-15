var AppRouter = Backbone.Router.extend({

	routes : {
		//"help" : "help", // #help
		//"search/:query" : "search", // #search/kiwis
		//"search/:query/p:page" : "search", // #search/kiwis/p7
		"NoteBookList" : "noteBookList",
		"getPublicBookList" : "getPublicBookList",
		"NoteBook/:notebookid" : "noteList",
		"Usersetting" : "usersetting",
	},

	help : function() {

	},
	usersetting : function() {
		userSettingView = new UserSettingView({
		});
		this.changePage(userSettingView);

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
		var newNotebooksView = new NotebooksView({'q':'getBookList'});
		this.changePage(newNotebooksView);
		
	},
	getPublicBookList : function() {
		console.log("getPublicBookList");
		var newNotebooksView = new NotebooksView({'q':'getPublicBookList'});
		this.changePage(newNotebooksView);
		
	},
	changePage : function(page) {
		//$(page.el).attr('data-role', 'page');
		page.afterrender=function(){
			$('#content').html($(page.el));
			$('#content').trigger('create');
		}
		page.render();
		// setTimeout(function(){
			// $('#content').html($(page.el));
			// $('#content').trigger('create');
		// },500)
		
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