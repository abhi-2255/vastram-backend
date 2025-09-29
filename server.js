import dotenv from "dotenv"


dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())


const PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log(`Server running on ${PORT}`)
)