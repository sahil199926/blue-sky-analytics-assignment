import React, { useState } from 'react'
import Constdata from "../../Constant/Constants";
import './Controls.css'
function Controls({ setCategory, setYear, setMultipleCountries }) {
    const [multipleCountry, addMultipleCountries] = useState(['Australia']);
    function addCountry(country, check) {
        if (check) {
            addMultipleCountries([...multipleCountry, country])
        }
        else {
            const deleteCountry = multipleCountry.filter((i) => i !== country)
            addMultipleCountries(deleteCountry)
        }
    }
    function submitMultipleCountries() {
        // console.log(multipleCountry)
        setMultipleCountries(multipleCountry)

    }

    return (
        <><div style={{ width: '15%',minWidth:"69px" }} >
            <select onChange={(e) => { setYear(e.target.value) }}>
                {Constdata.years.map(i => <option>{i}</option>)}
            </select>
        </div>
            <div style={{ display: "flex", width: "85%",minWidth:'69%',flexWrap:"wrap"  }} >

                <div className='multiple'><p>Select Multiple Countries</p></div>
                <div className='multiple-option' >{Constdata.countryOption.map((i) => <><input type="checkbox" disabled={!multipleCountry.includes(i) && multipleCountry.length > 4} checked={multipleCountry.includes(i)} id={i} onClick={(e) => addCountry(e.target.value, e.target.checked)} name={i} value={i} />
                    <label for={i}>{i}</label><br></br></>)}
                </div>
                <button className={multipleCountry.length?"button":"button-disable"} disabled={!multipleCountry.length} onClick={submitMultipleCountries}>Go</button>
            </div>
            <div>
                <select style={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis',marginTop:'13px' }} onChange={(e) => setCategory(e.target.value)}  >
                    {Constdata.categoryOption.map(i => <option style={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>{i}</option>)}
                </select>
            </div>

        </>
    )
}

export default Controls
