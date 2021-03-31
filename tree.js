class Node{
	constructor(value){
		this.value = value
		this.children = []
	}
	addChild(child){
		this.children.push(child)
	}
	lr(){
		let result = []
		result.push(this.value)
		for(let node of this.children){
			result = result.concat(node.lr())
		}
		return result
	}

	leaves(){
		let result = [ ]
		if (this.children.length == 0){
			result.push(this)
		}
		for (let node of this.children){
			result = result.concat(node.leaves())
		}
		return result
	}

	toString(){
		return this.__str(0)
	}

	__str( level){
		let s = this.__indent(level)
		s = s + (level>0 ? "-" : "") + this.value.toString() + "\n"
		for (let child of this.children){
			s += child.__str(level+1)
		}
		return s
	}

	__indent( level){
		let s = ""
		for (let i = 0 ; i<level ; i++){
			s = s+"  |"
		}
		return s
	}


	next( node){
		let leaves = this.leaves()
		if (leaves.includes(node)){
			let i = leaves.findIndex((e)=>e==node)
			if (i < leaves.length-1){
				return leaves[i+1]
			}
			else{
				return null
			}
		}
		else{
			return null
		}
	}
}
