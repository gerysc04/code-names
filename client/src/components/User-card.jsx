function UserCard({ user }) {
const {name, ready} = user

return ( 
  <>
  <div className="user">
    <h2 className="text user-name" >{name}</h2>
    <h2 className="text">{ready ? ' ready' : ' not ready'}</h2>
  </div>
  </>
);
}

export default UserCard;
