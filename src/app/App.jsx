import React, { useState } from 'react';

export const App = function () {
  const [pings, setPings] = useState([]);

  window.electron.on('ping', (args) => {
    const newPings = [...pings, args];
    setPings(newPings);
  });

  return (
    <div>
      <h1>App</h1>
      <p>
        <button type="button" onClick={() => window.porra.hello()}>
          Go
        </button>
      </p>
      <p>{pings[pings.length - 1]}</p>
      {/* <ul>
        {pings.map((ping) => (
          <li key={ping}>{ping}</li>
        ))}
      </ul> */}
    </div>
  );
};
