(function(){dust.register("notebooklist",body_0);function body_0(chk,ctx){return chk.write("<a class=\"bookname\" href=\"#NoteBook/").reference(ctx.get("notebookID"),ctx,"h").write("\">").reference(ctx.get("notebookName"),ctx,"h").write("</a>").section(ctx.get("delete_enable"),ctx,{"block":body_1},null);}function body_1(chk,ctx){return chk.write("<a href=\"#\" class=\"deleteNotebookButton deleteButton\" data-rel=\"popup\" data-name=\"").reference(ctx.get("notebookName"),ctx,"h").write("\"data-id=\"").reference(ctx.get("notebookID"),ctx,"h").write("\"data-position-to=\"window\" data-transition=\"pop\">Delete</a>");}return body_0;})();