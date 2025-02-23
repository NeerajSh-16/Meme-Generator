import {useState, useEffect} from "react"

export default function Main() {
    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imageUrl: "https://i.imgFlip.com/1bij.jpg"
    }) 

    const [allMemes, setAllMemes] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
            //we did data.data b/c data variable that we get above is an object having data attribute
    }, [])  

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const newMemeUrl = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            imageUrl: newMemeUrl
        }))
    }

    function handleChange(event) {
        const {value, name} = event.currentTarget
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main>
            <div className="form">
                <label>Top text
                    <input type="test"
                    placeholder="Onr does not simply"
                    name="topText"
                    onChange={handleChange}
                    value={meme.topText} />
                </label>
                <label>Bottom Text
                    <input type="text"
                    placeholder="Walk into Mordor"
                    name="bottomText"
                    onChange={handleChange}
                    value={meme.bottomText} />
                </label>
                <button onClick={getMemeImage}>Get a new meme image</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}