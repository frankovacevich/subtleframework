class Overlay{

    constructor(){}

    // =========================================================================
    // DRAW CONTROL
    // =========================================================================
    show(content){

        // create div
        var overlay_div = document.getElementById("s-overlay");
        if(!overlay_div){
            overlay_div = document.createElement('div');
            overlay_div.id = 's-overlay';
            overlay_div.className = 'overlay';
            document.getElementsByTagName('body')[0].appendChild(overlay_div);
        }

        // text
        overlay_div.innerHTML = content;

        // show
        overlay_div.classList.add("show");

        return this;
    }

    hide(){
        var overlay_div = document.getElementById("s-overlay");
        if(overlay_div){ overlay_div.classList.remove("show"); }
    }
}

exports.Overlay = Overlay;
