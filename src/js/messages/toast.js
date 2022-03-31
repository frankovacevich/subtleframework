class Toast{

    constructor(){}

    // =========================================================================
    // DRAW CONTROL
    // =========================================================================
    show(toast_class, text){

        // create div
        var toast_div = document.getElementById("s-toast");
        if(!toast_div){
            toast_div = document.createElement('div');
            toast_div.id = 's-toast';
            toast_div.className = 'toast';
            document.getElementsByTagName('body')[0].appendChild(toast_div);
        } else if(toast_div.classList.contains("show")){
            return;
        }

        // set text
        toast_div.innerHTML = text;

        // set class
        if(toast_class != ""){toast_div.classList.add(toast_class);}

        // show
        toast_div.classList.add("show");

        // remove after 5 seconds
        var tout = setTimeout(function(){ 
            if(toast_class != ""){ toast_div.classList.remove(toast_class); }
            toast_div.classList.remove("show");
            clearTimeout(tout); 
        }, 5000);

        return this;
    }
}

exports.Toast = Toast;
