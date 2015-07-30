// List of modules to load delimited by spaces.
var blogModules = "emoticons";

// Capitalize a string.
function capitalize(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Run a function from string.
function runFunction(name, arguments)
{
    var fn = window[name];

    if (typeof fn !== 'function')
        return;

    fn.apply(window, arguments);
}

// Load all enabled modules.
function loadBlogModules()
{
    // Split all modules by spaces.
    var modules = blogModules.toLowerCase().split(/\s+/);

    // Remove duplicates.
    modules = modules.filter(function(elem, pos, self) {
        return self.indexOf(elem) == pos;
    });

    // Run each module funtion with the form:
    //
    // blogModule[Capitalized module name]
    for (var module in modules)
        runFunction("blogModule" + capitalize(modules[module]));
}

// Load an external or embedded file.
function loadBlogFile(filename)
{
    // "blogFiles" is a hash map with the name of a file as key
    // and the base64 encoded file as value.
    if (typeof blogFiles != "undefined" && filename in blogFiles)
        // Embedded files load faster and
        // so are the prefered method.
        return blogFiles[filename];
    else
        // Load from an external source.
        return filename;
}

// Execute "func" when the website is fully loaded.
function attachOnLoad(func)
{
    if (window.attachEvent)
        window.attachEvent('onload', func);
    else if (window.onload) {
        var curronload = window.onload;

        var newonload = function() {
            curronload();
            func();
        };

        window.onload = newonload;
    }
    else
        window.onload = func;
}

// Append a new script or style sheet to the header and execute
// callback when the script is fully loaded.
function loadExternalfile(filetype, filename, callback)
{
    if (filetype == "js") {
        var fileref = document.createElement('script');

        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", filename);
    } else if (filetype == "css") {
        var fileref = document.createElement("link");

        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }

    if (typeof fileref != "undefined") {
        if (typeof callback !== 'undefined')
            fileref.onload = callback;

        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
}

// This function is useful when you need to load many scripts in
// which one script depends on each other.
function scriptChainLoad(scripts, callback)
{
    if (scripts.length == 0) {
        if (typeof callback !== 'undefined')
            callback();
    } else {
        function chain()
        {
            scriptChainLoad(scripts, callback);
        }

        script = scripts[0];
        scripts.splice(0, 1);
        loadExternalfile("js", loadBlogFile(script), chain);
    }
}

// Return all elements that matches "className".
function getElementsByClass(className)
{
    var matchedElements = [];
    var elements = document.getElementsByTagName("*");
    var i = 0;

    for (element in elements)
        if (elements[element].className == className) {
            matchedElements[i] = elements[element];
            i++;
        }

    return matchedElements;
}

function replaceTextInNode(node, src, dst, exclude)
{
    // Element node.
    if (node.nodeType == 1) {
        if (exclude.indexOf(node.tagName.toLowerCase()) < 0)
            for (var child in node.childNodes)
                replaceTextInNode(node.childNodes[child], src, dst, exclude);
    }
    // Text node.
    else if (node.nodeType == 3) {
        // Create a temporal element.
        var temp = document.createElement('div');

        // Replace text.
        temp.innerHTML = node.data.split(src).join(dst);

        // Extract produced nodes and insert them
        // before original textNode:
        while (temp.firstChild)
            node.parentNode.insertBefore(temp.firstChild, node);

        node.parentNode.removeChild(node);
    }
}

// Execute module loader when the website is fully loaded.
attachOnLoad(loadBlogModules);
