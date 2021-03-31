function initTranslator(){
	window.index = 0
	window.indent = 0
}

function translateToHTML(tree, words, lexems, currentStream){
	let s = ""
	if(tree.value.isTerminal()){
		if(window.index < lexems.length){
			let w = words[window.index]
			let l = lexems[window.index].toString()
			if (l=="#") {
				s = s + "\n <h1>"
			}
			if (l=="-") {
				s = s +"\n <ul><li>"
			}
			if(l=="\\n"){
				let wordClone = [...words]
				let bucket = wordClone.splice(0,window.index)
				bucket = bucket.join(" ¤¤¤¤¤¤ ")
				bucket = bucket.split("\\n")
				bucket = bucket[bucket.length - 1]
				bucket = bucket.split(" ¤¤¤¤¤¤ ")

				if(bucket[0] == "")
					bucket.splice(0,1)


				switch(bucket[0]){
					case '#' :{
						bucket = bucket.splice(1)
						s = s + bucket.join(" ") + "</h1>"
						break;
					}
					case '-' : {
						bucket = bucket.splice(1)
						s = s + bucket.join(" ") + "</li></ul>"
						break;
					}
					case '*' : {
						s = s + w + "</i>"
						break;
					}
					default : {
						let text = bucket.join(" ")
						text = text.split("*")
						if(text.length > 1){
							for (var i = 0; i < text.length-1; i++) {
								text[i] += i%2 == 0 ? "<i>" : "</i>"
							}
						}
						text = text.join(" ")

						text = text.split("`")
						if(text.length > 1){
							for (var i = 0; i < text.length-1; i++) {
								text[i] += i%2 == 0 ? "<code>" : "</code>"
							}
						}
						text = text.join(" ")


						s = s + "\n <p>" + text + "</p>"
						break;
					}

				}
			}
			

			window.index = window.index+1
		}

	}
	else{
		for(let child of tree.children){
			s = s + translateToHTML(child, words, lexems, s)
		}
	}
	return s
}