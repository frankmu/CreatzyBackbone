(function(){dust.register("reward",body_0);function body_0(chk,ctx){return chk.write("<div class=\"reward\"><div class=\"title\">Reward ID:").reference(ctx.get("rewardId"),ctx,"h").write("</div><div class=\"detail\"style=\"display:none\"><div><input type=\"text\" size=\"10\" class=\"maxpts\" value=\"").reference(ctx.get("maxPts"),ctx,"h").write("\" disabled=\"disabled\"></div><div class=\"goals\">").section(ctx.get("goals"),ctx,{"else":body_1,"block":body_2},null).write("</div><div><button class=\"add\" style=\"display:none\">Add</button><button class=\"edit\">Edit</button></div><div class=\"ajax-loader\" style=\"display:none\"><img src=\"img/ajax-loader.gif\"><div></div></div>");}function body_1(chk,ctx){return chk.write("You have no goal!");}function body_2(chk,ctx){return chk.write("<div class=\"goal\"><input type=\"text\" size=\"10\" class=\"pts\" value=\"").reference(ctx.get("pts"),ctx,"h").write("\" disabled=\"disabled\"><input type=\"text\" size=\"10\" class=\"text\" value=\"").reference(ctx.get("item"),ctx,"h").write("\" disabled=\"disabled\"><button class=\"remove\" style=\"display:none\">Remove</button></div>");}return body_0;})();