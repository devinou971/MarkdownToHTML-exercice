# Markedown vers HTML
C'est un exercice pour le DUT

## Rappel des commandes git :

````
git add -A
git commit
git push
````

## La grammaire : 

J'ai décidé de prendre cette grammaiore : 

````
PROG 			=> 	LIGNE retourLigne PROG | e
LIGNE 			=> 	TITRE | PUCE | TEXTE 
TITRE			=> 	HASHTAGS plainText retourLigne
HASHTAGS 		=>	hashtag | hashtag hashtag | hashtag hashtag hashtag
PUCE			=> 	moins plainText retourLigne
TEXTE 			=>	ITALIC TEXTE | CODE TEXTE | plainText | retourLigne | e
ITALIC			=> 	etoile plainText etoile
CODE 			=> 	CODEDELIMITER plainText CODEDELIMITER
CODEDELIMITER 	=>	accentGrave accentGrave accentGrave accentGrave 

PREMIER(PROG)			=> hashtag etoile accentGrave plainText moins
PREMIER(LIGNE)			=> hashtag etoile accentGrave plainText moins
PREMIER(TITRE)			=> hashtag
PREMIER(HASHTAGS)		=> hashtag
PREMIER(PUCE)			=> moins
PREMIER(TEXTE)			=> moins etoile accentGrave plainText
PREMIER(ITALIC)			=> etoile
PREMIER(CODE)			=> accentGrave
PREMIER(CODEDELIMITER)	=> accentGrave

SUIVANT(PROG)			=> $ retourLigne
SUIVANT(LIGNE)			=> $ retourLigne
SUIVANT(TITRE)			=> $ retourLigne
SUIVANT(HASHTAGS)		=> $ plainText
SUIVANT(PUCE)			=> $ retourLigne
SUIVANT(TEXTE)			=> $ etoile accentGrave plainText retourLigne
SUIVANT(ITALIC)			=> $ etoile accentGrave plainText retourLigne
SUIVANT(CODE)			=> $ etoile accentGrave plainText retourLigne
SUIVANT(CODEDELIMITER)	=> $ etoile accentGrave plainText retourLigne
````

## Ce que la grammaire supporte : 

Cette grammaire est très simpliste et ne supporte que les expressions très basiques du MarkDown : \

Les titres basiques sont gérés : 
````
# Mon titre
````

Les puces aussi : 
````
- Ma puce
````

Les textes en italique : 

````
*Mon texte en italique*
````

Le code aussi est géré (il doit être sur 1 seule ligne) : 

````
` mon code `
````

