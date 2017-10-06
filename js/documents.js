var documents = (function() {

    var module = {};
    var __map__;
    
    var prefix = window.__data_folder_root__ ? __data_folder_root__ : "";

    d3.csv(prefix + "data/documents.csv", function(err, data) {

        if (err) throw err;
        
        data.forEach(function(d){
            d.adjudication_date = new Date(d.adjudication_date);
        });
        
        __map__ = d3.map(data, function(d) {return d.doc_id});
    });

    module.getById = function(id) {
        return __map__.get(id);        
    };

    return module;
})();