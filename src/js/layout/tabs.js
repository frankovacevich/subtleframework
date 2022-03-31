class TabsLayout {

    /*
    <div id="tablayout">
        <div> // a flex container
            <div>
                <div class="tabs-layout-container">
                    <div class="tab-item">
                        <div class="tab-icon"></div>
                        <div class="tab-text"></div>
                    </div>
                </div>
            </div>
        <div>
    </div>
    */

    constructor(object, tabs, parameters){
        
        this.params = {
            show_labels : true,
            show_labels_inline: false,
            position : "center", // center, left, fill
            show_icons : true,
            icon_size : 16,
            dock_bottom: false,
            direction: 'horizontal', // horizontal, vertical
        };
        
        for(const p in parameters){ this.params[p] = parameters[p]; };
        
        this.object = (typeof object === "string" ? document.getElementById(object) : object);
        this.tabs = tabs;

        // Init
        this.draw();
    }

    // ===============================================================================
    // DRAW CONTROL
    // ===============================================================================
    draw(){
        
        let jc = {"left":"flex-start", "fill":"space-evenly", "center":"center"}[this.params.position];
        
        let prt_ = '<div style="display:flex; flex-direction:column; justify-content: ' + jc + '; height: 100%; width: 100%;">';
        let str_ = '<div style="width:100%;">';
        
        str_ += '<div class="tabs-layout-container" style="display: ' + (this.params.direction == "vertical" ? "block" : "flex") + '; direction:' +' align-content: stretch; justify-content: ' + jc + ';">';
        
        let w = this.params.icon_size;
        for(const t in this.tabs){
            
            // create flex container
            str_ += '<div id="tab_' + this.tabs[t].div + '" class="no-selectable tab-item" style="width:' + (this.params.show_labels_inline || this.params.direction == "vertical" ? 'auto' : w*2+10 + 'px' ) + '; flex-direction:' + (this.params.show_labels_inline ? 'row' : 'column') + '; ">';
            
            // add icons
            if(this.params.show_icons){
                str_ += '<div class="tab-icon" style="font-size:' + w + 'px; height:' + w*1 + 'px; line-height:' + (w) + 'px">' + this.tabs[t].icon + '</div>';
            }
            
            // add labels
            if(this.params.show_labels){
                if(this.params.show_labels_inline){
                    str_ += '<div class="tab-text" style="padding-left:' + (this.params.show_icons ? '10' : '0') + 'px;">';
                } else {
                    str_ += '<div class="tab-text" style="margin-top: 5px;">';
                }
                str_ += this.tabs[t].label + '</div>';
            }
            
            str_ += '</div>';
            
            // hide all tab divs
            let dv = document.getElementById(this.tabs[t].div);
            dv.style.height = "100%";
            dv.style.width = "100%";
            dv.style.display = "none";
        }
        
        str_ += '</div>';
        str_ += '</div>';
        
        
        //
        let inner_html = this.object.innerHTML;
        let result = prt_ + str_ + inner_html + "</div>";
        if(this.params.dock_bottom){
            result = prt_ + inner_html + str_ + "<div>";
        }
        this.object.innerHTML = result;
        
        // clicks
        var parent = this;
        for(const t in this.tabs){
            this.object.getElementsByClassName("tabs-layout-container")[0].childNodes[t].onclick = function(){ parent.select_tab(t) };
        }
        
        this.select_tab(0);
    }
    
    select_tab(tabid){
        var parent = this;
        //
        for(const s in parent.tabs){
            document.getElementById(parent.tabs[s].div).style.display = "none";
            //parent.object.getElementsByClassName("tabs-layout-container")[0].childNodes[s].style.color = "var(--colors-font)";
            parent.object.getElementsByClassName("tabs-layout-container")[0].childNodes[s].classList.remove("selected");
        }
        document.getElementById(parent.tabs[tabid].div).style.display = "block";
        //parent.object.getElementsByClassName("tabs-layout-container")[0].childNodes[tabid].style.color = "var(--colors-primary) !important";
        parent.object.getElementsByClassName("tabs-layout-container")[0].childNodes[tabid].classList.add("selected");
        
        if(parent.tabs[tabid].onselect){
            parent.tabs[tabid].onselect();
        }
    }

}

exports.TabsLayout = TabsLayout;
