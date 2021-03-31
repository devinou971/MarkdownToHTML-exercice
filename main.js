let PROG = new NonTerminal("PROG")
let LIGNE = new NonTerminal("LIGNE")
let HASHTAGS = new NonTerminal("HASHTAGS")
let PUCE = new NonTerminal("PUCE")
let TITRE = new NonTerminal("TITRE")
let LISTE = new NonTerminal("LISTE")
let TEXTE = new NonTerminal("TEXTE")
let ITALIC = new NonTerminal("ITALIC")
let CODE = new NonTerminal("CODE")
let CODEDELIMITER = new NonTerminal("CODEDELIMITER")

let epsylon = new Terminal("ε")
let moins =new Terminal("-")
let dollar =new Terminal("")
let etoile = new Terminal("*")
let accentGrave = new Terminal("`")
let hashtag = new Terminal("#")
let plainText = new Terminal("plainText")
let retourLigne = new Terminal("\\n")



let Rule1 = new Rule(PROG, [LIGNE, PROG, retourLigne])
let Rule2 = new Rule(PROG, [ epsylon ])
let Rule3 = new Rule(LIGNE, [ TITRE])
let Rule4 = new Rule(LIGNE, [ PUCE ])
let Rule5 = new Rule(LIGNE, [ TEXTE ])
let Rule6 = new Rule(TITRE, [ HASHTAGS, plainText, retourLigne ])
let Rule7 = new Rule(HASHTAGS, [ hashtag ])
//let Rule8 = new Rule(HASHTAGS, [ twoHashtags ])
//let Rule9 = new Rule(HASHTAGS, [ threeHashtags ])
let Rule10 = new Rule(PUCE, [ moins, plainText, retourLigne ])
let Rule11 = new Rule(TEXTE, [ ITALIC,  TEXTE ])
let Rule12 = new Rule(TEXTE, [ CODE,  TEXTE ])
let Rule13 = new Rule(TEXTE, [ plainText ])
let Rule131 = new Rule(TEXTE, [ retourLigne ])
let Rule14 = new Rule(TEXTE, [ epsylon ])
let Rule15 = new Rule(ITALIC, [ etoile, plainText, etoile ])
let Rule16 = new Rule(CODE, [ CODEDELIMITER, plainText, CODEDELIMITER ])
let Rule17 = new Rule(CODEDELIMITER, [ accentGrave])


let grammarMarkdown = [
	Rule1,
	Rule2, 
	Rule3, 
	Rule4, 
	Rule5, 
	Rule6, 
	Rule7, 
	//Rule8, 
	//Rule9, 
	Rule10, 
	Rule11, 
	Rule12, 
	Rule13, 
	Rule14, 
	Rule15, 
	Rule16, 
	Rule17
]

let tableMarkdown = {
 	PROG : 			{retourLigne : Rule1, moins : Rule1, hashtag : Rule1, etoile : Rule1, accentGrave : Rule1, plainText : Rule1, dollar : Rule2},
	LIGNE : 		{retourLigne : Rule1, moins : Rule4, hashtag : Rule3, etoile : Rule5, accentGrave : Rule5, plainText : Rule5, dollar : Rule5},
	TITRE : 		{retourLigne : Rule3, hashtag : Rule6},
	HASHTAGS : 		{hashtag : Rule7, plainText : Rule6},
	PUCE : 			{retourLigne : Rule10, moins : Rule10},
	TEXTE : 		{retourLigne : Rule131,etoile : Rule11, accentGrave : Rule12, plainText : Rule13, dollar : Rule14},
	ITALIC : 		{retourLigne : Rule11, etoile : Rule15, accentGrave : Rule11, plainText : Rule11, dollar : Rule11},
	CODE : 			{retourLigne : Rule12, etoile : Rule12, accentGrave : Rule16, plainText : Rule12, dollar : Rule12},
	CODEDELIMITER: 	{retourLigne : Rule16, etoile : Rule12, accentGrave : Rule17, plainText : Rule16, dollar : Rule12}
}


function makeTranslation(){
	let input = document.querySelector("#code")
	
	let code = input.value + "\n"
	code = code + " "
	let blob = markedownLexicalAnalysis(code)

	let words = blob[0]
	let lexems = blob[1]

	let tree = markdownSyntaxicAnalysis(lexems, grammarMarkdown, tableMarkdown)

	initTranslator()
	let transformedCode = translateToHTML(tree, words, lexems, "")

	let renduDiv = document.querySelector("#rendu")
	renduDiv.innerHTML = transformedCode

	let codeDiv = document.querySelector("#HTMLcode")
	codeDiv.innerHTML = transformedCode

}