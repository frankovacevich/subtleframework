class Indicator{

    // show: object, tooltip, content, class
    // hide: object

    constructor(object){
        this.object = (typeof object === "string" ? document.getElementById(object) : object);
    }

    // =========================================================================
    // DRAW CONTROL
    // =========================================================================
    show(indicator_class, content, tooltip, animate=false){
        var indicator_div = document.getElementById(this.object.id + "_indicator");

        // create div
        if(!indicator_div){
            indicator_div = document.createElement('div');
            indicator_div.id = this.object.id + "_indicator";
            indicator_div.className = 'indicator';
            document.getElementsByTagName('body')[0].appendChild(indicator_div);
        }

        // show
        if(!indicator_div.classList.contains("show")){ 
            indicator_div.classList.add("show"); 
        }

        // add class
        if(indicator_class != "" && !indicator_div.classList.contains(indicator_class)){ 
            indicator_div.classList.add(indicator_class); 
        }

        // content
        indicator_div.innerHTML = content;

        // tooltip
        if(tooltip != "" && typeof tippy !== "undefined"){
            tippy('#' + indicator_div.id, {content: "<span class='tippy-tip'>" + tooltip + "</span>", allowHTML: true,});
        }

        // animate
        if(animate){
            indicator_div.classList.add("animate"); 
        }

        // position
        var rect = this.object.getBoundingClientRect();
        console.log(rect);
        indicator_div.style.left = rect.right + "px";
        indicator_div.style.top  = rect.top + "px";

        return this;
    }

    hide(){
        var indicator_div = document.getElementById(this.object.id + "_indicator");
        if(indicator_div){ indicator_div.classList.remove("show"); }
    }

}

exports.Indicator = Indicator;
