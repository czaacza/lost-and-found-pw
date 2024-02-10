import React from 'react';

const infoStyle = {
  marginBottom: '10px',
  fontSize: '16px',
};

const labelStyle = {
  fontWeight: 'bold',
};

function UserInfo({ label, value }) {
  return (
    <div style={infoStyle}>
      <span style={labelStyle}>{label}: </span>
      {value}
    </div>
  );
}

export default UserInfo;
