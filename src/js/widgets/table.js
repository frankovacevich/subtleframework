class Indicator{
    
    constructor(object, parameters={}){
        this.params = {
            headers : ["A","B","C","D"],
            header_aliases : {},
            table_class : "subtletable",
            
            show_row_headers : true,
            row_header_width : 60,
            null_cell_text : '',
            nullable_columns : [],
            
            allow_sort : false,
            
            content_editable : false,
            
            actions: {},  // { content, onclick(row) }
        };
        
        for(const p in parameters){ this.params[p] = parameters[p]; };
        
        this.object = (typeof object === "string" ? document.getElementById(object) : object);
        
        this.data = [];
        this.sort_column = null;
        this.sort_reverse = false;
    }
    
    // =========================================================================
    // DRAW CONTROL
    // =========================================================================
    draw(){
        
        // Open table tag
        var ctr_ = '';
        ctr_ += `<table class="${this.params.table_class} ${this.params.content_editable ? 'content-editable' : ''}">`;
        
        // Headers
        
        // .add row header
        if(this.params.show_row_headers){
            ctr_ += `<th style="width:${this.params.row_header_width}px">#</th>`;
        }
        
        // .add headers
        for(const h in this.params.headers){
            var header = this.params.headers[h];
            ctr_ += `<th>`;
            
            // ..sorteable
            if(this.params.allow_sort){
                ctr_ += `<span style="cursor:pointer" id="table_${this.object.id}_sort_by_column_${header}">`;
                ctr_ += header in this.params.header_aliases ? this.params.header_aliases[header] : header;
                if(this.sort_column == header){
                    ctr_ += `<span>${this.sort_reverse ? ">" : "<"}</span>`;
                }
                ctr_ += `</span>`;

            // ..non-sorteable
            } else {
                ctr_ += header in this.params.header_aliases ? this.params.header_aliases[header] : header;
            }
            
            ctr_ += `</th>`;
        }

        // .add action headers
        for(const a in this.params.actions){
            ctr_ += `<th>${this.params.actions[a]["label"]}</th>`;
        }
        
        // Data
        let i = 0;
        for(const r in this.data){
            i += 1;
            ctr_ += `<tr>`;
            
            // .add row header
            if(this.params.show_row_headers){
                ctr_ += `<td>${i}</td>`; 
            }
            
            // .add cell
            for(const h in this.params.headers){
                let col = this.params.headers[h];

                let cell = this.params.null_cell_text
                if(col in this.data[row]){ cell = this.data[row][col] }
                ctr_ += `<td ${this.params.content_editable ? 'contenteditable' : ''}>${cell}</td>`; 
            }

            // .add actions
            for(const a in this.params.actions){
                ctr_ += `<td>${a.content}</td>`;
            }
            
            ctr_ += `</tr>`;
        }
        
        // Close table tag
        ctr_ += `</table>`;
        this.object.innerHTML = ctr_;
        
        // Add sorting listeners
        var parent = this;
        if(this.params.allow_sort){
            for(const h in this.params.headers){
                let header = this.params.headers[h];
                document.getElementById(`table_${this.object.id}_sort_by_column_${header}`).onclick = function(){
                    parent.sort(header);
                }
            }
        }

        
    }
    
    // =========================================================================
    // UPDATE
    // =========================================================================
    update(data){
        this.data = data;
        this.draw();
    }
    
    // =========================================================================
    // SORT
    // =========================================================================
    sort(column=null, reverse=null){
        if(column === null){ column = this.sort_column; }
        else{ this.sort_column = column; }
        
        if(reverse === null){ reverse = this.sort_reverse; }
        else{ this.sort_reverse = reverse; }
        
        var data = this.data;
        var f = function(a,b){};
        if(typeof data[this.data_index[0]][column] == "string"){
            if(reverse) {
                f = function(a,b){
                    if(data[a][column] == undefined && data[b][column] == undefined) return 0
                    if(data[a][column] == undefined) return 1
                    if(data[b][column] == undefined) return -1
                    return data[b][column].localeCompare(data[a][column])
                } 
            } else {
                f = function(a,b){
                    if(data[a][column] == undefined && data[b][column] == undefined) return 0
                    if(data[a][column] == undefined) return 1
                    if(data[b][column] == undefined) return -1
                    return data[a][column].localeCompare(data[b][column])
                } 
            }
        } else {
            if(reverse) {
                f = function(a,b){
                    if(data[a][column] == undefined && data[b][column] == undefined) return 0
                    if(data[a][column] == undefined) return 1
                    if(data[b][column] == undefined) return -1
                    return data[b][column] - data[a][column]
                } 
            } else { f = function(a,b){
                    if(data[a][column] == undefined && data[b][column] == undefined) return 0
                    if(data[a][column] == undefined) return 1
                    if(data[b][column] == undefined) return -1
                    return data[a][column] - data[b][column]
                } 
            }
        }
            
        this.data.sort(f)
    }
                
    // =========================================================================
    // GET CHANGES
    // =========================================================================
    get_changes(){
        
    }
    
}

exports.Indicator = Indicator;
            