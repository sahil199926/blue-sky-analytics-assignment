import React, { useEffect, useState } from 'react'
import Constdata from "../../Constant/Constants";
import './Controls.css'
function Controls({ setCategory, setYear, setMultipleCountries, singleCat, setSingleCat, ticked, setTicked,mapCategory,setMapCategory }) {
    const [multipleCountry, addMultipleCountries] = useState(['Australia']);
    const [multipleCategories, addMultipleCategories] = useState([Constdata.categoryOption[0]]);

    function addCountry(country, check) {



        if (check) {
            addMultipleCountries([...multipleCountry, country])

        }
        else {
            const deleteCountry = multipleCountry.filter((i) => i !== country)
            addMultipleCountries(deleteCountry)
        }

    }
    useEffect(() => {
        multipleCountry.length > 1 ? setSingleCat(true) : setSingleCat(false);
    }, [multipleCountry])

useEffect(() => {
    addMultipleCategories([Constdata.categoryOption[0]])
}, [singleCat])
    function addCategory(category, check) {
        if (check) {
            addMultipleCategories([...multipleCategories, category])

        }
        else {
            const deleteCategory = multipleCategories.filter((i) => i !== category)
            addMultipleCategories(deleteCategory)
        }
    }
    function submitMultipleCountries() {
        // console.log(multipleCountry)
        setMultipleCountries(multipleCountry)
        setCategory(multipleCategories)

    }

    return (
        <><div style={{ width: '15%', minWidth: "69px" }} >
            <select onChange={(e) => { setYear(e.target.value) }}>
                {Constdata.years.map(i => <option>{i}</option>)}
            </select>
        </div>
            <div style={{ display: "flex", width: "85%", minWidth: '69%', flexWrap: "wrap" }} >

                <div className='multiple hov'><p>Select Countries</p></div>
                <div className='multiple-option' >{Constdata.countryOption.map((i) => <><input key={i} type="checkbox" disabled={!multipleCountry.includes(i) && multipleCountry.length > 4} checked={multipleCountry.includes(i)} id={i} onClick={(e) => addCountry(e.target.value, e.target.checked)} name={i} value={i} />
                    <label for={i}>{i}</label><br></br><hr></hr></>)}
                </div>
                <button className={multipleCountry.length && multipleCategories.length ? "button" : "button-disable"} disabled={!multipleCountry.length || !multipleCategories.length} onClick={submitMultipleCountries}>Go</button>
            </div>
            <div style={{ display: "flex", width: "100%" }}>

                <div className='hov' style={{ width: "50%", borderRadius: "15px" }}>
                    <div className='multiple-cat-map' ><p>Select Category for Map</p> </div>
                        <div className='multiple-option-cat-map'>
                            <div >{Constdata.categoryOption.map((i) => <><input key={i} type="checkbox" checked={mapCategory==i} id={i+'map'} onClick={(e) => setMapCategory(e.target.value)} name={i} value={i} />
                                <label for={i+'map'}>{i}</label><br></br></>)}
                            </div>
                        </div>

                   
                </div>
                <div className='hov' style={{ width: "50%", borderRadius: '15px', textAlign: 'start' }}>
                    <div className='multiple-cat' ><p>{singleCat?'Select single Category':"Select Multiple Categories"}</p></div>
                    <div className='multiple-option-cat hov'>
                        <div hidden={singleCat}>{Constdata.categoryOption.map((i) => <><input key={i} type="checkbox" disabled={(!multipleCategories.includes(i) && multipleCategories.length > 4) || (!multipleCategories.includes(i) && multipleCountry.length > 1)} checked={multipleCategories.includes(i)} id={i} onClick={(e) => addCategory(e.target.value, e.target.checked)} name={i} value={i} />
                            <label for={i}>{i}</label><br></br></>)}
                        </div>
                        <div hidden={!singleCat}>{Constdata.categoryOption.map((i, k) => <><input key={i} type="checkbox" checked={ticked === i} id={i + k} onClick={(e) => setTicked(e.target.value)} value={i} />
                            <label for={i + k}>{i}</label><br></br></>)}
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}

export default Controls
