(function(){dust.register("usersetting",body_0);function body_0(chk,ctx){return chk.write("<div data-role=\"fieldcontain\"><label for=\"firstname\">First Name:</label><input type=\"text\" name=\"firstname\" id=\"firstname\" value=\"").reference(ctx.get("firstName"),ctx,"h").write("\"  /></div><div data-role=\"fieldcontain\"><label for=\"lastname\">Last Name:</label><input type=\"text\" name=\"lastname\" id=\"lastname\" value=\"").reference(ctx.get("lastName"),ctx,"h").write("\"  /></div><div data-role=\"fieldcontain\"><label for=\"email\">Email:</label><input type=\"email\" name=\"email\" id=\"email\" value=\"").reference(ctx.get("email"),ctx,"h").write("\"  /></div><div data-role=\"fieldcontain\"><label for=\"password1\">Change Password:</label><input type=\"password\" name=\"password1\" id=\"password1\" value=\"\"  /></div><div data-role=\"fieldcontain\"><label for=\"password2\">Confirm Password:</label><input type=\"password\" name=\"password2\" id=\"password2\" value=\"\"  /></div><div class=\"ui-grid-b\"><div class=\"ui-block-a\"><a data-role=\"button\" data-inline=\"true\" data-theme=\"a\" id=\"logoutButton\">Logout</a></div><div class=\"ui-block-b\"><a data-role=\"button\" data-inline=\"true\" data-theme=\"b\" id=\"backupButton\">Backup</a></div><div class=\"ui-block-c\"><a data-role=\"button\" data-inline=\"true\" data-theme=\"c\" id=\"restoreButton\">Restore</a></div></div>");}return body_0;})();