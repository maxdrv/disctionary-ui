import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PhraseGridView from "./components/PhraseGridView";
import PlanGridView from "./components/PlanGridView";
import PlanDetailedView from "./components/PlanDetailedView";
import LessonGridView from "./components/LessonGridView";
import LessonDetailedView from "./components/LessonDetailedView";

const rootPath = 'http://localhost:8081'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />}>
                  <Route path="phrase" element={<PhraseGridView rootPath={rootPath}/>} />
                  <Route path="plan">
                      <Route
                          index
                          element={<PlanGridView rootPath={rootPath}/>}
                      />
                      <Route path=":planId" element={<PlanDetailedView rootPath={rootPath}/>}/>
                  </Route>
                  <Route path="lesson">
                      <Route
                          index
                          element={<LessonGridView rootPath={rootPath}/>}
                      />
                      <Route path=":lessonId" element={<LessonDetailedView rootPath={rootPath}/>}/>
                  </Route>
                  <Route
                      path="*"
                      element={
                          <main style={{ padding: "1rem" }}>
                              <p>There's nothing here!</p>
                          </main>
                      }
                  />
              </Route>
          </Routes>
      </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
