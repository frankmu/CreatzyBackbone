Backbone.emulateHTTP = true;
Backbone.emulateJSON = true;

var Card = Backbone.Model.extend({
    initialize: function() {
        //alert('Hey, you create me!');
    },
    defaults: {
        
    },
});

var Cards = Backbone.Collection.extend({
    model: Card,
    initialize: function(models, options) {
        this.rewardId = options.rewardId;
    },
    url: function() {
        return "http://54.245.102.89:8080/reward_cards?rewardId="+this.rewardId;
    },
});

var CardView = Backbone.View.extend({
    tagName: "li",
    className: "cardView",
    initialize: function(options) {
        this.rewardId = options.rewardId;
        //this.reward_max_point = options.reward_max_point;
        //console.log(this.reward_max_point);
    },
    events: {
        

    },

    

    render: function() {
        $(this.el).html(''); 
        //console.log(this.reward_max_point);
        //console.log(this.model);
        data = {
            "cardId": this.model.get('cardId'),
            "pts": this.model.get('pts'),
            "user": this.model.get('user'),
            "percent":this.model.get('pts')/this.model.get('maxPts')*100,
            //"pic":this.model.get('pic'),
            //"card_number":this.model.get('cards').length,
        };
        if(data.percent==0) data.percent=1;
        //console.log(this.model.get('cards'));
        //this.id=this.model.get('rewardId');
        //console.log(data);
        that = this;
        dust.render("card", data, function(err, out) {
            if(!err) {
                $(that.el).html(out.toString());
            } else {
                return console.log(err);
            }
        });
        return this;
    }
});



var CardsView = Backbone.View.extend({
    className: "cards",
    rewardId:0,
    initialize: function(options) {
        this.rewardId = options.rewardId;
    },
    //content:"cards_mine_content"
    
    
    render: function() {
        $(this.el).html(''); 
        //console.log(this.rewardId);
        //console.log(this.el);
        //console.log(this.collection);
        this.collection.each(function(card) {
            //console.log(card);
            var cardView = new CardView({
                rewardId:this.rewardId,
                model: card,
            });
            $(this.el).prepend(cardView.render().el);
        }, this);

    }
});

