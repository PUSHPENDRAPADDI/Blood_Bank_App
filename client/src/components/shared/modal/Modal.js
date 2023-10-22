import React, { useState } from 'react';
import InputType from '../form/InputType.js'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import API from './../../../services/api.js'

const Modal = () => {
    const [inventoryType, SetInventoryType] = useState("in");
    const [bloodGroup, SetBloodGroup] = useState("");
    const [quantity, SetQuantity] = useState("");
    const [donarEmail, SetDonarEmail] = useState("");
    const { user } = useSelector(state => state.auth)
    const handleModalSubmit = async () => {
        try {
            if (!bloodGroup || !quantity) {
                toast.error("Please Provide All Fields")
            }
            const { data } = await API.post('/inventory/create-inventory', {
                donarEmail,
                email: user?.email,
                organisation: user?._id,
                inventoryType,
                bloodGroup,
                quantity
            })
            if (data?.success) {
                toast.success("New Record Created")
                window.location.reload()
            }
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
            window.location.reload()
        }
    }

    return (
        <>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Manage Blood Record</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <div className="d-flex mb-3">
                                Blood Type &nbsp;
                                <div className="form-check ms-3">
                                    <input
                                        type="radio"
                                        name='inRadio'
                                        defaultChecked
                                        className="form-check-input"
                                        value={'in'}
                                        onChange={(e) => SetInventoryType(e.target.value)}
                                    />
                                    <label htmlFor="in" className='form-check-label'>In</label>
                                </div>
                                <div className="form-check ms-3" >
                                    <input
                                        type="radio"
                                        name='inRadio'
                                        className="form-check-input"
                                        value={'out'}
                                        onChange={(e) => SetInventoryType(e.target.value)}
                                    />
                                    <label htmlFor="out" className='form-check-label'>Out</label>
                                </div>
                            </div>
                            <select className="form-select" aria-label="Default select example"
                                onChange={(e) => SetBloodGroup(e.target.value)}>
                                <option defaultValue={'Select Bloood Group'} >Select Bloood Group</option>
                                <option value={'O+'}>O+</option>
                                <option value={'O-'}>O-</option>
                                <option value={'AB+'}>AB+</option>
                                <option value={'AB-'}>AB-</option>
                                <option value={'A+'}>A+</option>
                                <option value={'A-'}>A-</option>
                                <option value={'B+'}>B+</option>
                                <option value={'B-'}>B-</option>
                            </select>
                            <InputType
                                labelText={inventoryType === 'in' ? 'Donar Email' : 'Hospital Email'}
                                labelFor={inventoryType === 'in' ? 'donarEmail' : 'hospitalEmail'}
                                inputType={'email'}
                                value={donarEmail}
                                onChange={(e) => SetDonarEmail(e.target.value)}
                            />
                            <InputType
                                labelText={'Quantity (ML)'}
                                labelFor={'quantity'}
                                inputType={'number'}
                                value={quantity}
                                onChange={(e) => SetQuantity(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal">
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleModalSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal