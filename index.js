import express from "express"
import axios from "axios"

const app = express();
const PORT = 3000;


app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res)=> {
    res.render('index', { content: "" })
});

app.post("/lyrics", async(req,res)=>{
    try{
        
        const artist = req.body.artist;
        const title = req.body.title;
        const URL= `https://api.lyrics.ovh/v1/${artist}/${title}`;
        const response = await axios.get(URL);
        const result = response.data;

        res.render('display', ({content : result.lyrics}));
    } catch(error) {
        console.log(error.response.data)
        res.render('index', { content: null, error: "Lyrics not found. Please try again." });
    }
})

app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`)
})