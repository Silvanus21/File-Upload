const express = require("express")
const fileUpload = require("express-fileupload")

const app = express()

app.use(fileUpload())

//app route 
app.post("/upload", (req, res) => {
    if (req.files === null) {
        return res.status(400).json({msg : "No file uploaded"})
    }

    const file = req.files.file
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err =>{
        if (err) {
            console.error(err)
            res.status(500).send(err)
        }

        res.json({ fileName : file.name, filePath : `/uploads/${file.name}` })
    })
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server live at port : ${port}`)
})