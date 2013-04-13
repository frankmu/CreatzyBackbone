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
    initialize: function() {

    },
    url: function() {
        return "http://note.creatzy.com/notebook/getBookList";
    },
});

var NotebookView = Backbone.View.extend({
    tagName: "li",
    className: "Notebook",
    events: {
    	"click .bookname": "openNotebook",
    },
    
    openNotebook:function(){
    	console.log(this.model.get('id'));
    	if(this.notesView==undefined)  this.notesView=new NotesView({
    	    el: "#content",
    	    notebookid: this.model.get('id'),
    	});
    	this.notesView.render();
    },
   
    render: function() {
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
    	return $(this.el).html("<div class='bookname'>"+this.model.get('name')+"</div>");
    },
});

var NotebooksView = Backbone.View.extend({
    className: "Notebooks",
    tagName: "ul",
   
    render: function() {
        //$(this.el).html('');   
        this.collection.each(function(notebook) {
            var notebookView = new NotebookView({
                model: notebook,
            });
            $(this.el).append(notebookView.render());
            //console.log($(this.el));
        }, this);
        return $(this.el);
    }

});


var myNotebooks = new Notebooks();

var myNotebooksView = new NotebooksView({
    
    collection: myNotebooks
});
myNotebooks.fetch({
    success: function(collection) {
       
    	$('#content').html(myNotebooksView.render());

    }
});

