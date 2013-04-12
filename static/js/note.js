Backbone.emulateHTTP = true;
Backbone.emulateJSON = true;

var Note = Backbone.Model.extend({
    initialize: function() {
        //alert('Hey, you create me!');
    },
    defaults: {
    	id:0,
    	user_id:0,
    	notebook_id:0,
    	notename:'',
    	create_date:'',
    	last_modify:'',
    	content:'',
    },
});

var Notes = Backbone.Collection.extend({
    model: Note,
    notebookid:0,
    initialize: function(options) {
    	this.notebookid=options.notebookid;
    },
    url: function() {
        return "http://note.creatzy.com/notes/getNoteList?notebookId="+this.notebookid;
    },
});

var NoteView = Backbone.View.extend({
    tagName: "li",
    className: "Note",
    events: {
        

    },
   
    render: function() {
    	//console.log("rr");
//        $(this.el).html('');
//        data = {
//            "orgId": this.model.get('orgId'),
//            "orgName": this.model.get('name'),
//            "pic": this.model.get('pic'),
//            "address": this.model.get('address'),
//            "reward_number": this.model.get('rewards').length,
//        };

//        that = this;
//        dust.render("org", data, function(err, out) {
//            if(!err) {
//                $(that.el).html(out.toString());
//            } else {
//                return console.log(err);
//            }
//        });
//        return this;
    	return $(this.el).html(this.model.get('notename'));
    },
});

var NotesView = Backbone.View.extend({
    className: "Notes",
    tagName: "ul",
    initialize:function(options){
    	this.notebookid=options.notebookid;
    	console.log(this.notebookid);
    	var notesCollection=new Notes({notebookid:this.notebookid});
    	this.collection=notesCollection;
    	that=this;
    	console.log(notesCollection.url());
    	notesCollection.fetch({
    	    success: function(collection) {
    	       console.log(collection);
    	       that.render();

    	    }
    	});
    	
    },
   
    render: function() {
        $(this.el).html('');   
        this.collection.each(function(note) {
        	//console.log(note);
            var noteView = new NoteView({
                model: note,
            });
            $(this.el).prepend(noteView.render());
            //console.log($(this.el));
        }, this);
    }

});



