

function markedownLexicalAnalysis(code){
	let sep = [" ", "\n", "\t"]
	let reserved = { 
		"#" : "#",
		"*" : "*",
		"`" : "`",
		"-" : "-",
		"\\n" : "\\n"
	}
	code = code.replaceAll("\n", "\\n")
	let words = []
	let lexems = []
	let i = 0
	let builtWord = ""
	while(i<code.length){
		if (sep.includes(code[i])) {
			if (builtWord.length != 0) {
				if(code[i-builtWord.length-1] != "\\n" && (lexems[lexems.length - 1] == "plainText")){
					words[words.length -1 ] += " " + builtWord
				}
				else{
					words.push(builtWord)
					lexems.push("plainText")
				}
			}
			builtWord = ""
			i = i+1
		}
		else{
			let foundWord = null
			let foundLexem = null
			let indexes = Object.keys(reserved)
			for (let word of indexes){
				let lexem = reserved[word]
				if (word == code.slice(i,i+word.length)){
					foundWord = word
					foundLexem = lexem
				}
			}
			if (foundWord != null) {
				if (builtWord.length != 0){
					if(lexems[lexems.length-1] == "plainText")
						words[words.length-1] +=  " " + builtWord
					else{
						words.push(builtWord)
						lexems.push("plainText")
					}
					
					builtWord = ""
				}
				words.push(foundWord)
				lexems.push(foundLexem)
				i=i+foundWord.length

			}
			else{
				builtWord = builtWord + code[i]
				i = i+1
			}
		}
	}
	return [words,lexems]
}