(function(){dust.register("login",body_0);function body_0(chk,ctx){return chk.write("<form action=\"http://note.creatzy.com/auth/login\" id=\"loginForm\" \"method=\"POST\"><div data-role=\"fieldcontain\"><label for=\"textinput1\">Username</label><input name=\"identity\" id=\"textinput1\" placeholder=\"\" value=\"admin@admin.com\" type=\"text\" /></div><div data-role=\"fieldcontain\"><label for=\"textinput2\">Password</label><input name=\"password\" id=\"textinput2\" placeholder=\"\" value=\"password\" type=\"password\" /></div><div class=\"ui-grid-a\"><div class=\"ui-block-a\"><a data-role=\"button\">Forgot</a></div><div class=\"ui-block-b\"><a data-role=\"button\" id=\"loginSubmit\">Submit</a></div></div></form>");}return body_0;})();