import path from "path";
import fs from "fs";

// Create a folder
// fs.mkdir(path.join(__dirname, "testFolder"), {}, error => {
//     if(error) throw error;
//     console.log("Folder created");
// });

// Create and write to a file (overwrite)
fs.writeFile(path.join(__dirname, "testFolder", "test.txt"), "Hello", error => {
    if (error) throw error;
    console.log("Folder written to");

    // Append to a file (does not overwrite)
    fs.appendFile(path.join(__dirname, "testFolder", "test.txt"), " World", error => {
        if (error) throw error;
        console.log("Folder appended to");

        // Read from a file
        fs.readFile(path.join(__dirname, "testFolder", "test.txt"), "utf8", (error, data) => {
            if (error) throw error;
            console.log(data);

            // Rename the file
            fs.rename(path.join(__dirname, "testFolder", "test.txt"), path.join(__dirname, "testFolder", "test2.txt"), error => {
                if(error) throw error;
                console.log("File renamed successfully");
            });
        });
    });
});


