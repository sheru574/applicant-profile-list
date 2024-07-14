import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import AvatarsList from './components/avatarsList';
import AvatarsEditModal from './components/avatarEditModal';

const ApplicantProfile = () => {
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [skills, setSkills] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({ type: 'skill', query: '' });
  const [validationMessages, setValidationMessages] = useState({});

  useEffect(() => {
    import('./stubs/avatarsList.json')
      .then(({ avatars }) => {
        setAvatars(JSON.parse(JSON.stringify(avatars)));
      });
  }, []);

  const handleEditClick = (avatar) => {
    setSelectedAvatar(avatar);
    setSkills(JSON.parse(JSON.stringify(avatar.skills)));
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedAvatar(null);
  };

  const handleSkillAdd = () => {
    const newSkill = { skill: '', rating: '', action: 'apply' };
    setSkills([...skills, newSkill]);
  };

  const handleSkillUpdate = (index, field, value) => {
    const updatedSkills = skills.map((skill, idx) => {
      if (index === idx) {
        if (value) {
          if (validationMessages.hasOwnProperty(index)) {
            delete validationMessages[index][field]
          }
        } else {
          if (!validationMessages[index]) validationMessages[index] = {};
          validationMessages[index][field] = `${field.charAt(0).toUpperCase()}${field.slice(1)} is required`;
        }
      }

      return idx === index ? { ...skill, [field]: value, action: 'update' } : skill
    }
    );
    setSkills(updatedSkills);
    const updatedErrors = Object.assign({}, validationMessages);
    if (Object.keys(updatedErrors).length) setValidationMessages(updatedErrors);
    if (Object.keys(updatedErrors).length === 0) setSkills(updatedSkills);
  };

  const handleSkillApply = (index) => {
    const skill = skills[index];
    const errors = validateSkill(skill.skill, skill.rating, index);
    let updatedErrors = null;
    if (Object.keys(errors[index]).length) updatedErrors = Object.assign({}, validationMessages, errors);
    setValidationMessages(updatedErrors);

    if (Object.keys(errors).length === 0) {
      const updatedSkills = skills.map((skill, idx) =>
        idx === index ? { ...skill, action: 'edit' } : skill
      );
      setSkills(updatedSkills);
    }
  };

  const handleSkillEdit = (index) => {
    const updatedSkills = skills.map((skill, idx) =>
      idx === index ? { ...skill, action: 'update' } : skill
    );
    setSkills(updatedSkills);
  };

  const handleSkillDelete = (index) => {
    const updatedSkills = skills.filter((_, idx) => idx !== index);
    setSkills(updatedSkills);
  };

  const handleApplyChanges = () => {
    const updatedAvatarsList = avatars.map(avatar => {
      if (selectedAvatar.profileId === avatar.profileId) {
        return { ...avatar, skills };
      } else {
        return { ...avatar };
      }
    });

    setAvatars(updatedAvatarsList);
    setIsModalVisible(false);
    setSelectedAvatar(null);
  };

  const handleSearchCriteriaChange = (event) => {
    setSearchCriteria({ ...searchCriteria, type: event.target.value });
  };

  const handleSearchQueryChange = (event) => {
    setSearchCriteria({ ...searchCriteria, query: event.target.value });
  };

  const validateSkill = (skill, rating, index) => {
    const errors = { [index]: {} };
    if (!skill) {
      errors[index].skill = 'Skill is required';
    }
    if (!rating) {
      errors[index].rating = 'Rating is required';
    } else if (isNaN(rating) || rating < 1 || rating > 5) {
      errors[index].rating = 'Rating must be a number between 1 and 5';
    }

    return errors;
  };

  const filteredSkills = skills.filter(skill => {
    if (searchCriteria.type === 'skill') {
      return skill.skill.toLowerCase().includes(searchCriteria.query.toLowerCase());
    } else if (searchCriteria.type === 'rating') {
      return String(skill.rating).toLowerCase().includes(searchCriteria.query.toLowerCase());
    }
    return true;
  });

  return (
    <div>
      <h1 className="display-6">Applicants Profiles List</h1>
      <AvatarsList avatars={avatars} handleEditClick={handleEditClick} />
      {isModalVisible && (
        <AvatarsEditModal
          selectedAvatar={selectedAvatar}
          filteredSkills={filteredSkills}
          handleModalClose={handleModalClose}
          searchCriteria={searchCriteria}
          handleSearchQueryChange={handleSearchQueryChange}
          handleSearchCriteriaChange={handleSearchCriteriaChange}
          handleSkillUpdate={handleSkillUpdate}
          handleSkillApply={handleSkillApply}
          handleSkillEdit={handleSkillEdit}
          handleSkillDelete={handleSkillDelete}
          handleApplyChanges={handleApplyChanges}
          handleSkillAdd={handleSkillAdd}
          validationMessages={validationMessages}
        />
      )}
    </div>
  );
};

export default ApplicantProfile;
