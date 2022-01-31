const fs = require('fs');
const path = require('path');


function treeFn(dirpath){
    if(dirpath == undefined){
        console.log("Please Enter valid Directory Path");
        return;
    }else{
        let doesExist = fs.existsSync(dirpath);
        if(doesExist == true){
            treeHelper(dirpath, " ");
        }
    }
}

function treeHelper(targetPath, indent){
    let isFile = fs.lstatSync(targetPath).isFile(); //ki yeh file hai ya nhi i.e T/F ans aayega

    if(isFile == true){
        let fileName = path.basename(targetPath);
        console.log(indent + "├── " + fileName); //├── - include symbol
    }
    else{
        let dirName = path.basename(targetPath);
        console.log(indent + "└── " + dirName); //└── - down symbol

        //we took out all the children of test folder
        let children = fs.readdirSync(targetPath);
        // console.log(children);

        for(let i = 0; i < children.length; i++){
            let childPath = path.join(targetPath, children[i]);
            // console.log(childPath);
            treeHelper(childPath, indent + "\t"); //\t se space aata hai
        }
    }
}

module.exports = {
    treeKey : treeFn
}