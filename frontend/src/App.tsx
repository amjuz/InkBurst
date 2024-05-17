import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Blog } from "./pages/Blog"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"

function App() {

  return (
    <>
      <div className="">
        <Routes>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/blog" element={<Blog/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="*" element={<>route not defined</>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
