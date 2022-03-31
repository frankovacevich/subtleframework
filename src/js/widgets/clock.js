class Clock{

    constructor(object, parameters={}){
        this.params = {
            show_seconds: true,
        };
        
        for(const p in parameters){ this.params[p] = parameters[p]; };
        
        this.object = (typeof object === "string" ? document.getElementById(object) : object);  
    }   

    update(time){

    }
}

exports.Clock = Clock;
