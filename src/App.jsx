import React from 'react';

function App() {
  return (
    <div style={{ 
      padding: '50px', 
      textAlign: 'center',
      backgroundColor: '#f0f8ff',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#1890ff', fontSize: '2.5rem' }}>
        🚆 Rail Electr ERP
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#666' }}>
        Application en cours de chargement...
      </p>
      <div style={{ marginTop: '30px' }}>
        <button style={{ 
          padding: '12px 24px', 
          backgroundColor: '#1890ff', 
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem'
        }}>
          Test Réussi ✅
        </button>
      </div>
      <div style={{ marginTop: '20px', color: '#888' }}>
        Version: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
}

export default App;

