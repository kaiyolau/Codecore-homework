$(document).ready( () => {
    const database = ["Adam", "Alex", "Aaron", "Ben", "Carl", "Dan", "David", "Edward", "Fred", "Frank", "George", "Hal", "Hank", "Ike", "John", "Jack", "Joe", "Larry", "Monte", "Matthew", "Mark", "Nathan", "Otto", "Paul", "Peter", "Roger", "Roger", "Steve", "Thomas", "Tim", "Ty", "Victor", "Walter"]
    const imgArray = ['1_gallows.jpg', '2_gallows+head.jpg', '3_gallows+head+torso.jpg', '4_gallows+head+torso+leg.jpg', '5_gallows+head+torso+2leg.jpg', '6_gallows+head+torso+2leg+arm.jpg', '7_gallows+head+torso+2leg+2arm.jpg']
    const randomName = database[Math.floor(Math.random() * database.length)].toUpperCase().split("");
    console.log(randomName)
    let correctCount = 0
    let incorrectCount = 0
    const correct = new Audio("audio/correct-2-46134.mp3")
    const wrong = new Audio("audio/wronganswer-37702.mp3")
    const fail = new Audio("audio/die-41314.mp3")
    const victory = new Audio("audio/small-applause-6695.mp3")

    $('.test').html(`Answer: ${randomName}`)

    //display how many characters we have
    for (let i = 0; i < randomName.length; i++) {
        $('.word').append(`<span id=${i} class="letter">&#160&#160&#160</span>`) //eg <span id="1" class="letter">Y</span>
    }


    //Press Play Again button to reload the page
    $('.play-again').on('click', event => {
        location.reload();
    })



    $('.key').on('click', event => {
        let button = event.currentTarget.id //eg. <button id="Z" class="key rounded">, then we get the value of id only

        rolling(button)
    })


    function rolling(button) {
        if (randomName.includes(button)) {
            correct.play()
            $('.message').html("Right!")
            $(`#${button}`).css("background-color", "green")
            if (correctCount < randomName.length) {
                correctCount ++
                randomName.forEach((letter, i) => {
                    if(button === letter){
                        answerArr.push(letter);
                        $(`#${i}`).replaceWith(`<span id=${i} class="letter">${letter}</span>`)
                    }
                })
            } else {
                ending(victory,  "Congratulations! You win!");
            }
        } else {
            incorrectCount++
            wrong.play();
            $('.message').html("Wrong!")
            $(`#${button}`).css("background-color", "red")
            $("img.hangman-img").attr('src', `images/${imgArray[incorrectCount]}`);
            if (incorrectCount == 6) {
                ending(fail,  "Better luck next time...");
            }
        }
    }

    function ending(music, message){
        music.play();
        setTimeout(function(){
            alert(message);
            location.reload();
        }, 1000);
    }


});
