export default function () {
    class Cat{
    	constructor(){
    		this.name="小德玛";
    	}
    	print(){
    		console.log(this.name);
    	}
    }
    return Cat;
};