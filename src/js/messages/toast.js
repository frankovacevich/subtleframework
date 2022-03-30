class Toast{

    constructor(){}

    // =========================================================================
    // DRAW CONTROL
    // =========================================================================
    show(toast_class, text){
        var toast_div = document.getElementById("s-toast");
        if(!toast_div){
            toast_div = document.createElement('div');
            toast_div.id = 's-toast';
            toast_div.className = 'toast';
            document.getElementsByTagName('body')[0].appendChild(toast_div);
        } else if(toast_div.classList.contains("show")){
            return;
        }

        toast_div.innerHTML = text;
        if(toast_class != ""){toast_div.classList.add(toast_class);}
        toast_div.classList.add("show");

        var tout = setTimeout(function(){ 
            toast_div.classList.remove(toast_class); 
            toast_div.classList.remove("show");
            clearTimeout(tout); 
        }, 5000);
    }
}

exports.Toast = Toast;
