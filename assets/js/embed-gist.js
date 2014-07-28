var embedGist = ( function() {
    var removeGistStyleLink = function(writes) {
        if ( writes ) { // defer(ed)
            for ( var i = 0; i < writes.length; i++ ) {
                var tagStart = writes[i].substring(0, 5);
                if (tagStart.toLowerCase() === '<link') {
                    writes[i] = ''; break; // only 1 css
                }
            }
        }
        else { // loaded in-place
            var linkNode = this.nextSibling;
            while (linkNode && linkNode.nodeName.toLowerCase() !== 'link') {
                linkNode = linkNode.nextSibling;
            }
            if (linkNode) linkNode.parentNode.removeChild(linkNode);
        }
    }
    var loadingImage = 'http://lh3.ggpht.com/_1cUPEWaecTI/S7NlT7aMiEI/AAAAAAAAGnQ/oYr7y_xqN24/s800/loader.gif';
    var gistLoadingHTML =
        '<div title="... loading gist ..." style="border:1px solid #DEDEDE; background-color:#141414; display: block;">' +
            '<img src="' + loadingImage + '" style="display: block; margin: 0 auto; padding: 12px 0; border: 0;"/>' +
        '</div>' ;
    return function embedGist(gist) {
        script({ src: gist, base: 'http://gist.github.com', defer: true, 
            loaded: removeGistStyleLink, loadingHTML: gistLoadingHTML 
        });
    };
})();