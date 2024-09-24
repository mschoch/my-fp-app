import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { useFireproof } from 'use-fireproof';

import { connect } from '@fireproof/partykit'

function App() {
    console.log("app happened");
  const [docID, setDocID] = useState("");
    const [msg, setMsg] = useState("");
    const { database } = useFireproof("fptest")

    database.subscribe((docs) => {
        const docIds = docs.map(value => value._id).join(",")
        console.log("subscribe sees docs", docIds);
    }, true);

    // useEffect(() => {
    //     database.put({'foo':'bar'}).then(value => setDocID(value.id))
    // }, []);

  connect.partykit(database);

    function createDocument() {
        database.put({'foo':'bar'}).then(value => setDocID(value.id))
    }

    function checkAllDocsCount() {
        database.allDocuments().then(docs => {
            setMsg(`All Docs Length ${docs.rows.length}`);
        })
    }

  return (
      <>
          <h1>Vite + React + Fireproof + PartyKit</h1>
          <div className="card">
              <p>
                  Created DocID: ${docID}
              </p>
              <p>
                  ${msg}
              </p>
          </div>
          <button onClick={createDocument}>
              Create Document
          </button>
          <button onClick={checkAllDocsCount}>
              Check All Docs Count
          </button>
      </>
  )
}

export default App
