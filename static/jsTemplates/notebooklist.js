(function(){dust.register("notebooklist",body_0);function body_0(chk,ctx){return chk.write("<a class=\"bookname\" href=\"#NoteBook/").reference(ctx.get("notebookID"),ctx,"h").write("\">").reference(ctx.get("notebookName"),ctx,"h").write("</a><a href=\"#\" id=\"deleteNotebookButton").reference(ctx.get("notebookID"),ctx,"h").write("\" data-rel=\"popup\" data-position-to=\"window\" data-transition=\"pop\">Delete</a>");}return body_0;})();