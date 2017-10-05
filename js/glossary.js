var glossary = (function() {
    
    var module = {};
    
    var mappings;
    
    d3.csv("data/mappings.csv", function(err, data) {
        if (err) throw err;
        
        mappings = data;
    
        mappings.forEach(function(d) {
            d3.selectAll(".term." + d.id)
                .attr("title", d.name + " — " + d.description);

            tippy(".term", {animation: false, duration: 0, delay: 0, size: "big"});
        });
    });
    
    
    return module;
})();