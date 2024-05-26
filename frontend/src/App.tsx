import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Blog } from "./pages/Blog"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { FullBlog } from "./pages/FullBlog"
import { NewBlog } from "./pages/NewBlog"

function App() {

  return (
    <>
      <div className="pt-20">
        <Routes>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/blogs" element={<Blog/>}/>
          <Route path="/blog/:id" element={<FullBlog />}/> 
          <Route path="/new-story" element={<NewBlog/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="*" element={<>route not defined</>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
