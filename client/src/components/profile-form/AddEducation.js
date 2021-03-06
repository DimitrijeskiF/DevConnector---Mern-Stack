import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addEducation } from './../../actions/profile'
import Alert from './../layout/Alert';

const AddEducation = ({ addEducation, history }) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstyudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false)
    const {
        school,
        degree,
        fieldofstyudy,
        from,
        to,
        current,
        description
    } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = (e) => {
        e.preventDefault();
        addEducation(formData, history)
    }
    return (
        <div className='container'>
            <Alert />
            <h1 className="large text-primary">
                Add An Education
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any school or bootcamp that you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* School or Bootcamp"
                        name="school"
                        required
                        value={school}
                        onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Degree or Certificate"
                        name="degree"
                        required
                        value={degree}
                        onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Field of Study"
                        name="fieldofstyudy"
                        value={fieldofstyudy}
                        onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input
                        type="date"
                        name="from"
                        value={from}
                        onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <p><input
                        type="checkbox"
                        name="current"
                        checked={current}
                        value={current}
                        onChange={e => {
                            setFormData({ ...formData, current: !current });
                            toggleDisabled(!toDateDisabled)
                        }} /> Current Job</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input
                        type="date"
                        name="to"
                        value={to}
                        onChange={e => onChange(e)}
                        disabled={toDateDisabled ? 'disabled' : ''} />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        value={description} onChange={e => onChange(e)}
                        cols="30"
                        rows="5"
                        placeholder="Program Description"
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </div>
    )
}

AddEducation.propTypes = {
    addExperience: PropTypes.func.isRequired
}


export default connect(null, { addEducation })(AddEducation)