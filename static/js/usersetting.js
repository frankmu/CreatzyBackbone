Backbone.emulateHTTP = true;
Backbone.emulateJSON = true;

var User = Backbone.Model.extend({
	initialize : function() {
		//alert('Hey, you create me!');
	},
	url : function() {
		return "http://note.creatzy.com/auth/getUserInfo";
	},
	defaults : {
		'first_name' : "default",
		'last_name' : "defalt",
		'email' : "",
		'id' : 0,
	},
});

var user = new User();

var UserSettingView = Backbone.View.extend({
	className : "UserSetting",
	tagName : "div",
	initialize : function(options) {
		//var user=new User();

		this.model = user;
		that = this;
		console.log(user.url());
		user.fetch({
			success : function(data) {
				//console.log(data);
				that.render();
				console.log(that.model.get('id'));
			}
		});

	},

	render : function() {
		data = {
			"firstName" : this.model.get('first_name'),
			"lastName" : this.model.get('last_name'),
			"email" : this.model.get('email'),
		};
		console.log(data);
		my = this;
		dust.render("usersetting", data, function(err, out) {
			if (!err) {
				//$("#content").html(out.toString());
				//$('#content').trigger('create');
				$(that.el).html(out.toString());
			} else {
				return console.log(err);
			}
		});
		$("#logoutButton").live("click", function() {
			console.log("logout");
			$.ajax({
				type : "GET",
				url : "http://note.creatzy.com/index.php?/auth/logout",
				success : function(res) {
					setTimeout(function() {
						appRouterInstance.navigate("", {
							trigger : true
						});
					}, 500);

				}
			});
		});
		this.afterrender();
		return $(this.el);

	}
});
var LoginView = Backbone.View.extend({
	className : "Login",
	tagName : "div",
	initialize : function(options) {
		this.model = new User();
		that = this;
		console.log(user.url());
		this.model.fetch({
			success : function(data) {
				//console.log(data);
				user = that.model;
				if (that.model.get('id') == '') {
					//that.render();
					that.render();
				} else {
					appRouterInstance.navigate("NoteBookList", {
						trigger : true
					});
					$(document).ready(function() {
						$("#homeNavi").removeClass('ui-disabled');
						$("#publicNavi").removeClass('ui-disabled');
						$("#settingNavi").removeClass('ui-disabled');
					});
				}

			}
		});

	},

	render : function() {
		console.log("render");
		var data = "";
		my = this;
		dust.render("login", data, function(err, out) {
			if (!err) {
				//$("#content").html(out.toString());
				//$('#content').trigger('create');
				$(that.el).html(out.toString());
				$(document).ready(function() {
					$(".ui-btn-active").removeClass('ui-btn-active');
					$("#homeNavi").addClass('ui-disabled');
					$("#publicNavi").addClass('ui-disabled');
					$("#settingNavi").addClass('ui-disabled');
				});
			} else {
				return console.log(err);
			}
		});

		$("#loginSubmit").on("click", function() {
			$('#loginForm').submit(function() {
				console.log($(this).serialize());
				$.ajax({
					data : $(this).serialize(),
					type : 'POST',
					url : $(this).attr('action'),
					success : function(response) {
						appRouterInstance.navigate("NoteBookList", {
							trigger : true
						});
						$(document).ready(function() {
							$("#homeNavi").removeClass('ui-disabled');
							$("#publicNavi").removeClass('ui-disabled');
							$("#settingNavi").removeClass('ui-disabled');
						});
					}
				});
				return false;
				// cancel original event to prevent form submitting
			});
			$('#loginForm').submit();
		});
		this.afterrender();
		return $(this.el);
	},
}); 