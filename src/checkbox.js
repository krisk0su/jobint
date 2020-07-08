import React from "react";
import "./checkbox.css";

export const CheckBox = (props) => {
  return (
    <div className="wrapper">
      <div className="upper-part">
        <div className="section one">
          <p>Base Checkbox</p>
          <label className="label">
            <input type="checkbox" checked={true} />
            Checkbox 1
          </label>
        </div>
        <div className="section two">
          <p>Stacked checkboxes</p>
          <label className="label">
            <input type="checkbox" checked={true} />
            <img />
            Checkbox 1
          </label>
          <label className="label">
            <input type="checkbox" checked={true} />
            Checkbox 2
          </label>
          <label className="label">
            <input type="checkbox" checked={true} />
            Checkbox 3
          </label>
        </div>
        <div className="section three">
          <p>Inline checkboxes</p>
          <div>
            <label className="label">
              <input type="checkbox" checked={true} />
              Checkbox 1
            </label>
            <label className="label">
              <input type="checkbox" checked={true} />
              Checkbox 2
            </label>
            <label className="label">
              <input type="checkbox" checked={true} />
              Checkbox 3
            </label>
          </div>
        </div>
      </div>
      <div className="lower-part">
        <div className="section">
          <p>Checked disabled</p>
          <label className="special-font blue-tick">
            <input type="checkbox" checked={true} />
            <b>text_primary</b>
          </label>
        </div>
        <div className="section">
          <p>Checked disabled</p>
          <label className="blue-tick">
            <input type="checkbox" disabled={true} checked={true} />
            Checkbox 1
          </label>
        </div>
        <div className="section">
          <p>Checked disabled</p>
          <label className="label">
            <input type="checkbox" disabled={true} checked={true} />
            Checkbox 1
          </label>
        </div>
        <div className="section">
          <p>Checked partial</p>
          <label className="black-tere">
            <input type="checkbox" checked={true} />
            Checkbox 1
          </label>
        </div>
        <div className="section">
          <p>Checked partial disabled</p>
          <label className="black-tere">
            <input type="checkbox" checked={true} disabled />
            Checkbox 1
          </label>
        </div>
      </div>
    </div>
  );
};
