const app = require("./app")
const { PORT } = process.env;

console.log("hello code")
app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`)
})