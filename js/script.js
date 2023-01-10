const prefix = '/'
const prefixVariable = '$'
var logCounter = 0

document.querySelector('#btn-processar').addEventListener('click', ()=>{
   commandRecognizer();
})

document.querySelector('#btn-limpar').addEventListener('click', ()=>{
    Limpar();
})

// document.querySelector('#expression').addEventListener('change', ()=>{
//     commandRecognizer()
// })

var variables = []

// limpar campos
function Limpar(){
    document.querySelector('#expression').value = ''
}

// reconhecedor de comandos
function commandRecognizer(){
    var expression = document.querySelector('#expression').value
    var result = document.querySelector('#result')
    var log = document.querySelector('#log')

    if(isCommand(expression)){

        switch(expression[1]){
            case 'T':
            case 't':
                generateTable(expression)
                result.innerHTML += '<hr> Comando de tabela reconhecido.'
                break

            case 'P':
            case 'p':
                generateParagraph(expression)
                result.innerHTML += '<hr> Comando de parágrafo reconhecido.'
                break

            case 'L':
            case 'l':
                generateList(expression)
                result.innerHTML += '<hr> Comando de lista reconhecido.'
                break
            case 'R':
            case 'r':
                generateTextRepeated(expression)
                result.innerHTML += '<hr> Comando de texto repetido reconhecido.'
                break
            case 'I':
            case 'i':
                generateTextBoolean(expression)
                result.innerHTML += '<hr> Comando de texto booleano reconhecido.'
                break
        }

   
    }else{
        // se for variavel
        if(isVariable(expression)){
            saveVariables(expression)
        }
    }

    //log
    logCounter += 1;
    if(isCommand(expression)){
        log.innerHTML += `<span class="text-success log-text">${logCounter}. ${expression}</span><br>`
    }else{
        if(isVariable){
            log.innerHTML += `<span class="text-success log-text">${logCounter}. ${expression}</span><br>`
        }else{
            log.innerHTML += `<span class="text-danger log-text">${logCounter}. ${expression}</span><br>`
        }
    }

    

}

// verificador de comandos
function isCommand(expression){
    if(expression[0] == prefix){
        document.getElementById('err').style.display = 'none'
        return true
    }else{
        if(isVariable){
            return false
        }else{
            document.getElementById('err').style.display = 'block'
            return false
        }
    }
}

// verificador de variavel
function isVariable(expression){
    if(expression[0] == prefixVariable){
        document.getElementById('err').style.display = 'none'
        return true
    }else{
        if(isCommand(expression)){
            return false
        }else{
            document.getElementById('err').style.display = 'block'
            return false
        }
        
    }
}

// gerador de tabelas /T
function generateTable(expression){

    document.querySelector('#result').innerHTML = ''
    var tempExpression;
    // criando tabela
    var table = document.createElement('table')
    table.setAttribute('class','table')
    
    var thead = document.createElement('thead')
    thead.setAttribute('class','bg-dark text-light')
    
    var tbody = document.createElement('tbody')

    table.appendChild(thead)
    table.appendChild(tbody)


    var regExp = /(?<=\{).*(?=\})/ ;

    tempExpression = regExp.exec(expression)[0]

    var expressionArray = tempExpression.split('|')

    

    //switch de classes de estilo da tabela
    switch(expressionArray[0]){
        case 'usual':
            table.setAttribute('class','table table-bordered')
            break
        case 'striped':
            table.setAttribute('class','table table-striped table-bordered')
            break
        default:
            table.setAttribute('class','table table-bordered')
            break
    }

    //removendo o primeiro elemento que nao vai ser mais usado.
    expressionArray.shift()


    expressionArray.forEach((element, index) =>{
         
        if(element.indexOf('&')!= -1){
            var tr = document.createElement('tr')   

            var tempLine = element.split('&')
            tempLine.forEach((line, index)=>{
                tr.innerHTML += `<td>${line}</td>`
            })

            tbody.appendChild(tr)
        }else{
            var tr = document.createElement('tr')
            tr.innerHTML += `<td>${element}</td>`
            tbody.appendChild(tr)
        }

        // // titulo thead
        // if(index == 0){
        //     var trHead = document.createElement('tr')    
        //     trHead.innerHTML += `<th>${element}</th>`
        //     thead.appendChild(trHead)
        // }

        // // corpo tbody
        // var tr = document.createElement('tr')
        // tr.innerHTML += `<td>${element}</td>`
        // tbody.appendChild(tr)

    })

    document.querySelector('#result').appendChild(table)

    


    console.log(expressionArray)

}

// gerador de paragrafos /P
function generateParagraph(expression){
    document.querySelector('#result').innerHTML = ''
    var tempExpression

    var regExp = /(?<=\{).*(?=\})/ ;

    tempExpression = regExp.exec(expression)[0]

    var expressionArray = tempExpression.split('|')
    var div = document.createElement('div')
    

    //switch de classes de estilo da tabela
    switch(expressionArray[0]){
        case 'light':
            div.setAttribute('class','bg-light text-dark')
            break
        case 'dark':
            div.setAttribute('class','bg-dark text-light')
            break
    }

    //removendo o primeiro elemento de estilo que nao vai ser mais usado.
    expressionArray.shift()


    expressionArray.forEach((element, index) =>{
        div.innerHTML += `<p>${element}</p>`
    })

    result.appendChild(div)

    console.log(expressionArray)

}

// gerador de listas /L
function generateList(expression){

    document.querySelector('#result').innerHTML = ''
    var tempExpression;
    // criando tabela
    var ul = document.createElement('ul')

    var regExp = /(?<=\{).*(?=\})/ ;

    tempExpression = regExp.exec(expression)[0]

    var expressionArray = tempExpression.split('|')

    //switch de classes de estilo da lista
    switch(expressionArray[0]){
        case 'dark':
            ul.setAttribute('class','bg-dark text-light')
            break
        case 'light':
            ul.setAttribute('class','bg-light text-dark')
            break
        default:
            ul.setAttribute('class','bg-dark text-light')
            break
    }

    //removendo o primeiro elemento que nao vai ser mais usado.
    expressionArray.shift()


    expressionArray.forEach((element, index) =>{
         
        ul.innerHTML += `<li>${element}</li>`

    })

    document.querySelector('#result').appendChild(ul)

    


    console.log(expressionArray)

}

// gerador de texto repetido /R
function generateTextRepeated(expression){
    document.querySelector('#result').innerHTML = ''
    var tempExpression

    var regExp = /(?<=\{).*(?=\})/ ;

    tempExpression = regExp.exec(expression)[0]

    var expressionArray = tempExpression.split('|')
    var div = document.createElement('div')
    

    //switch de classes de estilo da tabela
    switch(expressionArray[0]){
        case 'light':
            div.setAttribute('class','bg-light text-dark')
            break
        case 'dark':
            div.setAttribute('class','bg-dark text-light')
            break
    }

    //removendo o primeiro elemento (estilo) de estilo que nao vai ser mais usado.
    expressionArray.shift()

    //pegando a quantidade de vezes
    var repeatTimes = parseInt(expressionArray[0])
    expressionArray.shift()


    for(var i = 0; i < repeatTimes; i++){
        expressionArray.forEach((element, index) =>{
            div.innerHTML += `<p>${element}</p>`
        })
    }

    result.appendChild(div)

    console.log(expressionArray)
}

// gerador de texto boleano /I
function generateTextBoolean(expression){
    document.querySelector('#result').innerHTML = ''
    var tempExpression

    var regExp = /(?<=\{).*(?=\})/ ;

    tempExpression = regExp.exec(expression)[0]

    var expressionArray = tempExpression.split('|')
    var div = document.createElement('div')
    

    //switch de classes de estilo da tabela
    switch(expressionArray[0]){
        case 'light':
            div.setAttribute('class','bg-light text-dark')
            break
        case 'dark':
            div.setAttribute('class','bg-dark text-light')
            break
    }

    //removendo o primeiro elemento (estilo) de estilo que nao vai ser mais usado.
    expressionArray.shift()

    var showText
    if(parseInt(expressionArray[0]) == 0){
        showText = false
    }else{
        showText = true
    }

    expressionArray.shift()
    
    if(showText){
        expressionArray.forEach((element, index) =>{
            div.innerHTML += `<h4>${element}</h4>`
        })
    }else{

    }

    result.appendChild(div)

    console.log(expressionArray)
}

// verificador de existencia de varivavel
function variableExists(variableName) {
    return variables.some(function(el) {
      return el.name === variableName;
    }); 
}

// guardador de variavel
function saveVariables(expression){

    if(isVariable){
        var tempVariableValue 
        
        // pegando o nome da variavel
        var regExpVariableName = /(?<=\$).*(?=\/)/ ;
        var tempVariableName = regExpVariableName.exec(expression)[0]

        // pegando dentro das chaves
        var regExp = /(?<=\{).*(?=\})/ ;
        tempVariableValue = regExp.exec(expression)[0]

        // verificando se há alguma expressao nas chaves
        //----- soma
        if(tempVariableValue.indexOf('+') != -1){
            var tempSomaArray = tempVariableValue.split('+')
            tempVariableValue = 0
            tempSomaArray.forEach(element => {
                tempVariableValue += parseFloat(element)
            })
        }else{
                //----- diferenca
            if(tempVariableValue.indexOf("-") != -1){
                var tempDifArray = tempVariableValue.split('-')
                tempVariableValue = 0
                tempDifArray.forEach((element, index) => {
                    if(index == 0){
                        tempVariableValue = parseFloat(element)
                    }else{
                        tempVariableValue -= parseFloat(element)
                    }
                })
            }else{

                //----- multiplicacao
                if(tempVariableValue.indexOf('*') != -1){
                    var tempMultArray = tempVariableValue.split('*')
                    tempVariableValue = 1
                    tempMultArray.forEach((element, index) => {

                        tempVariableValue = tempVariableValue * parseFloat(element)
                    })
                }
            }
        }

        
        // verificando se ja existe variavel
        if(variableExists(tempVariableName)){
            if(confirm('variável já existente, deseja substituir?') == true){
                changeVariable(tempVariableName, tempVariableValue)
                document.querySelector('#variable-table-display').innerHTML += `<tr><td>${tempVariableName}</td><td>${tempVariableValue}</td></tr>`
            }else{
                document.querySelector('#err-var-exists').style.display = 'block'
                return
            }
        }else{ 
            document.querySelector('#err-var-exists').style.display = 'none'
            variables.push({name: tempVariableName, value: tempVariableValue})
            document.querySelector('#variable-table-display').innerHTML += `<tr><td>${tempVariableName}</td><td>${tempVariableValue}</td></tr>`
        }
        
    }
    console.log(variables)
}

function changeVariable(name, value){
    variables.forEach((element, index)=>{
        if(element.name == name){
            variables[index].value = value
        }
    })
}

