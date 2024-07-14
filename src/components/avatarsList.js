import AvatarCard from './avatarCard';

const AvatarsList = ({ avatars, handleEditClick }) => {
  return (
    <div className="avatar-list">
      {avatars.map((avatar, index) => <AvatarCard key={index} avatar={avatar} handleEditClick={handleEditClick} />)}
    </div>
  )
}

export default AvatarsList;