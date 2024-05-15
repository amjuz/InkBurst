import { Routes, BrowserRouter, Route } from "react-router-dom"
import { SignUp } from "./pages/SignUp"
import { Home } from "./pages/Home"
import { Blog } from "./pages/Blog"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<SignUp/>}/>
          <Route path="/blog" element={<Blog/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
