import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button"


function Home() {

  return (
    <>

         <Link className={buttonVariants({ variant: "outline" })}  to="/story">Login</Link>
    </>
  )
}

export default Home
