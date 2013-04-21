var NoteContent = Backbone.Model.extend({
    initialize: function(options) {
    	this.id=options.noteid;
        //alert('Hey, you create me!');
    },
    url: function(){
    	return "http://note.creatzy.com/notes/getNoteContent?noteId="+this.id;
    },
    defaults: {
    	"id":0,
    	"notebook_id":'',
    	"notename":'',
    	"create_date":'',
    	"last_modify":'',
    	"content":'',
    },
});

var NoteContentView = Backbone.View.extend({
    tagName: "div",
    className: "NoteContent",
    events: {
        "click .notename": "openNote",
    },
    initialize:function(options){

    	
    	this.model=new NoteContent({
    		noteid:options.noteid,
    	});
    	that=this;
    	this.model.fetch({
    	    success: function(model) {
    	       //console.log(model);
    	       that.render();
    	    }
    	});
    	
    },
   
    render: function() {
         $(this.el).html('');
         console.log(this.model);
         console.log(this.model.get('content'));
         data = {
            'noteID': this.model.get('id'),
            "noteName": this.model.get('notename'),
			'notebook_id':this.model.get('notebook_id'),
	    	'create_date':this.model.get('notename'),
	    	'last_modify':this.model.get('create_date'),
	    	'noteContent':this.model.get('content'),
         };
         console.log(data);
         my = this;
         dust.render("noteedit", data, function(err, out) {
             if(!err) {
                 $(my.el).html(out.toString());
             } else {
                 return console.log(err);
             }
             console.log($(my.el).html());
         });
         this.afterrender();

         $("#saveNoteButton").live("click",function(){
            var saveNoteData = {
                'noteId': my.model.get('id'),
                //'notebookId':my.model.get('notebook_id'),
                'notename': $("#noteName").val(),
                'content': $("#noteContent").val(),
            };
            $.ajax({
                type: "POST",
                url: "http://note.creatzy.com/notes/saveNote",
                data : saveNoteData,
                success: function (res) { 
                    console.log("success");
                    appRouterInstance.navigate("NoteBook/"+my.model.get('notebook_id'), {trigger: true});
                }
            });
        });

         return $(my.el);
    	//return $(this.el).html(this.model.get('notename'));
    },
});

