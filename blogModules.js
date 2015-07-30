// Show some funny smileys in the website.
function blogModuleEmoticons()
{
    function EmoticonsTable()
    {
        table =
        {
            " :)": ["&#x1f60a;", loadBlogFile("http://www.cute-factor.com/images/smilies/onion/th_059_.gif")],
            " ;(": ["&#x1f622;", loadBlogFile("http://www.cute-factor.com/images/smilies/onion/33c4b951.gif")],
            " :(": ["&#x1f61e;", loadBlogFile("http://www.cute-factor.com/images/smilies/onion/098eb4a5.gif")],
            " :P": ["&#x1f60b;", loadBlogFile("http://www.cute-factor.com/images/smilies/onion/154218d4.gif")],
            " XD": ["&#x1f606;", loadBlogFile("http://www.cute-factor.com/images/smilies/onion/th_053_XD.gif")],
            " :$": ["&#x1f633;", loadBlogFile("http://www.cute-factor.com/images/smilies/onion/0fbbf481.gif")],
            " ;)": ["&#x1f609;", loadBlogFile("http://www.cute-factor.com/images/smilies/onion/088.gif")],
            " :/": ["&#x1f615;", loadBlogFile("http://www.cute-factor.com/images/smilies/onion/17f0f3b0.gif")],
            " :x": ["&#x1f610;", loadBlogFile("http://www.cute-factor.com/images/smilies/onion_custom/th_0chis.gif")],
            " :o": ["&#x1f632;", loadBlogFile("http://www.cute-factor.com/images/smilies/onion/070.gif")],
            " B)": ["&#x1f60e;", loadBlogFile("http://www.cute-factor.com/images/smilies/onion/th_102_.gif")],
            " :s": ["&#x1f635;", loadBlogFile("http://www.cute-factor.com/images/smilies/onion/th_081_.gif")],
            " X(": ["&#x1f623;", loadBlogFile("http://www.cute-factor.com/images/smilies/onion/4d6161fd.gif")],
            " <3": ["&#x1f60d;", loadBlogFile("http://www.cute-factor.com/images/smilies/onion/th_087_.gif")],
            " :D": ["&#x1f603;", loadBlogFile("http://www.cute-factor.com/images/smilies/onion/70bff581.gif")],
            " :3": ["&#x1f63d;", loadBlogFile("http://www.cute-factor.com/images/smilies/onion/cd08785a.gif")]
        };

        return table;
    }

    // Appends the emoticons code table before box id.
    function showEmoticonsTable(box, textOnly)
    {
        var emoticonsTable = EmoticonsTable();
        var table = document.createElement("table");

        // http://www.cute-factor.com/imlister.php?cid=wanwan&type=e
        var tr = document.createElement("tr");
        var td = document.createElement("td");

        td.className = "emoticonsAttribution";
        td.colSpan = Object.keys(emoticonsTable).length;

        var text = document.createTextNode("Download more icons at ");
        td.appendChild(text);

        var a = document.createElement("a");
        a.target = "_blank";
        a.href = "http://www.cute-factor.com/imlister.php?cid=wanwan&type=e";
        text = document.createTextNode("Cute-Factor");
        a.appendChild(text);

        td.appendChild(a);
        tr.appendChild(td);
        
        if (!textOnly)
            table.appendChild(tr);

        for(var row = 0; row < 2; row++) {
            tr = document.createElement("tr");

            for (var emoticon in emoticonsTable) {
                td = document.createElement("td");

                if (row & 1) {
                    // Emoticon code.
                    td.className = "emoticonCharacter";
                    td.innerHTML = emoticon;
                } else if (textOnly) {
                    // Emoticon image.
                    var span = document.createElement("span");

                    span.className = "emoticon";
                    span.innerHTML = emoticonsTable[emoticon][0];

                    td.appendChild(span);
                } else {
                    // Emoticon image.
                    var img = document.createElement("img");

                    img.className = "emoticon";
                    img.src = emoticonsTable[emoticon][1].replace(/\s+/g, "");
                    img.alt = emoticon;

                    td.appendChild(img);
                }

                tr.appendChild(td);
            }

            table.appendChild(tr);
        }

        var emoticonsTable = document.createElement("center");
        emoticonsTable.appendChild(table);

        var commentForm = document.getElementById(box);

        if (commentForm)
            commentForm.parentNode.insertBefore(emoticonsTable, commentForm);
    }

    function replaceEmoticons(boxes)
    {
        var emoticonsTable = EmoticonsTable();

        for (var box in boxes) {
            var elements = getElementsByClass(boxes[box]);

            if (!elements)
                break;

            for (var element in elements)
                for (var emoticon in emoticonsTable) {
                    if (textOnly)
                        var code = "<span class='emoticon'> " 
                                + emoticonsTable[emoticon][0] 
                                + "</span>";
                    else
                        var code = "<img class='emoticon' src='"
                                + emoticonsTable[emoticon][1]
                                + "' alt='"
                                + emoticon
                                + "' />";

                    replaceTextInNode(elements[element],
                                      emoticon,
                                      code,
                                      ["pre"]);
                }
        }
    }

    var style = document.createElement("style");
    style.type = "text/css";

    style.innerHTML = "span.emoticon \
                        { \
                            font-size: 24px; \
                        } \
                        \
                        img.emoticon \
                        { \
                            width: 24px; \
                            height: 24px; \
                            margin: 0px; \
                            padding: 0px; \
                        } \
                        \
                        td.emoticonCharacter \
                        { \
                            text-align: center; \
                        } \
                        \
                        td.emoticonsAttribution \
                        { \
                            font-size: small; \
                            text-align: center;\
                        }";

    document.getElementsByTagName("head")[0].appendChild(style);

    var textOnly = false;
    replaceEmoticons(["post-body entry-content", "comment-content"], textOnly);
    showEmoticonsTable("comment-editor", textOnly);
}

// Enable source code syntax highlighting.
function blogModuleCode()
{
    function callback()
    {
        SyntaxHighlighter.config.bloggerMode = true;
        SyntaxHighlighter.highlight();
    }

    loadExternalfile("css", loadBlogFile("http://alexgorbatchev.com/pub/sh/current/styles/shCore.css"));
    loadExternalfile("css", loadBlogFile("http://alexgorbatchev.com/pub/sh/current/styles/shThemeRDark.css"));

    scriptChainLoad(["http://alexgorbatchev.com/pub/sh/current/scripts/shCore.js",
                        "http://alexgorbatchev.com/pub/sh/current/scripts/shBrushBash.js",
                        "http://alexgorbatchev.com/pub/sh/current/scripts/shBrushCpp.js",
                        "http://alexgorbatchev.com/pub/sh/current/scripts/shBrushDiff.js",
                        "http://alexgorbatchev.com/pub/sh/current/scripts/shBrushJScript.js",
                        "http://alexgorbatchev.com/pub/sh/current/scripts/shBrushPlain.js",
                        "http://alexgorbatchev.com/pub/sh/current/scripts/shBrushXml.js",
                        "http://alexgorbatchev.com/pub/sh/current/scripts/shBrushPython.js"], callback)
}

// Enable math functions rendering.
function blogModuleMathjax()
{
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src  = loadBlogFile("http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML");

    var config = 'MathJax.Hub.Config({tex2jax: {inlineMath: [["$", "$"], ["\\\\(", "\\\\)"]], \
                                                processEscapes: 1}, \
                                        MathZoom: {delay: 1, \
                                                    styles: {"#MathJax_Zoom": \
                                                            { \
                                                                color: "rgb(255, 255, 255) !important", \
                                                                color: "rgba(255, 255, 255, 1) !important", \
                                                                "background-color": "rgb(0, 0, 0) !important", \
                                                                "background-color": "rgba(0, 0, 0, 1) !important" \
                                                            } \
                                                            }}, \
                                        menuSettings: {zoom: "Hover"}}); \
                    MathJax.Hub.Startup.onload();';

    if (window.opera)
        script.innerHTML = config;
    else
        script.text = config;

    document.getElementsByTagName("head")[0].appendChild(script);
}

// Enable graph plotting.
function blogModuleGraph()
{
    function callback()
    {
        if (jsxGraphList)
            for (var graph in jsxGraphList)
                jsxGraphList[graph]();
    }

    loadExternalfile("css", loadBlogFile("http://jsxgraph.uni-bayreuth.de/distrib/jsxgraph.css"));
//    loadExternalfile("js", loadBlogFile("http://jsxgraph.uni-bayreuth.de/distrib/jsxgraphcore.js"), callback);
}
