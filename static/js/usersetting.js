Backbone.emulateHTTP = true;
Backbone.emulateJSON = true;

var User = Backbone.Model.extend({
    initialize: function() {
        //alert('Hey, you create me!');
    },
    url: function() {
        return "http://note.creatzy.com/auth/getUserInfo";
    },
    defaults: {
        'first_name':"default",
        'last_name':"defalt",
        'email':"",
        'id':0,
    },
});

var UserSettingView = Backbone.View.extend({
    className: "UserSetting",
    tagName: "div",
    initialize:function(options){
        var user=new User();
        this.model = user;
        that=this;
        console.log(user.url());
        user.fetch({
            success: function(data) {
               //console.log(data);
               that.render();
               console.log(that.model.get('id'));
            }
        });
        
    },
   
    render: function() {
        data = {
            "firstName": this.model.get('first_name'),
            "lastName": this.model.get('last_name'),
            "email": this.model.get('email'),
        };
        console.log(data);
        my = this;
        dust.render("usersetting", data, function(err, out) {
            if(!err) {
                $("#content").html(out.toString());
                $('#content').trigger('create');
            } else {
                return console.log(err);
            }
        });
    }

});