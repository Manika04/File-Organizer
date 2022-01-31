const fs = require('fs');
const path = require('path');

//object to categorize the files
let types = {
    media: ["mp4", "mkv", "mp3","jpeg","jpg","png"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
      "docx",
      "doc",
      "pdf",
      "xlsx",
      "xls",
      "odt",
      "ods",
      "odp",
      "odg",
      "odf",
      "txt",
      "ps",
      "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
};

function organizefn(dirpath){
    let destPath;
    if(dirpath == undefined){
        //check whether dirpath is passed or not
        console.log("Please Enter a valid directory path");
        return;
    } else{
        //this will tell whether the dirpath exists or not
        let doesExist = fs.existsSync(dirpath);
        // console.log(doesExist);  //true or false
        
        if(doesExist == true){
            //isse naya folder banega and destPath uska path carry karega i.e organizedFiles
            destPath = path.join(dirpath, 'organizedFiles');
            
            // C:\Users\Manik\OneDrive\Desktop\pepcoding\web\Projects\test folder\organizedFiles - want to create a folder with this path

            if(fs.existsSync(destPath) == false){
                //we will only create a folder if it does not already exists
                fs.mkdirSync(destPath);
            } else{
                console.log("This folder already exist");
            }
        } else{
            console.log("Please enter a valid path");
        }
    }
    organizeHelper(dirpath, destPath);
}


//We are writting this func to categorize our files
function organizeHelper(src, dest){
    //check how many files are present in test folder(src). This will show both files and folders.
    let childNames = fs.readdirSync(src); 
    // console.log(childNames);

    //to eliminate folders from the childNames array
    for(let i = 0; i < childNames.length; i++){
        let childAddress = path.join(src, childNames[i]);
        // console.log(childAddress);
        let isFile = fs.lstatSync(childAddress).isFile();
        // console.log(isFile); //gives ans in T/F 

        if(isFile == true){
            //we took all the categories of diff files
            let fileCategory = getCategory(childNames[i]);
            console.log(childNames[i] + " belongs to " + fileCategory);
            sendFiles(childAddress,dest,fileCategory);
        }
    }
}

function getCategory(name){
    let ext = path.extname(name);
    ext = ext.slice(1); // isse ext name ke aage se . hatt jayega
    // console.log(ext);

    //here insted of key we have written type
    for(let type in types){
        let cTypeArr = types[type];
        // console.log(cTypeArr);

        for(let i = 0; i<cTypeArr.length; i++){
            //we matched the extentions with the values present in cTypeArr
            if(ext == cTypeArr[i]){
                return type;
            }
        }
    }
    return 'others';
}

function sendFiles(srcFilePath, dest, fileCategory){
    let catPath = path.join(dest, fileCategory); //here we are making file category path
    if(fs.existsSync(catPath) == false){
        fs.mkdirSync(catPath); //category folders aa jayege isse
    }

    //we took out names of the files
    let fileName = path.basename(srcFilePath);
    //we created paths for the files in category folders
    let destFilePath = path.join(catPath, fileName);
    //copied files from src to dest
    fs.copyFileSync(srcFilePath, destFilePath);
    //deleted the files from src
    fs.unlinkSync(srcFilePath);
    console.log(fileName + " is copied to " + fileCategory);
}

module.exports = {
    organizeKey : organizefn
}