const AvatarsEditModal = ({
  selectedAvatar,
  filteredSkills,
  handleModalClose,
  searchCriteria,
  handleSearchQueryChange,
  handleSearchCriteriaChange,
  handleSkillUpdate,
  handleSkillApply,
  handleSkillEdit,
  handleSkillDelete,
  handleApplyChanges,
  handleSkillAdd,
  validationMessages
}) => {
  return (
    <div className='edit-avatar-modal'>
      <div className="modal-dialog">
        <div className="modal-content modal-content-avatar">
          <div>
            <h2 style={{ display: 'inline-block', width: '85%' }}>Edit Profile for {selectedAvatar.name}</h2>
            <button type="button" className="btn-close" onClick={handleModalClose} style={{ float: 'right' }}></button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
            <img
              src={selectedAvatar.image}
              alt={selectedAvatar.name}
              width={'300px'}
              height={'300px'}
              style={{ flex: 1, border: '1px solid lightgrey', borderRadius: '10px' }}
            />

            {/* Search Box and Dropdown */}
            <div style={{ flex: 2 }}>
              <div >
                <input
                  type="text"
                  placeholder="Search..."
                  className="form-control"
                  style={{ display: 'inline-block', width: '50%' }}
                  value={searchCriteria.query}
                  onChange={handleSearchQueryChange}
                />
                <select
                  className="form-select"
                  style={{ display: 'inline-block', width: '50%' }}
                  value={searchCriteria.type}
                  onChange={handleSearchCriteriaChange}
                >
                  <option value="skill">Skill</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
              {/* Skills Table */}
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Skill</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSkills.map((skill, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          value={skill.skill}
                          onChange={(e) => handleSkillUpdate(index, 'skill', e.target.value)}
                          disabled={skill.action === 'edit'}
                          className="form-control"
                        />
                        {validationMessages[index] && validationMessages[index].skill && (
                          <span className="error">{validationMessages[index].skill}</span>
                        )}
                      </td>
                      <td>
                        <input
                          type="number"
                          value={skill.rating}
                          onChange={(e) => handleSkillUpdate(index, 'rating', e.target.value)}
                          disabled={skill.action === 'edit'}
                          className="form-control"
                          min={1}
                          max={5}
                        />
                        {validationMessages[index] && validationMessages[index].rating && (
                          <span className="error">{validationMessages[index].rating}</span>
                        )}
                      </td>
                      <td>
                        {skill.action === 'apply' && <button type="button" className="btn btn-light" onClick={() => handleSkillApply(index)}>Apply</button>}
                        {skill.action === 'update' && <button type="button" className="btn btn-light" onClick={() => handleSkillEdit(index)}>Update</button>}
                        <button type="button" className="btn btn-light" onClick={() => handleSkillDelete(index)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <button type="button" className="btn btn-primary" onClick={handleApplyChanges} >Apply Changes</button>
                <button type="button" className="btn btn-primary" onClick={handleSkillAdd}>Add Skill</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default AvatarsEditModal;