function drawLine (num) {
    return '━'.repeat(num)
}

function drawTopBorder(num) {
    return '┏' + drawLine(num) + '┓'
}

function drawMiddleBorder (num) {
    return '┣' + drawLine(num) + '┫'
}

function drawBottomBorder(num) {
    return '┗' + drawLine(num) + '┛'
}

function drawBarsAround (string) {
    return '┃' + string + '┃'
}

//user input as array

const input = process.argv.slice(2)
console.log(boxIt(input)) //putting 


function boxIt (arr) {
    //define string
    let input = []
    input.push(arr)
    
    //define the largest string
    let larLength = 0
    if (arr.length !== 0) {
        arr.forEach(element => {
            if (element.length>larLength) {
                larLength = element.length
            }
        });        
    } else {
        arr = arr // do nothing
    }        

    //the real thing going on here
    let output = ''
    output += drawTopBorder(larLength)+'\n'
    if (larLength !== 0) {
        for (let i = 0; i < arr.length; i++) {
            if (i !== (arr.length-1)) { //all iteration except last one
                output += drawBarsAround(arr[i]+' '.repeat(larLength-arr[i].length)) +'\n'
                output += drawMiddleBorder(larLength)+'\n'
            } else { //the last iteration
                output += drawBarsAround(arr[i]+' '.repeat(larLength-arr[i].length)) +'\n'
                output += drawBottomBorder(larLength)
            }            
        }        
    } else {//printout if there isn't content
        output += drawBottomBorder(0) 
    }
    return output
}


// console.log(boxIt(['Jon Snow', 'Cersei Lannister', 'Cersei Lannister']))
// console.log(boxIt(['Jon Snow']))
// console.log(boxIt(''))