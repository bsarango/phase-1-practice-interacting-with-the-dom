//Create DOM challenge code 

//Timer w/ asynchronous JS

//This timer uses asynchronous js to run timerUpdate ever 1 sec
function startTimer(){
    let timer = setInterval(timerUpdate,1000)
    return timer
}

timer = startTimer()

document.querySelector("#minus").addEventListener("click",decreaseCounter)

document.querySelector("#plus").addEventListener("click",increaseCounter)

document.querySelector("#heart").addEventListener("click",updateLikes)

document.querySelector("#pause").addEventListener("click",changeWithPause)

const commentForm = document.querySelector("#comment-form")
commentForm.addEventListener("submit",addComment)

let counterValue = document.querySelector("#counter")

const numbersLiked = []     //Will be an array that holds an object with numbers that are liked and the number of times they're liked

//timerUpdate uses counterValue, initialized above, to parseInt the innerHTML/text of the "counter"
//set the innnerHTML(can also use innerText) to one more than the last number - assuming this makes the number a string again
function timerUpdate(){
    let number = parseInt(counterValue.innerHTML,10)
    counterValue.innerHTML = number+1
}

//We parseInt the innerHTML value and check to see if its greater than 0. Set the innerHTML to one less
function decreaseCounter(event){    // works!
    if(parseInt(counterValue.innerHTML)>0){
        let number = parseInt(counterValue.innerHTML,10)
        counterValue.innerHTML = number-1 
    }
}

//Same as above function except it increases regardless of the value
function increaseCounter(event){ // works!
    let number = parseInt(counterValue.innerHTML,10)
    counterValue.innerHTML = number+1 
}

function updateLikes(event){    //Works to changes the type of comment
    if(checkIfLiked(counterValue)===true){
        numbersLiked.forEach(number => {
            if(number.numberValue === parseInt(counterValue.innerText)){
                const ul = document.querySelector("ul")
                const newLi = document.createElement("li")
                number.timesLiked += 1
                newLi.innerText = `${number.numberValue} has been liked ${number.timesLiked} times`
                ul.appendChild(newLi)
            }
        })
    }
    else {
        numbersLiked.push({
            numberValue: parseInt(counterValue.innerText),
            timesLiked: 1,
        })
        const ul = document.querySelector("ul")
        const newLi = document.createElement("li")
        newLi.innerText = `${(numbersLiked[numbersLiked.length-1]).numberValue} has been liked ${(numbersLiked[numbersLiked.length-1]).timesLiked} time`
        ul.appendChild(newLi)
    }
}

function checkIfLiked(counterValue){
    let valueMatches = false
    numbersLiked.forEach(number => {
        if (number.numberValue === parseInt(counterValue.innerText)){
            valueMatches = true
        }
    })
    return valueMatches
}

function addComment(e){ //Works!
    e.preventDefault()
    
    const inputComment = document.querySelector("#comment-input")
    console.log(inputComment.value)
    const commentSpace = document.querySelector("#list")
    const comment = document.createElement("p")
    comment.innerHTML = `
        <h4> ${inputComment.value}</h4>
    `
    commentSpace.appendChild(comment)
}

function changeWithPause(event){    //Works!
    const pause = document.querySelector("#pause")
    if(pause.innerText === "pause"){    //pauses everything
        pause.innerText = "resume"
        document.querySelector("#minus").disabled = true
        document.querySelector("#plus").disabled = true
        document.querySelector("#heart").disabled = true
        document.querySelector("#submit").disabled = true
        clearInterval(timer)
    }
    else if(pause.innerText === "resume"){  //resumes everything
        pause.innerText = "pause"
        document.querySelector("#minus").disabled = false
        document.querySelector("#plus").disabled = false
        document.querySelector("#heart").disabled = false
        document.querySelector("#submit").disabled = false
        timer=startTimer()
    }
}

//