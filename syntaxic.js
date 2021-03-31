



function markdownSyntaxicAnalysis(lexems, rules, table){
	let actual = rules[0].left
	let tree = new Node(actual)
	let node = tree
	let i=0
	let cut = 0
	
	while (i < lexems.length && cut < 1000){
		let lexem = lexems[i]
		
		let lexemT = new Terminal(lexem)
		
		if (actual.isTerminal()){
			if (actual.symbol == "ε"){
				node = tree.next(node)
				actual = node.value	
			}
			else if (actual.symbol == lexemT.symbol){
				i = i+1
				node = tree.next(node)
				actual = node.value
			}
			else{
				throw "My Syntax Error: " + lexemT.toString() + " instead of "+ actual.toString()
			}
		}
		else{

			// Dans un première partie, on va voir si la règle est présente
			// C'est BEAUCOUP plus dur qu'en python
			let isInRules = false
			let keys = Object.keys(table[actual])


			for(let j of keys){
				// dans "keys" les clé sont stocké en string, du coup  je dois faire un eval pour retrouver la "vrai variable"
				let ij = eval(j.toString())

				if(ij.symbol == lexemT.symbol){
					isInRules = true
					lexemT = j
				}
			}

			if (isInRules){
				let rule = table[actual][lexemT]
				for (let symbol of rule.expression){
					node.addChild(new Node(symbol))
				}
				node = node.children[0]
				actual = node.value
			}
			else{
				alert("My Syntax Error: no rule from " + actual.toString())
				throw "My Syntax Error: no rule from " + actual.toString()
			}
		}
		cut = cut+1
	}
	return tree
}