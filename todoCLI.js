const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let tasklist = [];
console.log('Welcome to Todo CLI!')
console.log('--------------------')
rl.setPrompt(`(v) View • ( n ) New • (cX) Complete • (dX) Delete • (q) Quit\n>`)
rl.prompt()
rl.on('line', (key) => {
    if (key == 'v') {
        console.log(tasklist);
        rl.prompt();                
    } else if (key == 'n') {
        rl.question('What?\n', (input) => {
            let count = tasklist.length
            if (count == 0) {
                tasklist.push(`${count} [ ] ${input}`)
                console.log(tasklist)
                rl.prompt();
            } else {
                tasklist.push(`${count} [ ] ${input}`)
                console.log(tasklist)
                rl.prompt();
            }            
        })
    } else if (key[0] == 'c' && key[1] !== isNaN) {        
        let num = key.slice(1)
        let tempArr = tasklist[num].split('[ ]')
        tasklist[num] = tempArr.join('[✓]')
        console.log(tasklist[num])        
        rl.prompt();   
    } else if (key == 'q') {
            console.log(`See you soon! 😄`);
            rl.close();
    } else if (key[0] == 'd' && key[1] !== isNaN) {
        let num = key.slice(1)
        let newTasklist = []
        for (let i = 0; i < tasklist.length; i++) {
            let a = i.toString().length
            if (num != i) {
                newTasklist.push(tasklist[i].slice(a))  
                let j = newTasklist.length - 1; 
                newTasklist[j] = `${j}${newTasklist[j]}`;               
            }//filter out the index of line we don't want, and dele all the number of line
        }

        // for (let i = 0; i < newTasklist.length; i++) {       
        //     newTasklist[i] = `${i}${newTasklist[i]}`
        // }
        tasklist = newTasklist
        console.log(tasklist)
        rl.prompt(); 
    } else {
        console.log('Please enter a valid parameter to access.')
        rl.prompt();  
    }
}); 



