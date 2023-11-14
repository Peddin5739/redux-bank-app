export default function Home() {
  fetch("https://9qdlu2q5gk.execute-api.us-east-2.amazonaws.com/getcomponent", {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => console.log("datafrom HOME", data));

  return (
    <div>
      <p>i am Home </p>
    </div>
  );
}
