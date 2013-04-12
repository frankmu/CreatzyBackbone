Backbone.emulateHTTP = true;
Backbone.emulateJSON = true;

var Org = Backbone.Model.extend({
    initialize: function() {
        //alert('Hey, you create me!');
    },
    defaults: {
        orgId: '????',
        name: '?',
        pic: 'img/question.png',
        rewards: []
    },
});

var Orgs = Backbone.Collection.extend({
    model: Org,
    initialize: function() {

    },
    url: function() {
        return "http://54.245.102.89:8080/orgs";
    },
});

var OrgView = Backbone.View.extend({
    tagName: "li",
    className: "org",
    events: {
        "click img": "openReward",
        "click .edit": "edit",
        "click .save": "saveEdit",
        "change .files": "handleFileSelect",

    },
    edit: function() {
        //console.log("edit");
        var curAddr = $(this.el).find(".reward_addr").html();
        var curOrgName = $(this.el).find(".name").html();
        $(this.el).find(".reward_addr").html('<input type="text" class="newAddr"size="10"  value="' + curAddr + '">');
        $(this.el).find(".name").html('<input type="text" class="newName"size="10"  value="' + curOrgName + '">');
        $(this.el).find(".edit").html("Save");
        $(this.el).find(".files").show();
        $(this.el).find(".edit").attr('class', 'save');


        //console.log(curAddr);
    },
    handleFileSelect: function(evt) {
        var files = evt.target.files; // FileList object
        // Loop through the FileList and render image files as thumbnails.
        var that = this;
        for(var i = 0, f; f = files[i]; i++) {
            that.newimg = f;
            // Only process image files.
            if(!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                return function(e) {
                    // Render thumbnail.
                    //var span = document.createElement('span');
                    //console.log($(this.el).find('#imgprev').html);
                    $(that.el).find('.org_logo img').attr("src", e.target.result);
                    $(that.el).find('.org_logo img').attr("tittle", escape(theFile.name));
                    //$(that.el).find('.org_logo img').attr('<img class="thumb" src="'+e.target.result+'" title="'+escape(theFile.name)+'"/>');
                    //document.getElementById('list').insertBefore(span, null);
                };
            })(f);

            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
            //console.log(i);
        }
    },
    checkOrgData:function (data){
        var fileName = $(this.el).find(".files").val();
        //console.log(fileName.length);
        if(data.name.length*data.address.length==0){
            
            alert("Org Name:"+data.name+"\nOrg Address:"+data.address+"\nCan't be empty");
            return false;
        }
        else{
            var x;
            var r=confirm("Org Name:"+data.name+"\nOrg Address:"+data.address+"\nDo you want to save?");
            if (r==true)
            {
                return true;
            }
            else
            {
                return false;
            }
        }   
    },
    saveEdit: function() {
        //console.log(this.newimg);
        data = {
            "name": $(this.el).find(".newName").val(),
            "address": $(this.el).find(".newAddr").val(),
            "orgId": this.orgId,
            //"pic":"",
        };
        //console.log(data);
        //console.log(data);
        if(!this.checkOrgData(data)) return;
        var that = this;
        $.ajax({
            type: "POST",
            url: "http://54.245.102.89:8080/org_update",
            data: JSON.stringify(data),
            beforeSend: function() {
                //$(that.el).find(".detail").css("display", "none");
                $(that.el).find(".ajax-loader").css("display", "block");
            },
            success: function(res) {
                //console.log(res.orgId);
                if(that.newimg != undefined) {
                    console.log("change img");
                    var formData = new FormData();
                    formData.append('file', that.newimg);
                    //console.log(that.newimg);
                    $.ajax({
                        url: "http://54.245.102.89:8080/upload_photo?id=" + res.orgId,
                        type: "POST",
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function() {
                            //console.log('uploaded');
                            rewardOrgs.fetch({
                                success: function(collection) {
                                    //console.log(collection);
                                    rewardOrgsView.render();

                                }
                            });
                        },
                        error: function(err) {
                            console.log('error uploading ' + err);
                        }
                    });
                } else {
                    console.log("no change img");
                    rewardOrgs.fetch({
                        success: function(collection) {
                            //console.log(collection);
                            rewardOrgsView.render();

                        }
                    });


                }

            },
            error: function(err) {
                console.log(err);
            }
        }).done(function(html) {
            //$(that.el).find(".detail").css("display", "none");
            //$(that.el).find(".ajax-loader").css("display", "none");

        });



    },
    openReward: function() {
        //alert("haha");
        var rewards = new Rewards([], {
            query: this.orgId
        });
        $(".orgs_nav .org").removeAttr("style");
        $(this.el).css("background-color", "#cdeb8e");
        //console.log(this.orgId);
        var rewardsView = new RewardsView({
            orgId: this.orgId,
            el: "#rewards_nav",
            collection: rewards
        });
        rewards.fetch({
            success: function(collection) {
                //console.log(collection);
                rewardsView.render();

            }
        });
        //rewardOrgsView.render();
    },
    render: function() {
        $(this.el).html('');
        this.orgId = this.model.get('orgId');
        //console.log(this.model);
        data = {
            "orgId": this.model.get('orgId'),
            "orgName": this.model.get('name'),
            "pic": this.model.get('pic'),
            "address": this.model.get('address'),
            "reward_number": this.model.get('rewards').length,
        };
        //console.log(this.model.get('rewards'));
        //this.id=this.model.get('orgId');
        //console.log(data);
        that = this;
        dust.render("org", data, function(err, out) {
            if(!err) {
                $(that.el).html(out.toString());
            } else {
                return console.log(err);
            }
        });
        return this;
    }
});

var NewOrgView = Backbone.View.extend({
    tagName: "li",
    className: "neworg",

    //toggle:0,
    events: {
        "click .new_org .title": "clickToggle",
        "click .new_org .submitnew": "submitNew",
        "change #files": "handleFileSelect",
    },
    handleFileSelect: function(evt) {
        var files = evt.target.files; // FileList object
        // Loop through the FileList and render image files as thumbnails.
        var that = this;
        for(var i = 0, f; f = files[i]; i++) {
            that.newimg = f;
            // Only process image files.
            if(!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                return function(e) {
                    // Render thumbnail.
                    //var span = document.createElement('span');
                    //console.log($(this.el).find('#imgprev').html);
                    $(that.el).find('#imgprev').html('<img class="thumb" src="' + e.target.result + '" title="' + escape(theFile.name) + '"/>');
                    //document.getElementById('list').insertBefore(span, null);
                };
            })(f);

            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
            //console.log(i);
        }
    },
    checkOrgData:function (data){
        var fileName = $(this.el).find("#files").val();
        //console.log(fileName.length);
        if(data.name.length*data.address.length*fileName.length==0){
            
            alert("Org Name:"+data.name+"\nOrg Address:"+data.address+"\nCan't be empty");
            return false;
        }
        else{
            var x;
            var r=confirm("Org Name:"+data.name+"\nOrg Address:"+data.address+"\nDo you want to save?");
            if (r==true)
            {
                return true;
            }
            else
            {
                return false;
            }
        }   
    },
    submitNew: function() {
        data = {
            "name": $(this.el).find(".name").val(),
            "address": $(this.el).find(".addr").val(),
            //"pic":"",
        };
        if(!this.checkOrgData(data)) return;
        //console.log(data);
        //console.log(data);
        var that = this;
        $.ajax({
            type: "POST",
            url: "http://54.245.102.89:8080/org_create",
            data: JSON.stringify(data),
            beforeSend: function() {
                $(that.el).find(".detail").css("display", "none");
                $(that.el).find(".ajax-loader").css("display", "block");
            },
            success: function(res) {
                //console.log(res.orgId);
                var formData = new FormData();
                formData.append('file', that.newimg);
                //console.log(that.newimg);
                $.ajax({
                    url: "http://54.245.102.89:8080/upload_photo?id=" + res.orgId,
                    type: "POST",
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function() {
                        //console.log('uploaded');
                        $(that.el).find(".detail").css("display", "none");
                        $(that.el).find(".ajax-loader").css("display", "none");
                        rewardOrgs.fetch({
                            success: function() {
                                rewardOrgsView.render();
                            }
                        });
                    },
                    error: function(err) {
                        console.log('error uploading ' + err);
                    }
                });

            },
            error: function(err) {
                console.log(err);
            }
        }).done(function(html) {
            


        });
    },


    clickToggle: function() {
        //console.log(this.toggle);
        if($(this.el).find(".detail").css("display") == "none") {
            //this.toggle=1;
            //console.log($(this.el).find('.detail').html());
            $(this.el).find(".detail").css("display", "block");
        } else {
            //console.log("else");
            $(this.el).find(".detail").css("display", "none");
            //this.toggle=0;
        }
        //console.log(this.toggle);
    },

    render: function() {
        $(this.el).html('');
        that = this;
        dust.render("newOrg", "", function(err, out) {
            if(!err) {
                $(that.el).html(out.toString());
            } else {
                return console.log(err);
            }
        });
        return this;

    }
});

var OrgsView = Backbone.View.extend({
    className: "orgs",
    //content:"rewards_mine_content"
    render: function() {
        $(this.el).html('');
        //console.log(this.collection);
        this.collection.each(function(org) {
            var orgView = new OrgView({
                model: org,
            });
            $(this.el).prepend(orgView.render().el);
        }, this);
        var newOrgView = new NewOrgView();
        $(this.el).prepend(newOrgView.render().el);

    }
});


var rewardOrgs = new Orgs();
var rewardOrgsView = new OrgsView({
    el: "#reward_org",
    collection: rewardOrgs
});
rewardOrgs.fetch({
    success: function(collection) {
        //console.log(collection);
        rewardOrgsView.render();

    }
});

