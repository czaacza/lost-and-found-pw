import './ListOfUsers.css';
import { useGlobalContext } from '../../context/GlobalContext';
import UserPhoto from '../Profile/UserPhoto/UserPhoto';
import UserInfo from '../Profile/UserInfo/UserInfo';
import avatar from '../../img/avatar-placeholder.png'; 
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function ListOfUsers() {
    const { t } = useTranslation();
    const { users } = useGlobalContext();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      <input
        type="text"
        placeholder={t('Search users')}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="profiles-container">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <Link to={`/profile/${user.username}`} className="user-profile-info">
              <UserPhoto photo={user.image ? user.image : avatar} />
              <UserInfo label={t('Username')} value={user.username} />
              <UserInfo label={t('Email')} value={user.email} />
            </Link>
          ))
        ) : (
          <div className="no-users-message">{t('No users found with that name.')}</div>
        )}
      </div>
    </div>
  );
}

export default ListOfUsers;
