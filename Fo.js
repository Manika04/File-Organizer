//It is a command Line Project
// let inputArr = process.argv[1]; //file address aa jayega
// let inputArr = process.argv[0]; //node.exe file aa jayega and 3 mein undefined aa jayega
//node Fo.js Manika is acting as an array where node is at 0th index and so on
//slice se 2nd index se phele wala ka hatt jayega
// console.log(inputArr);

let inputArr = process.argv.slice(2); //input aayega aa jayega
const fs = require('fs');
const path = require('path');
const helpModule = require('./commands/help')
const organizeModule = require('./commands/organize')
const treeModule = require('./commands/tree')

let command = inputArr[0]; //Idhar zero isliye lagaya hai kyuki slice se 0 or 1st index hatt gaya i.e node and Fo.js

//SWITCH CASE
switch(command){
    case 'tree':
        treeModule.treeKey(inputArr[1], " ");
        break;
    
    case 'organize':
        organizeModule.organizeKey(inputArr[1]);
        break;
    
    case 'help':
        helpModule.helpKey();
        break;  
        
    default:
        console.log("Please Enter valid input");
        break;    
}







