const AvatarCard = ({ avatar, handleEditClick }) => {
  return (
    <div className="avatar-card card" key={avatar.id}>
      <div className="card-body">
        <img src={avatar.image} alt={avatar.name} width={'40px'} height={'40px'} className="card-img-top" />
        <h5 className="card-title"> {avatar.name}</h5>
        <button type="button" 
        className="btn btn-primary" 
        onClick={() => handleEditClick(avatar)}
       style={{width:'100%'}}
        >
          Edit Profile
        </button>
        <ul className="card-body" >
          <b>Skills:</b>
          {avatar.skills.map((skillObj, index) => {
            return <li key={index}>{skillObj.skill}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default AvatarCard;