import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";

function Story() {
  return (
    <Link to="/challenge/1">
    <Button variant="destructive">
     Challenges
    </Button>
  </Link>
  )
}

export default Story
