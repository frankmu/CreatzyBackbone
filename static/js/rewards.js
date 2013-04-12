Backbone.emulateHTTP = true;
Backbone.emulateJSON = true;

var Reward = Backbone.Model.extend({
    initialize: function() {
        //alert('Hey, you create me!');
    },
    defaults: {
        
    },
});

var Rewards = Backbone.Collection.extend({
    model: Reward,
    initialize: function(models, options) {
        this.query = options.query;
    },
    url: function() {
        return "http://54.245.102.89:8080/rewards?orgId="+this.query;
    },
});

var RewardView = Backbone.View.extend({
    tagName: "li",
    className: "reward",
    initialize: function(options) {
        this.orgId = options.orgId;
        this.collectionView=options.collectionView;
    },
    events: {
        "click .reward .title":"clickToggle",
        //"click .reward .title":"openReward",
        "click .remove":"removeGoal",
        "click .edit": "edit",
        "click .save": "saveEdit",
        "click .reward .add":"addGoal",


    },
    edit: function() {
        console.log("edit");
        //var curAddr = $(this.el).find(".reward_addr").html();
        //var curOrgName = $(this.el).find(".name").html();
        //$(this.el).find(".reward_addr").html('<input type="text" class="newAddr"size="10"  value="' + curAddr + '">');
        //$(this.el).find(".name").html('<input type="text" class="newName"size="10"  value="' + curOrgName + '">');
        $(this.el).find(".edit").html("Save");
        $(this.el).find(".remove").show();
        $(this.el).find(".add").show();
        $(this.el).find(".edit").attr('class', 'save');
        $(this.el).find("inpput").removeAttr("disabled");
        $(this.el).find("input").each(
            function(){
                //console.log(this);
                $(this).removeAttr("disabled")
            }
        );
        //console.log(curAddr);
    },
    saveEdit:function(){
        //console.log(this.orgId);
        //console.log(this.rewardId);
        var goals=new Array();
        $(this.el).find(".goal").each(function(indexInArray, valueOfElement){
            var data={
                pts:$(this).find(".pts").val(),
                item:$(this).find(".text").val()
            }
            goals.push(data);
            //console.log(valueOfElement);
            //console.log($(this).find(".pts").val());
            //console.log($(this).find(".text").val());
        });
        data = {
            //"orgId": this.orgId,
            "rewardId": this.rewardId,
            "maxPts":$(this.el).find(".maxpts").attr("value"),
            "goals":goals,
        };
        //console.log(data);
        //console.log(this.collectionView);
        var that=this;
        $.ajax({
            type: "POST",
            url: "http://54.245.102.89:8080/reward_update",
            data:JSON.stringify(data),
            beforeSend: function () {
                $(that.el).find(".detail").css("display", "none");
                $(that.el).find(".ajax-loader").css("display", "block");
            },
            success:function(res){
                //console.log(res);
                that.collectionView.collection.fetch({
                    success: function(collection) {
                    //console.log(collection);
                    
                        that.collectionView.render();
                    
                    }
                });
            },
            error:function(err){console.log(err);}
        }).done(function( html ) {
            //$(that.el).find(".detail").css("display", "none");
            //$(that.el).find(".ajax-loader").css("display", "none");
            

        });


    },
    addGoal:function(){
        console.log("addGoal");
        $(this.el).find(".goals").append('<div class="goal"><input type="text" size="10" class="pts" onfocus="if(this.value == \'points\') { this.value = \'\'; }"value="points"><input type="text" size="10" class="text" onfocus="if(this.value == \'goal\') { this.value = \'\'; }"value="goal"><button class="remove" >Remove</button></div>');
    },
    removeGoal:function(target){
        $(target.target).parent().remove();
    },
    openReward:function(){
        //alert("haha");
        //console.log(this.rewardId)
        //$(".rewards_nav li").css("background-color","#555");
        $(this.el).css("background-color","#FFFF99");
        var cards = new Cards([], {
            rewardId:this.rewardId,

        });
        //$(".orgs_nav .org").css("background-color","#eee");
        //$(this.el).css("background-color","#ddd");
        //console.log(this.orgId);
        var cardsView = new CardsView({
            rewardId:this.rewardId,
            reward_max_point:this.model.get('maxPts'),
            el:"#content",
            collection: cards
        });
        cards.fetch({
            success: function(collection) {
                //console.log(collection);
                
                cardsView.render();
                
            }
        });
        //openReward()
        //rewardOrgsView.render();

    },

    clickToggle:function(){
        //$()
        //console.log(this.toggle);
        $(this.el).siblings().removeAttr("style");
        if($(this.el).find(".detail").css("display")=="none") {
            //this.toggle=1;
            //console.log($(this.el).find('.detail').html());
            $(".rewards_nav .detail").css("display", "none");
            $(this.el).find(".detail").css("display", "block");
        }
        else 
        {
            //console.log("else");
            $(this.el).find(".detail").css("display", "none");
            //this.toggle=0;
        }
        //console.log(this.toggle);
        this.openReward();
    },

    render: function() {
        $(this.el).html(''); 

        data = {
            "rewardId": this.model.get('rewardId'),
            "maxPts": this.model.get('maxPts'),
            "goals": this.model.get('goals'),
            //"pic":this.model.get('pic'),
            //"reward_number":this.model.get('rewards').length,
        };
        this.rewardId=this.model.get('rewardId');
        //console.log(this.model.get('rewards'));
        //this.id=this.model.get('orgId');
        that = this;
        dust.render("reward", data, function(err, out) {
            if(!err) {
                $(that.el).html(out.toString());
            } else {
                return console.log(err);
            }
        });
        return this;
    }
});


var NewRewardView = Backbone.View.extend({
    tagName: "li",
    className: "newreward",
    //toggle:0,
    initialize: function(options) {
        this.orgId = options.orgId;
        this.parentRewardView=options.parentRewardView;
    },
    events: {
        "click .new_reward .title":"clickToggle",
        //"click .new_reward .submitnew":"submitNew",
        "click .new_reward .submitnew":"submitNew",
        "click .new_reward .add":"addGoal",
        "click .remove":"removeGoal",

    },
    removeGoal:function(target){
        $(target.target).parent().remove();
    },
    addGoal:function(){
        $(this.el).find(".goals").append('<div class="goal"><input type="text" size="10" class="pts" onfocus="if(this.value == \'points\') { this.value = \'\'; }"value="points"><input type="text" size="10" class="text" onfocus="if(this.value == \'goal\') { this.value = \'\'; }"value="goal"><button class="remove" >Remove</button></div>');
    },

    submitNew:function(){
        var goals=new Array();
        $(this.el).find(".goal").each(function(indexInArray, valueOfElement){
            var data={
                pts:$(this).find(".pts").val(),
                item:$(this).find(".text").val()
            }
            goals.push(data);
            //console.log(valueOfElement);
            //console.log($(this).find(".pts").val());
            //console.log($(this).find(".text").val());
        });
        //console.log(this.orgId);
        data = {
            orgId:this.orgId,
            maxPts:$(this.el).find(".maxpts").val(),
            goals:goals
        };
        //console.log(data);
        
        //console.log(data);
        var that=this;
        $.ajax({
            type: "POST",
            url: "http://54.245.102.89:8080/reward_create",
            data:JSON.stringify(data),
            beforeSend: function () {
                $(that.el).find(".detail").css("display", "none");
                $(that.el).find(".ajax-loader").css("display", "block");
            },
            success:function(res){
                //console.log(res);
                that.parentRewardView.collection.fetch({
                    success: function(collection) {
                    //console.log(collection);
                    
                        that.parentRewardView.render();
                    
                    }
                });
            },
            error:function(err){console.log(err);}
        }).done(function( html ) {
            $(that.el).find(".detail").css("display", "none");
            $(that.el).find(".ajax-loader").css("display", "none");
            

        });
    },


    clickToggle:function(){
        //console.log(this.toggle);
        if($(this.el).find(".detail").css("display")=="none") {
            //this.toggle=1;
            //console.log($(this.el).find('.detail').html());
            $(".rewards_nav .detail").css("display", "none");
            $(this.el).find(".detail").css("display", "block");
        }
        else 
        {
            //console.log("else");
            $(this.el).find(".detail").css("display", "none");
            //this.toggle=0;
        }
        //console.log(this.toggle);
    },

    render: function() {
        //console.log("dad");
        $(this.el).html(''); 
        that=this;
        dust.render("newReward", "", function(err, out) {
            if(!err) {
                $(that.el).html(out.toString());
            } else {
                return console.log(err);
            }
        });
        return this;
        
    }
});

var RewardsView = Backbone.View.extend({
    className: "rewards",
    orgId:0,
    initialize: function(options) {
        this.orgId = options.orgId;
    },
    //content:"rewards_mine_content"
    
    
    render: function() {
        $(this.el).html(''); 
        //console.log(this.orgId);
        //console.log(this.el);
        //console.log(this.collection);
        that=this;
        this.collection.each(function(reward) {
            //console.log(reward);
            var rewardView = new RewardView({
                orgId:this.orgId,
                collectionView:that,
                model: reward,
            });
            $(this.el).prepend(rewardView.render().el);
        }, this);
        var newRewardView=new NewRewardView({orgId:this.orgId,parentRewardView:this});
        $(this.el).prepend(newRewardView.render().el);

    }
});

