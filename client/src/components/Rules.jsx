import socketIO from "socket.io-client"

const socket = socketIO.connect("http://localhost:4000")
  socket.on('lobby-created', data => {
    const user = {name: 'test', team: 0, role:0, ready: false}
    socket.emit('join-lobby', {user, lobbyId: '1234'})
  })
  
  socket.on('user-connected', data => {
    console.log('User connected:', data.message);
    // Handle the user-connected event
  });

function Rules() {

  return (
   <>
       <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime nihil sapiente nesciunt explicabo in suscipit laboriosam aperiam, eaque earum maiores ullam unde reiciendis esse eum sunt minima magni asperiores sed possimus. Aperiam possimus sequi eos quis cum voluptatum iste, tenetur fugiat accusantium rem, distinctio nesciunt aliquid nisi beatae necessitatibus ex et at? Voluptas cumque quasi nostrum earum ea quibusdam neque obcaecati magni omnis mollitia quis possimus esse doloribus, doloremque accusantium odio fugiat aliquid impedit at. Vero aliquam cupiditate quo assumenda possimus enim maxime illum, eos doloremque aliquid ad architecto nobis nostrum repellat, reiciendis culpa. Quibusdam perferendis esse quae excepturi dolorem?</p>
       <a href="/"><button className="button">Back home</button></a>

   </>
  );
}

export default Rules;
