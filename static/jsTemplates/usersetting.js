(function(){dust.register("usersetting",body_0);function body_0(chk,ctx){return chk.write("<div data-role=\"fieldcontain\"><label for=\"firstname\">First Name:</label><input type=\"text\" name=\"firstname\" id=\"firstname\" value=\"").reference(ctx.get("firstName"),ctx,"h").write("\"  /><label for=\"lasttname\">Last Name:</label><input type=\"text\" name=\"lastname\" id=\"firstname\" value=\"").reference(ctx.get("lastName"),ctx,"h").write("\"  /><label for=\"email\">Email:</label><input type=\"email\" name=\"email\" id=\"email\" value=\"").reference(ctx.get("email"),ctx,"h").write("\"  /><label for=\"password1\">Change Password:</label><input type=\"password\" name=\"password1\" id=\"password1\" value=\"\"  /><label for=\"password2\">Confirm Password:</label><input type=\"password\" name=\"password2\" id=\"password2\" value=\"\"  /></div>");}return body_0;})();