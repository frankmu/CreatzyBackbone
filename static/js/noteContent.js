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
    tagName: "li",
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
	    	'content':this.model.get('content'),
         };
         console.log(data);
         my = this;
         dust.render("notecontent", data, function(err, out) {
             if(!err) {
                 $(my.el).html(out.toString());
             } else {
                 return console.log(err);
             }
             console.log($(my.el).html());
         });
         this.afterrender();
         return $(my.el);
    	//return $(this.el).html(this.model.get('notename'));
    },
});

