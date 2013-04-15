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
		$("#addNewNotebookButton").css("display","none");
		$("#addNewNoteButton").css("display","block");

	},

	noteBookList : function() {
		console.log("notebooklist");
		var newNotebooksView = new NotebooksView({'q':'getBookList'});
		this.changePage(newNotebooksView);
		$("#addNewNotebookButton").css("display","block");
		$("#addNewNoteButton").css("display","none");
		
	},
	getPublicBookList : function() {
		console.log("getPublicBookList");
		var newNotebooksView = new NotebooksView({'q':'getPublicBookList'});
		this.changePage(newNotebooksView);
		$("#addNewNotebookButton").css("display","block");
		$("#addNewNoteButton").css("display","none");
		
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

$("#createNewNotebookButton").live("click", function(){ 
	var newNotebookName = $("#newNotebookName").val();
    console.log(newNotebookName);
    if(newNotebookName != ""){
        $.ajax({
            type: "POST",
            url: "http://note.creatzy.com/notebook/createNotebook",
            data: { strNotebookName: newNotebookName},
            success: function (res) { 
                console.log(res);
                $("#add-notebook").panel("close");
                appRouterInstance.navigate("NoteBookList", {trigger: true});
            }
        });
    }else{
    	$("#add-notebook").panel("close");
	}
    
}); 