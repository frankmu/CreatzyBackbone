var AppRouter = Backbone.Router.extend({

	routes : {
		//"help" : "help", // #help
		//"search/:query" : "search", // #search/kiwis
		//"search/:query/p:page" : "search", // #search/kiwis/p7
		"" : "loginView",
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
		$("#addNewNotebookButton").css("display","none");
		$("#addNewNoteButton").css("display","none");

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
		bindNewBookFunction(newNotebooksView);
		$("#addNewNoteButton").css("display","none");
		
	},
	getPublicBookList : function() {
		console.log("getPublicBookList");
		var newNotebooksView = new NotebooksView({'q':'getPublicBookList'});
		this.changePage(newNotebooksView);
		$("#addNewNotebookButton").css("display","none");
		$("#addNewNoteButton").css("display","none");
		
	},
	loginView: function(){
		var loginView = new LoginView();
		this.changePage(loginView);
		$("#addNewNotebookButton").css("display","none");
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


function bindNewBookFunction(newNotebooksView){
	$("#createNewNotebookButton").off("click"); 
	$("#createNewNotebookButton").live("click", function(){ 
		$("#createNewNotebookButton").off("click"); 
		var newNotebookName = $("#newNotebookName").val();
	    console.log(newNotebookName);
	    if(newNotebookName != ""){
	        $.ajax({
	            type: "POST",
	            url: "http://note.creatzy.com/notebook/createNotebook",
	            data: { strNotebookName: newNotebookName},
	            success: function (res) { 
	            	res=jQuery.parseJSON( res );
	            	res=res[0];
	                //console.log(res.noteBookInfo);
	                $("#add-notebook").panel("close");
	                newNoteBookModel=new Notebook(res);
	                newNotebooksView.collection.add(newNoteBookModel);
	                newNotebooksView.render();
	                appRouterInstance.navigate("NoteBookList", {trigger: false});
	            }
	        });
	    }else{
	    	$("#add-notebook").panel("close");
		}    
	}); 
	
}