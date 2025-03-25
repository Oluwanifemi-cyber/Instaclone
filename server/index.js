import app from "./src/app.js";
import connectToDb from "./src/config/database.js";

const port = process.env.PORT || 4500;

if (!port) {
    throw new Error("Please there is aport number provided");
}

//initialize server
connectToDb()
.then(() => {
    startServer();
})
.catch((error) => {
    console.log("Invalid database connection", error); 
});

function startServer() {
    app.listen(port, () => {
        console.log(`Server is connected to port ${port}`);    
    });
}