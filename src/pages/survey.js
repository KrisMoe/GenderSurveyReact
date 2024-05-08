import { useState, useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'
import styles from "../css/survey.module.css"
export default function Survey() {
    const navigate = useNavigate()
    const [freeForm,setFreeForm] = useState("");
    const [select,setSelect] = useState("");
    const [range,setRange] = useState(0);
    const [number,setNumber] = useState(0);
    const [date,setDate] = useState("");
    const [month,setMonth]= useState("");
    const [color,setColor] = useState("#888888");

    function ascii(a){return a.codePointAt(0)}
    useEffect(() => {
        var ints = freeForm.split('').map(ascii);

        console.log(ints);

    },[freeForm])

    function createRandomSeed(){
        let freeFormNums = freeForm.split('').map(ascii).reduce((accumulator, currentValue) => {
            return accumulator + currentValue
          },0);
        let selectNums = select.split('').map(ascii).reduce((accumulator, currentValue) => {
            return accumulator + currentValue
          },0);
        let dateNum = new Date(date).getTime()%977 ? new Date(date).getTime()%977:0;
        let monthNum = month.split('').map(ascii).reduce((accumulator, currentValue) => {
            return accumulator + currentValue
          },0);
        let colorNums = color. split('').map(ascii).reduce((accumulator, currentValue) => {
            return accumulator + currentValue
          },0);

        console.log(freeFormNums)
        console.log(selectNums)
        console.log(dateNum)
        console.log(monthNum)
        console.log(colorNums)
        console.log(freeFormNums+selectNums+dateNum+ monthNum+colorNums+(number*10000%2063)+range);
        return (freeFormNums+selectNums+dateNum+ monthNum+colorNums+(number*10000%2063)+range)

    }

    function getResults(){
        navigate("/results/"+createRandomSeed())
    }
   
    return <>
    
    <div className={styles.container}>
    <p>Please input your gender :</p>
    <input type="text" value={freeForm} onChange={(e)=>{setFreeForm(e.target.value)}}></input>
    <p>Please input your gender :</p>
    <select  name="select" value={select} onChange={(e)=>{setSelect(e.target.value)}}>
    <option value="Moon shine" >Moon shine</option>
    <option value="Fire light">Fire light</option>
    <option value="Neon signs">Neon signs</option>
    <option value="Otherworldly pit">Otherworldly pit</option>
    </select>
    <p>Please input your gender :</p>
    <input type="range" value={range} onChange={(e)=>{setRange(e.target.value)}}/>
    <p>Please input your gender :</p>
    <input type="number" value={number} onChange={(e)=>{setNumber(e.target.value)}}></input>
    <p>Please input your gender :</p>
    <input type="date" value={date} onChange={(e)=>{setDate(e.target.value)}}/>
    <p>Please input your gender :</p>
    <input type="month" value={month}  onChange={(e)=>{setMonth(e.target.value)}}/>
    <p>Please input your gender :</p>
    <input type="color"value={color}  onChange={(e)=>{setColor(e.target.value)}}/>
    <button className={styles.submitButton} onClick={getResults}>Finish</button>
    </div>
    </>
}