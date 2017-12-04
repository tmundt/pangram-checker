// Global scope
// Define immutable objects for inter-functional access
const alphabet = "abcdefghijklmnopqrstuvwxyz";
var characterMap = {};


function initCharacterMap () {
    // init map of chars to track presence of each char in user input
    for(var i=0; i < alphabet.length; i++) {
        var currentChar = alphabet.charAt(i);
        characterMap[currentChar]= 0;
    }
}

function checkInput(event) {
    // if(event && event.keyCode == 13) {
    //     event.preventDefault();
    // }
    initCharacterMap();
    var missingLetters = [];
    // strip all non-alphabetic signs
    // check if sentence has 
    var sentence = document.getElementById('textual-input').value.toLowerCase();
    
    for(var i=0; i < sentence.length; i++) {
        //check if character is letter
        var currentChar = sentence.charAt(i);
        if(isLetter(currentChar)) {
            characterMap[currentChar] += 1;
        }
    }
    var outputString = '';

    // check and output missing letters
    // @object/construct: characterMap
    // @params: key = letter, value = occurences (number)
    Object.keys(characterMap).forEach(function(key) {   
        //console.log(key, characterMap[key]);
        if(characterMap[key] === 0) {
            missingLetters.push(key);   
        }
    });

    // iterate over array to build output string
    // on last index, do not print,
    // on index 10, make a line break
    for(var i=0; i < missingLetters.length; i++) {
        outputString += missingLetters[i];
        // Append separator to letter if it is not last one in array
        if(i != missingLetters.length-1) {
            outputString += ', ';
        }
    }

    // Show Pangram Status
    document.getElementById('pangram-status-container').style.display = 'block';

    // View missing letters
    if (outputString.length > 0) {
        // Write missing Letters into view
        document.getElementById('missing-letters').innerHTML = outputString;
        document.getElementById('status').innerHTML = 'not valid';
        document.getElementById('status').style.color = 'red';
        document.getElementById('pangram-status-container').style.borderColor = 'red';
        document.getElementById('missing-letters-container').style.display = 'block';
    } else {
        document.getElementById('status').innerHTML = 'valid';
        document.getElementById('status').style.color = 'green';
        document.getElementById('pangram-status-container').style.borderColor = 'green';
        document.getElementById('missing-letters-container').style.display = 'none';
    }
}

function isLetter(character) {
    return character.length === 1 && character.match(/[a-z]/i);
}

document.getElementById('submit-input-button').onclick = checkInput;

// Check keys to enable submit via ENTER key
document.getElementById('textual-input').onkeyup = function(event) {
    if(event.keyCode === 13) {
        checkInput();
    }
}; 