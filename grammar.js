

class Terminal{
    symbol = ""
    constructor(symbol){
        this.symbol = symbol
    }
    toString(){
        return this.symbol
    }
    isTerminal(){
        return true;
    }
}

class NonTerminal{
    symbol = ""
    constructor(symbol){
        this.symbol = symbol
    }
    toString(){
        return this.symbol
    }
    isTerminal(){
        return false;
    }
}

class Rule{
    constructor(left, expression){
        this.left = left
        this.expression = expression
    }
    toString(){
        let s = this.left.toString() + " -> "
        for(let i of this.expression){
            s += i.toString() + " "
        }
        return s
    }
}