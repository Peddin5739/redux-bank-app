import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const userDetails = useSelector((state) => state.auth);
  console.log(userDetails.id);

  return (
    <div>
      <p>i am Home </p>
    </div>
  );
}
