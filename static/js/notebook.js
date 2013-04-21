Backbone.emulateHTTP = true;
Backbone.emulateJSON = true;

var Notebook = Backbone.Model.extend({
    initialize: function() {
        //alert('Hey, you create me!');
    },
    defaults: {
        'user_id':0,
        'name':"defalt",
        'date':"",
        'template_id':0,
        'notes_num':0,
        'private':0,
        'id':0,
    },
});

var Notebooks = Backbone.Collection.extend({
    model: Notebook,
    initialize: function(models,options) {
    	this.q=options.q
    },
    url: function() {
        url="http://note.creatzy.com/notebook/"+this.q;
        return url;
    },
});

var NotebookView = Backbone.View.extend({
    tagName: "li",
    className: "Notebook",
    events: {
    	//"click .bookname": "openNotebook",
    },
    
    openNotebook:function(){
    	console.log(this.model.get('id'));
        //window.location.href = "NoteNook/"+this.model.get('id');
        //appRouterInstance.navigate("NoteBook/"+this.model.get('id'));
        appRouterInstance.navigate("NoteBook/"+this.model.get('id'), {trigger: true});
        //app.navigate("NoteNook/"+this.model.get('id'), {trigger: true});

    },
   
    render: function() {
     	
        $(this.el).html('');
        data = {
            "notebookID": this.model.get('id'),
            "notebookName": this.model.get('name'),
            "private":this.model.get('private'),
//            "pic": this.model.get('pic'),
//            "address": this.model.get('address'),
//            "reward_number": this.model.get('rewards').length,
        };
        that = this;
        dust.render("notebooklist", data, function(err, out) {
            //console.log(out);
            if(!err) {
                $(that.el).html(out.toString());

                



            } else {
                return console.log(err);
            }
        });
       //

        return $(this.el);
    	// return $(this.el).html("<div class='bookname'>"+this.model.get('name')+"</div>");
    },
});

var NotebooksView = Backbone.View.extend({
    className: "Notebooks",
    tagName: "ul",
    initialize:function(options){
    	
    	
    	var notebooksCollection = new Notebooks([],{'q':options.q});
    	this.collection=notebooksCollection;
		that = this;
		notebooksCollection.fetch({
			success : function(collection) {

				//$('#content').html(myNotebooksView.render());
				//$('#content').trigger('create');
				//that.changePage(myNotebooksView);
				that.render();
			}
		});
    	
    },
   
    render: function() {
        //$(this.el).html('');   
        $(this.el).attr("data-role","listview");
        $(this.el).attr("data-filter","true");
        $(this.el).attr("data-split","d");
        $(this.el).attr("data-split-icon","delete");


        $(this.el).html(''); 
        //$(this.el).css("display","none");
        this.collection.each(function(notebook) {
            var notebookView = new NotebookView({
                model: notebook,
            });
            $(this.el).append(notebookView.render());
            //console.log($(this.el));
        }, this);
        this.afterrender();
        return $(this.el);
    },
    afterrender:function(){
    	console.log("after redner")
    }

});


$('.deleteButton').live('click', function() {
    console.log("clicked");
    
    $(this).simpledialog({
        //'mode' : 'string',
        'prompt' : 'Do you really want to delete Notebook ' + $(this).attr('data-name') + '?',
        'buttons' : {
            'OK' : {
                click : function() {
                    that=this;
                    if($(this).hasClass("deleteNotebookButton")) {
                        console.log("delete notebook"+$(that).attr('data-id'));
                        $.ajax({
                            url:"http://note.creatzy.com/notebook/deleteBook",
                            data: { noteBookId: $(that).attr('data-id')},
                            success: function(){  
                                alert("deleteNotebookButton success");
                            },
                        })  
                    }
                    else if($(this).hasClass("deleteNoteButton")) {
                        console.log("delete note"+$(that).attr('data-id'));
                        $.ajax({
                            url:"http://note.creatzy.com/notes/deleteNote",
                            data: { noteId: $(that).attr('data-id')},
                            success: function(){  
                                alert("deleteNoteButton success");
                            },
                        })  
                    }
                    //$('#dialogoutput').text($('#dialoglink').attr('data-string'));
                }
            },
            'Cancel' : {
                click : function() {
                },
            icon : "delete",
            theme : "c"
            }
        }
    })
});
$("#saveNoteButton").live("click",function(){
    var saveNoteData = {
        'noteId': $(".NoteContent").attr("note-id"),
        'notebookId':$(".Notes").attr("notebook-id"),
        'notename': $("#noteName").val(),
        'content': $("#noteContent").val(),
    };
    console.log(saveNoteData);

    // $.ajax({
    //     type: "POST",
    //     url: "http://note.creatzy.com/notes/saveNote",
    //     data : saveNoteData,
    //     success: function (res) { 
    //         console.log("success");
    //         appRouterInstance.navigate("NoteBook/"+my.model.get('notebook_id'), {trigger: true});
    //     }
    // });
});
$('#addNewNoteButton').live('click', function() {
    console.log($(".Notes").attr("notebook-id"));

    appRouterInstance.navigate("NewNote", {trigger: true});
});




